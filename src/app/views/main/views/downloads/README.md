# Download Page - Implementation Guide

## Overview

This directory contains a complete implementation of the Download Files page where users can access their purchased files after payment.

## File Structure

```
downloads/
├── page.tsx                    # Original implementation (monolithic)
├── page-improved.tsx           # Improved implementation (modular)
├── DESIGN.md                   # Comprehensive UI/UX documentation
├── README.md                   # This file
├── components/
│   ├── FileItem.tsx           # Individual file download card
│   └── OrderInfoCard.tsx      # Order information display
└── hooks/
    └── useDownloadOrder.ts    # Custom hook for data fetching and download logic
```

## Quick Start

### Option 1: Use the Monolithic Version (page.tsx)

The original `page.tsx` has everything in one file. Good for quick prototyping.

### Option 2: Use the Modular Version (page-improved.tsx) - **RECOMMENDED**

1. Rename `page-improved.tsx` to `page.tsx` (replace the original)
2. The modular version uses separate components and hooks for better maintainability

## Implementation Steps

### 1. Set Up the API Endpoint

You need to create an endpoint to fetch orders by `orderCode`:

```typescript
// Backend API (example)
GET /api/orders/by-code/:orderCode
// or
GET /api/orders?orderCode=ABC123
```

**Current Limitation**: The code currently uses `useGetApiOrdersOrderId` which expects an ID, not an orderCode. You'll need to either:

- Create a new endpoint: `/api/orders/by-code/:orderCode`
- Modify the existing endpoint to accept orderCode as a query parameter
- Update the generated API client

### 2. Update the Custom Hook

In `hooks/useDownloadOrder.ts`, update the API call:

```typescript
// Option A: If you create a new endpoint
import { useGetApiOrdersByCode } from "@/api/endpoints/orders";

const { data, isLoading, error } = useGetApiOrdersByCode(orderCode || "", {
  query: { enabled: !!orderCode },
});

// Option B: If you modify existing endpoint to accept query params
const { data, isLoading, error } = useGetApiOrders({
  query: {
    enabled: !!orderCode,
    // Add orderCode as query param
  },
});
```

### 3. Populate File Data

The files need actual data from your backend. Update the `files` transformation in `useDownloadOrder.ts`:

```typescript
const files: DownloadFile[] =
  order?.items?.map((item) => {
    // Assuming you populate content data in the order response
    const content = item.content; // or fetch separately

    return {
      id: item.contentId || "",
      name: content?.file_id?.name || "Untitled File",
      type: content?.file_id?.type || "application/octet-stream",
      size: content?.file_id?.size || 0,
      url: content?.file_id?.url || "",
      contentId: item.contentId || "",
    };
  }) || [];
```

### 4. Implement Download Logic

In `useDownloadOrder.ts`, implement the actual download:

```typescript
const downloadFile = async (fileId: string): Promise<void> => {
  const file = files.find((f) => f.id === fileId);
  if (!file || !file.url) return;

  setDownloadingFiles((prev) => new Set(prev).add(fileId));

  try {
    // Method 1: Direct download (if URL is public/signed)
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Method 2: Fetch and download (for private files)
    // const response = await fetch(file.url);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = file.name;
    // document.body.appendChild(link);
    // link.click();
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
    // Show error notification
  } finally {
    setDownloadingFiles((prev) => {
      const next = new Set(prev);
      next.delete(fileId);
      return next;
    });
  }
};
```

### 5. Add Toast Notifications (Optional but Recommended)

Install a toast library if not already available:

```bash
pnpm add sonner
# or use shadcn/ui toast
npx shadcn@latest add toast
```

Then add notifications for download success/failure:

```typescript
import { toast } from "sonner";

// In downloadFile function
try {
  // download logic...
  toast.success(`Downloaded ${file.name}`);
} catch (error) {
  toast.error(`Failed to download ${file.name}`);
}
```

## Component Usage

### FileItem Component

```tsx
<FileItem
  fileName="Document.pdf"
  fileType="application/pdf"
  fileSize={1024000} // bytes
  fileUrl="https://..."
  onDownload={() => handleDownload()}
  isDownloading={false}
/>
```

### OrderInfoCard Component

```tsx
<OrderInfoCard order={orderData} />
```

## Routing Setup

Make sure your route is configured correctly:

```typescript
// In routes.ts or App.tsx
{
  path: "/download",
  element: <DownloadPage />,
}
```

## Testing Checklist

- [ ] Test with valid orderCode
- [ ] Test with invalid orderCode
- [ ] Test with expired order
- [ ] Test with pending order
- [ ] Test with cancelled order
- [ ] Test with no files
- [ ] Test mobile responsive layout
- [ ] Test file download functionality
- [ ] Test download all functionality
- [ ] Test loading states
- [ ] Test error states
- [ ] Verify expiration date logic
- [ ] Test with different file types
- [ ] Verify file size formatting
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

## Customization

### Change Color Scheme

Update the gradient background in `page.tsx`:

```tsx
<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
  {/* Change to: */}
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
```

### Change Layout Ratio

Adjust the grid columns in the layout:

```tsx
// Current: 1/3 for order info, 2/3 for files
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">...</div>  {/* Order info */}
  <div className="lg:col-span-2">...</div>  {/* Files */}
</div>

// Change to 50/50:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div>...</div>  {/* Order info */}
  <div>...</div>  {/* Files */}
</div>
```

### Add Download Progress

Install and use a progress library:

```typescript
import { Progress } from "@/components/ui/progress";

const [downloadProgress, setDownloadProgress] = useState(0);

// In download function
const response = await fetch(file.url);
const reader = response.body?.getReader();
const contentLength = response.headers.get("content-length");
// ... implement progress tracking
```

## API Response Example

Expected order response structure:

```json
{
  "data": {
    "_id": "order123",
    "orderCode": "ABC123",
    "email": "user@example.com",
    "status": "completed",
    "totalAmount": 100000,
    "expiresAt": "2026-02-21T00:00:00Z",
    "createdAt": "2026-01-21T10:30:00Z",
    "items": [
      {
        "contentId": "content456",
        "quantity": 1,
        "price": 100000,
        "content": {
          "title": "My Document",
          "file_id": {
            "_id": "file789",
            "name": "document.pdf",
            "url": "https://storage.example.com/files/document.pdf",
            "type": "application/pdf",
            "size": 1024000
          }
        }
      }
    ]
  }
}
```

## Security Considerations

1. **Server-side validation**: Always validate orderCode on the backend
2. **Expiration enforcement**: Enforce expiration server-side, not just client-side
3. **Secure URLs**: Use presigned URLs or temporary tokens for downloads
4. **Rate limiting**: Prevent abuse with download rate limits
5. **Audit logging**: Log all download attempts for security

## Performance Tips

1. **Lazy load files**: Only fetch file details when needed
2. **Cache order data**: Use React Query caching effectively
3. **Optimize images**: Use appropriate file type icons (SVGs)
4. **Code splitting**: Lazy load the download page component
5. **Compress responses**: Enable gzip/brotli on your server

## Troubleshooting

### Files not showing

- Check API response structure
- Verify `order.items` is populated
- Check console for errors

### Download not working

- Verify file URLs are accessible
- Check CORS settings if downloading from different domain
- Test file URLs in browser directly

### Expired logic not working

- Verify date format from API (ISO 8601)
- Check timezone handling
- Test with different expiration dates

## Next Steps

1. Integrate with your existing API endpoints
2. Implement actual download logic
3. Add error notifications (toast/snackbar)
4. Add analytics tracking
5. Test thoroughly on different devices
6. Add support for file previews (optional)
7. Implement download history (optional)

## Support

For questions or issues:

- Review the DESIGN.md file for detailed UI/UX specs
- Check the inline comments in each file
- Ensure all dependencies are installed
- Verify your API endpoints match the expected structure

## License

This code is provided as-is for your project.
