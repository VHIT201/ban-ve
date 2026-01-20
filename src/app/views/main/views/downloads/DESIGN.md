# Download Page - UI/UX Design Documentation

## Overview

This document outlines the UI/UX design for the Download Files page where users access their purchased files after completing a payment.

## User Flow

```
Email → Click Download Link → Landing Page → Verify Order Code → Display Files
                                    ↓
                            [Invalid/Expired/Pending]
                                    ↓
                              Error State
```

## Page Structure

### Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────────────────┐
│  Header (Title + Expiration Info)                      │
├──────────────────┬──────────────────────────────────────┤
│  Order Info      │  Downloadable Files                 │
│  (Left Column)   │  (Right Column - Primary Focus)     │
│  - Order Code    │  - File 1 (Icon, Name, Size, Btn)  │
│  - Date          │  - File 2 (Icon, Name, Size, Btn)  │
│  - Status        │  - File 3 (Icon, Name, Size, Btn)  │
│  - Total         │  - Download All Button              │
│                  │                                      │
└──────────────────┴──────────────────────────────────────┘
│  Support Info (Full Width)                             │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (<1024px)

```
┌─────────────────────────────────┐
│  Header                         │
├─────────────────────────────────┤
│  Order Info (Top)               │
│  - Collapsed card format        │
├─────────────────────────────────┤
│  Downloadable Files (Bottom)    │
│  - Stacked vertically           │
│  - File 1                       │
│  - File 2                       │
│  - Download All                 │
└─────────────────────────────────┘
│  Support Info                   │
└─────────────────────────────────┘
```

## Component Hierarchy

```
DownloadPage
├── Header Section
│   ├── Title
│   └── Expiration Info
│
├── Content Grid (lg:grid-cols-3)
│   │
│   ├── Order Information Card (lg:col-span-1)
│   │   ├── Card Header (Order Details)
│   │   └── Card Content
│   │       ├── Order Code (mono font)
│   │       ├── Purchase Date
│   │       ├── Status Badge
│   │       ├── Total Amount
│   │       ├── Email
│   │       └── Expiration Alert
│   │
│   └── Files Card (lg:col-span-2)
│       ├── Card Header (Your Files)
│       └── Card Content
│           ├── File Item Cards (map)
│           │   ├── File Icon
│           │   ├── File Info (name, type, size)
│           │   └── Download Button
│           └── Download All Button
│
└── Support Alert (Full Width)
```

## State Management

### 1. Loading State

- Display skeleton loaders for both columns
- Maintain layout structure while loading
- Show 3 skeleton file items as placeholder

### 2. Error States

#### No Order Code

```jsx
<Alert variant="destructive">Missing Order Code - Check your email</Alert>
```

#### Order Not Found

```jsx
<Alert variant="destructive">Order with code {orderCode} not found</Alert>
```

#### Link Expired

```jsx
<Alert variant="destructive">
  Download link expired on {date}
  Contact support for new link
</Alert>
```

#### Order Not Completed

```jsx
<Alert>
  Order status: {status}
  Downloads available when completed
</Alert>
```

#### No Files Available

```jsx
<Alert>No files associated with order Contact support if error</Alert>
```

### 3. Success State

- Show order details on left
- Display downloadable files on right
- Enable download buttons
- Show expiration countdown/warning if near expiry

## Design Tokens

### Colors

- **Primary**: Download buttons, file icons
- **Muted**: Background gradient, secondary text
- **Destructive**: Error states, expired alerts
- **Border**: Card outlines (border-2 for emphasis)

### Typography

- **Title**: text-3xl font-bold (page header)
- **Card Title**: text-lg/xl font-semibold
- **Order Code**: font-mono (monospace for code)
- **Body**: text-sm for details, text-base for content

### Spacing

- **Container**: px-4 py-8
- **Grid Gap**: gap-6
- **Card Spacing**: space-y-4/6
- **Mobile Padding**: p-4

### Components Used

- **Card**: Main container for sections
- **Button**: Download actions (primary, outline)
- **Badge**: Status indicators
- **Alert**: Informational messages, errors
- **Skeleton**: Loading states

## Responsive Breakpoints

```css
/* Mobile First */
.grid {
  grid-template-columns: 1fr;
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .order-info {
    grid-column: span 1;
  }
  .files {
    grid-column: span 2;
  }
}
```

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy (h1 → h3)
2. **ARIA Labels**: Icons have descriptive labels
3. **Keyboard Navigation**: All buttons are keyboard accessible
4. **Color Contrast**: Meets WCAG AA standards
5. **Focus States**: Visible focus indicators on interactive elements
6. **Screen Reader Support**: Meaningful alt text and descriptions

## User Experience Enhancements

### Visual Hierarchy

1. **Primary Focus**: Download buttons are prominent (size-lg)
2. **Secondary Info**: Order details in muted text
3. **Critical Alerts**: Expiration warnings stand out
4. **Clear CTAs**: "Download" and "Download All" clearly visible

### Micro-interactions

- Hover effects on file cards (shadow-md transition)
- Button hover states (built into shadcn/ui)
- Smooth transitions on state changes
- Loading skeletons maintain layout

### Information Architecture

- Most important info first (files to download)
- Supporting details in sidebar (order info)
- Contextual help at bottom (support)
- Clear error messages with next steps

## File Display Details

Each file item shows:

- **Icon**: Visual indicator of file type (Image, Video, PDF, Archive, etc.)
- **Name**: Clear, truncated file name
- **Type**: File format badge (PDF, JPG, ZIP, etc.)
- **Size**: Human-readable file size (KB, MB, GB)
- **Download**: Primary action button

## File Type Icons Mapping

```typescript
Image files → Image icon
Video files → Video icon
PDF/Docs → FileText icon
Archives → FileArchive icon
Default → File icon
```

## Status Badge Variants

```typescript
completed → "default" (green)
pending → "secondary" (gray)
cancelled → "destructive" (red)
other → "outline" (neutral)
```

## API Integration Notes

### Required Endpoint

You'll need an API endpoint to fetch orders by `orderCode` (not just `orderId`):

```typescript
GET /api/orders/by-code/:orderCode
// or
GET /api/orders?orderCode=ABC123
```

### Expected Response Structure

```typescript
{
  data: {
    _id: string;
    orderCode: string;
    email: string;
    status: "completed" | "pending" | "cancelled";
    totalAmount: number;
    expiresAt: string; // ISO date
    createdAt: string;
    items: [
      {
        contentId: string;
        // Additional content details would be populated
        content: {
          title: string;
          file_id: {
            name: string;
            url: string;
            type: string;
            size: number;
          }
        }
      }
    ]
  }
}
```

### Download Implementation

The current implementation includes placeholder download handlers. You'll need to:

1. Fetch actual file URLs from the backend
2. Implement secure download (presigned URLs, tokens)
3. Handle download progress/errors
4. Implement "Download All" as ZIP or sequential downloads

## Future Enhancements

### Phase 2 Features

- [ ] Download progress indicators
- [ ] Download history/tracking
- [ ] Re-download capability after expiration (with new link)
- [ ] File preview before download
- [ ] Share download link (for collaborative purchases)
- [ ] Multiple file format options (if applicable)

### Analytics Tracking

- Track successful downloads
- Monitor expired link access attempts
- Track download errors
- User flow analytics

## Testing Checklist

- [ ] Mobile responsive layout works correctly
- [ ] All error states display properly
- [ ] Loading skeletons maintain layout
- [ ] Download buttons are functional
- [ ] Expiration date is calculated correctly
- [ ] Order code validation works
- [ ] File type icons display correctly
- [ ] File sizes format properly
- [ ] Status badges show correct variant
- [ ] Support information is clear
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Cross-browser compatibility
- [ ] Performance on slow connections

## Performance Optimization

1. **Code Splitting**: Page loads independently
2. **Lazy Loading**: Icons loaded on demand
3. **Optimized Images**: File type icons are SVGs
4. **Minimal Re-renders**: React Query caching
5. **Skeleton Loading**: Perceived performance boost

## Security Considerations

1. **No Authentication Required**: Uses orderCode as secure token
2. **Expiration Enforcement**: Server-side validation required
3. **Secure Download URLs**: Use presigned/temporary URLs
4. **Rate Limiting**: Prevent abuse of download endpoints
5. **Logging**: Track download attempts for security

## Conclusion

This design prioritizes:

- **User-friendly**: Clear information hierarchy
- **Accessible**: WCAG compliant
- **Responsive**: Works on all devices
- **Performant**: Fast load times
- **Secure**: Proper validation and expiration
- **Helpful**: Clear error messages and support info
