# Copyright Report Detail Page

Trang chi tiết báo cáo vi phạm bản quyền với khả năng xem thông tin đầy đủ và xử lý báo cáo.

## Features

✅ **View Mode Form** - Hiển thị thông tin báo cáo dạng readonly
✅ **Status Management** - Giải quyết hoặc từ chối báo cáo
✅ **User Information** - Hiển thị thông tin người báo cáo và người xử lý
✅ **Content Preview** - Xem thông tin nội dung bị báo cáo
✅ **Admin Notes** - Thêm ghi chú khi xử lý
✅ **Responsive Layout** - 2 cột responsive (form + sidebar)
✅ **Real-time Updates** - Refetch sau khi cập nhật
✅ **Toast Notifications** - Thông báo thành công/lỗi

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Header (Back button + Title)                        │
├──────────────────────────────┬──────────────────────┤
│ Left Column (2/3)            │ Right Column (1/3)   │
│                              │                      │
│ 1. Status Card               │ 1. Reporter Info     │
│    - Report ID               │    - Avatar          │
│    - Violation Type          │    - Username/Email  │
│    - Created/Resolved Date   │    - User ID         │
│    - Admin Notes             │    - Role            │
│                              │                      │
│ 2. Report Form (View Mode)   │ 2. Content Info      │
│    - Content ID              │    - Content Title   │
│    - Reported Content ID     │    - Content ID      │
│    - Violation Type          │    - Original Content│
│    - Description             │                      │
│    - Evidence List           │ 3. Resolver Info     │
│                              │    (if resolved)     │
│ 3. Action Buttons            │    - Avatar          │
│    (if pending/reviewing)    │    - Username/Email  │
│    - Resolve                 │    - Resolved Date   │
│    - Reject                  │                      │
└──────────────────────────────┴──────────────────────┘
```

## Status Flow

```
pending → reviewing → resolved
                   ↘ rejected
```

### Status Badges

| Status      | Label         | Color  | Icon         | Actions Available |
| ----------- | ------------- | ------ | ------------ | ----------------- |
| `pending`   | Chờ xử lý     | Yellow | Clock        | Resolve, Reject   |
| `reviewing` | Đang xem xét  | Blue   | Eye          | Resolve, Reject   |
| `resolved`  | Đã giải quyết | Green  | CheckCircle2 | None              |
| `rejected`  | Đã từ chối    | Red    | XCircle      | None              |

## Components Used

### Cards

- **Status Card**: Hiển thị trạng thái và thông tin tổng quan
- **Report Form Card**: CopyRightEditorForm ở view mode
- **Action Card**: Buttons để giải quyết/từ chối
- **Reporter Info Card**: Thông tin người báo cáo
- **Content Info Card**: Thông tin nội dung bị báo cáo
- **Resolver Info Card**: Thông tin người xử lý (nếu có)

### Dialogs

- **Resolve Dialog**: Xác nhận giải quyết + optional admin notes
- **Reject Dialog**: Xác nhận từ chối + required admin notes

### Form Integration

- **CopyRightEditorForm**: Mode "view", tất cả fields disabled
- Evidence URLs vẫn clickable để xem bằng chứng

## API Integration

### Query: Get Report Detail

```typescript
const getReportDetailQuery = useGetApiReportsReportId(id);

// Response type
{
  report: CopyrightReport {
    _id: string
    reporterId: User
    contentId: { _id: string, title: string }
    reportedContentId?: { _id: string, title: string }
    violationType: 'copyright' | 'trademark' | 'privacy' | 'other'
    description: string
    status: 'pending' | 'reviewing' | 'resolved' | 'rejected'
    evidence: string[]
    adminNotes?: string
    resolvedAt?: string
    resolvedBy?: User
    createdAt: string
    updatedAt: string
  }
}
```

### Mutation: Update Status

```typescript
const updateStatusMutation = usePutApiReportsReportIdStatus();

await updateStatusMutation.mutateAsync({
  reportId: "507f1f77bcf86cd799439011",
  data: {
    status: "resolved", // or "rejected"
    adminNotes: "Optional admin notes...",
  },
});
```

## User Actions

### 1. Giải quyết báo cáo (Resolve)

**Flow:**

1. Click button "Giải quyết báo cáo"
2. Dialog mở với textarea cho admin notes (optional)
3. Click "Xác nhận giải quyết"
4. API call: PUT /api/reports/:id/status
5. Toast success message
6. Refetch report data
7. Status badge updates to "Đã giải quyết"
8. Action buttons disappear
9. Resolver info card appears

**Requirements:**

- Status must be `pending` or `reviewing`
- Admin notes are optional

### 2. Từ chối báo cáo (Reject)

**Flow:**

1. Click button "Từ chối báo cáo" (red)
2. Dialog mở với textarea cho admin notes (required)
3. Enter rejection reason
4. Click "Xác nhận từ chối"
5. API call: PUT /api/reports/:id/status
6. Toast success message
7. Refetch report data
8. Status badge updates to "Đã từ chối"
9. Action buttons disappear

**Requirements:**

- Status must be `pending` or `reviewing`
- Admin notes are REQUIRED (button disabled if empty)

### 3. Xem bằng chứng

**Flow:**

1. Scroll to Evidence section in form
2. Click on any evidence URL or "Xem" button
3. Opens in new tab

## Routing

```typescript
// Route definition (in routes.ts or router config)
{
  path: "/admin/copy-right/:id",
  element: <CopyRightDetail />
}

// Navigation
navigate(`/admin/copy-right/${reportId}`)
```

### URL Params

- `id` (required): MongoDB ObjectId của report

### Navigation

- **Back button**: Arrow left icon, navigate(-1)
- **From table**: Click row action "Xem chi tiết"

## Responsive Behavior

### Desktop (≥1024px)

- 2 column layout: 66% form + 34% sidebar
- All cards visible side by side

### Tablet (768px - 1023px)

- Stack to single column
- Form section first, then sidebar cards

### Mobile (<768px)

- Full width single column
- Compressed card padding
- Stacked action buttons

## State Management

### Local State

```typescript
const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
const [adminNotes, setAdminNotes] = useState("");
```

### Query State (React Query)

- `getReportDetailQuery`: Report data with automatic refetch
- `updateStatusMutation`: Update status with loading/error states

## Error Handling

### Query Errors

- Handled by `QueryBoundary` component
- Shows error UI if report not found
- Automatic retry on network errors

### Mutation Errors

```typescript
try {
  await updateStatusMutation.mutateAsync({ ... });
  toast.success("...");
} catch (error) {
  console.error("Failed to update report status:", error);
  toast.error("Đã có lỗi xảy ra khi cập nhật trạng thái báo cáo");
}
```

## UI/UX Details

### Status Card

- Color-coded status badge
- Icon matching status
- Formatted dates (DD/MM/YYYY HH:mm)
- Admin notes in muted card (if exists)

### User Cards

- Avatar with initials from username
- Gradient backgrounds (blue for reporter, green for resolver)
- Truncated email addresses
- Role badges
- ID preview (first 12 chars)

### Content Cards

- File icon for content
- Title with line-clamp-2
- ID preview
- Separate section for reported content (if exists)

### Form Display

- All fields disabled (view mode)
- Evidence URLs still clickable
- Maintains same layout as create mode
- No submit button shown

### Action Buttons

- Full width on mobile
- 50/50 split on desktop
- Primary (green) for Resolve
- Destructive (red) for Reject
- Hidden when status is resolved/rejected
- Disabled during mutation

### Dialogs

- Consistent header with icon
- Clear description of action
- Optional/Required field indication
- Cancel + Confirm buttons
- Loading state on confirm button
- Auto-close on success

## Accessibility

✅ Semantic HTML structure
✅ ARIA labels on interactive elements
✅ Keyboard navigation support
✅ Focus management in dialogs
✅ Color contrast compliance
✅ Screen reader friendly

## Performance Optimizations

1. **Conditional Rendering**: Only show action buttons/resolver card when needed
2. **Query Caching**: React Query caches report data
3. **Optimistic Updates**: Could be added for instant UI feedback
4. **Lazy Loading**: Dialog content only mounts when opened
5. **Memoization**: Status configs computed only when status changes

## Related Components

- `CopyRightEditorForm` - Form in view mode
- `CopyrightTable` - Table listing all reports
- `useCopyrightReportTableColumnsDefs` - Table columns
- `QueryBoundary` - Error/loading boundary
- `useRequiredPathParams` - Route param validation

## Testing Checklist

- [ ] Load page with valid report ID
- [ ] Load page with invalid report ID (error handling)
- [ ] Resolve report with admin notes
- [ ] Resolve report without admin notes
- [ ] Reject report with admin notes
- [ ] Reject report without admin notes (button disabled)
- [ ] View evidence links (open in new tab)
- [ ] Navigate back with back button
- [ ] Check responsive layout on mobile/tablet/desktop
- [ ] Verify status badge colors and icons
- [ ] Test with all 4 violation types
- [ ] Test with all 4 status types
- [ ] Verify dialog close on outside click
- [ ] Verify toast notifications
- [ ] Check loading states
- [ ] Verify refetch after status update

## Future Enhancements

- [ ] Add comment/discussion thread
- [ ] Timeline showing status history
- [ ] Ability to reassign report to another admin
- [ ] Bulk actions from detail page
- [ ] Export report as PDF
- [ ] Email notification settings
- [ ] Attachment preview for evidence
- [ ] Related reports section
- [ ] Quick actions keyboard shortcuts
- [ ] Activity log
