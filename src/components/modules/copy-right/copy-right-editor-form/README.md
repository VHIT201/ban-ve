# CopyRightEditorForm

Form component để tạo báo cáo vi phạm bản quyền sử dụng React Hook Form + Zod validation.

## Features

✅ **Validation hoàn chỉnh** với Zod schema
✅ **4 loại vi phạm** với icon và màu sắc riêng
✅ **Quản lý bằng chứng** (thêm/xóa multiple URLs)
✅ **Real-time validation** và character counter
✅ **View mode** cho hiển thị báo cáo
✅ **Error handling** với Alert component
✅ **Loading states** với disable controls

## Form Schema

```typescript
{
  contentId: string (24 chars, required)
  reportedContentId?: string (24 chars, optional)
  violationType: 'copyright' | 'trademark' | 'privacy' | 'other'
  description: string (20-2000 chars)
  evidence: string[] (1-10 URLs)
}
```

## Usage Example

### Create Mode (Submit Report)

```tsx
import CopyRightEditorForm from "@/components/modules/copy-right/copy-right-editor-form/CopyRightEditorForm";
import { usePostApiReports } from "@/api/endpoints/copyright";
import { useState } from "react";

function ReportPage() {
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: createReport, isPending } = usePostApiReports();

  const handleSubmit = async (values) => {
    try {
      setError(null);
      await createReport({ data: values });
      // Success handling
      toast.success("Báo cáo đã được gửi thành công!");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi gửi báo cáo");
    }
  };

  return (
    <CopyRightEditorForm
      mode="create"
      onSubmit={handleSubmit}
      isLoading={isPending}
      error={error}
      onCancel={() => router.back()}
    />
  );
}
```

### View Mode (Display Report)

```tsx
import CopyRightEditorForm from "@/components/modules/copy-right/copy-right-editor-form/CopyRightEditorForm";
import { useGetApiReportsReportId } from "@/api/endpoints/copyright";

function ViewReportDialog({ reportId }) {
  const { data: report, isLoading } = useGetApiReportsReportId(reportId);

  if (isLoading) return <Skeleton />;

  return (
    <CopyRightEditorForm
      mode="view"
      defaultValues={{
        contentId: report?.contentId?._id,
        reportedContentId: report?.reportedContentId?._id,
        violationType: report?.violationType,
        description: report?.description,
        evidence: report?.evidence,
      }}
      onSubmit={() => {}} // No-op for view mode
    />
  );
}
```

### Edit Mode (Update Report)

```tsx
function EditReportDialog({ reportId }) {
  const { data: report } = useGetApiReportsReportId(reportId);
  const { mutateAsync: updateReport, isPending } = usePostApiReports(); // Adjust based on API

  const handleSubmit = async (values) => {
    await updateReport({ reportId, data: values });
    toast.success("Báo cáo đã được cập nhật!");
  };

  return (
    <CopyRightEditorForm
      mode="create" // Use create mode but with defaultValues
      defaultValues={{
        contentId: report?.contentId?._id,
        reportedContentId: report?.reportedContentId?._id,
        violationType: report?.violationType,
        description: report?.description,
        evidence: report?.evidence,
      }}
      onSubmit={handleSubmit}
      isLoading={isPending}
    />
  );
}
```

## Violation Types

| Type        | Label                  | Icon             | Color  | Description                                    |
| ----------- | ---------------------- | ---------------- | ------ | ---------------------------------------------- |
| `copyright` | Vi phạm bản quyền      | 🛡️ Shield        | Red    | Nội dung sao chép, sử dụng trái phép bản quyền |
| `trademark` | Vi phạm thương hiệu    | ⚠️ AlertTriangle | Orange | Sử dụng trái phép nhãn hiệu, logo, thương hiệu |
| `privacy`   | Vi phạm quyền riêng tư | 👤 User          | Purple | Tiết lộ thông tin cá nhân, dữ liệu nhạy cảm    |
| `other`     | Vi phạm khác           | 📄 FileText      | Gray   | Các loại vi phạm khác không thuộc các mục trên |

## Props

```typescript
interface CopyrightReportEditorFormProps {
  mode?: "create" | "view"; // Default: "create"
  defaultValues?: Partial<CopyrightReportFormValues>;
  onSubmit: (values: CopyrightReportFormValues) => void | Promise<void>;
  isLoading?: boolean; // Default: false
  error?: string | null; // Display error message
  onCancel?: () => void; // Optional cancel handler
}
```

## Validation Rules

### contentId

- Required
- Must be exactly 24 characters (MongoDB ObjectId)
- Error: "ID nội dung không hợp lệ (phải có 24 ký tự)"

### reportedContentId

- Optional
- If provided, must be 24 characters
- Error: "ID nội dung gốc không hợp lệ (phải có 24 ký tự)"

### violationType

- Required
- Must be one of: copyright, trademark, privacy, other
- Error: "Vui lòng chọn loại vi phạm"

### description

- Required
- Min: 20 characters
- Max: 2000 characters
- Real-time character counter with badge
- Error: "Mô tả phải có ít nhất 20 ký tự"

### evidence

- Required
- Min: 1 URL
- Max: 10 URLs
- Each URL must be valid
- Add/remove URLs dynamically
- Error: "Vui lòng cung cấp ít nhất 1 bằng chứng"

## Features Detail

### 1. Violation Type Selector

- Dropdown with rich options (icon + label + description)
- Preview card showing selected violation type
- Color-coded icons for visual distinction

### 2. Evidence Management

- Add evidence URLs with Enter key or button click
- URL validation before adding
- Display evidence list with preview cards
- Each evidence card shows:
  - Link icon
  - Clickable URL (opens in new tab)
  - Badge with index number
  - External link button
  - Remove button (in create mode)
- Empty state when no evidence added

### 3. Character Counters

- Description field: Shows X/2000 with color coding
  - Red badge if < 20 or > 2000
  - Secondary badge if valid
- Evidence list: Shows X/10 with color coding
  - Red if 0 or > 10
  - Secondary if valid

### 4. Form States

- **Create Mode**: All fields editable, submit button enabled
- **View Mode**: All fields disabled, no submit button, evidence URLs clickable
- **Loading State**: All inputs disabled, button shows loading spinner

### 5. Error Handling

- Global error alert at top of form
- Field-level validation errors below each input
- Manual error setting for evidence URL validation

## Styling

- Consistent spacing with Shadcn/UI design system
- TailwindCSS utilities for responsive design
- Color-coded elements:
  - Red: Required asterisks, destructive actions
  - Blue: Links, primary actions
  - Gray: Placeholders, descriptions
  - Color-coded violation types
- Icons from Lucide React
- Smooth transitions and hover effects

## Best Practices

1. **Always validate** contentId format before submission
2. **Pre-fill contentId** from URL params or context when possible
3. **Handle submission errors** gracefully with user-friendly messages
4. **Clear form** after successful submission
5. **Show toast notifications** for success/error feedback
6. **Use Dialog/Modal** wrapper for better UX
7. **Implement confirmation** before canceling with unsaved changes

## Integration with API

```typescript
// POST /api/reports
const { mutateAsync, isPending } = usePostApiReports();

await mutateAsync({
  data: {
    contentId: "507f1f77bcf86cd799439011",
    reportedContentId: "507f191e810c19729de860ea", // optional
    violationType: "copyright",
    description: "This content violates my copyright...",
    evidence: [
      "https://example.com/proof1.jpg",
      "https://example.com/proof2.pdf",
    ],
  },
});
```

## Related Components

- `CopyrightTable` - Display list of reports
- `useCopyrightReportTableColumnsDefs` - Table columns
- `CopyrightReportDialog` - Wrapper dialog
- Form components from `@/components/ui/form`
