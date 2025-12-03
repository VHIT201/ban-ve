# DeleteDialog Component

A generic, reusable delete confirmation dialog component for the entire application.

## Features

- ✅ Customizable title, description, and button text
- ✅ Optional confirmation input requirement
- ✅ Loading state during deletion
- ✅ Warning alert with destructive styling
- ✅ Disabled state management
- ✅ Auto-reset confirmation input on close
- ✅ Keyboard accessible
- ✅ TypeScript support

## Props

| Prop                  | Type                      | Default         | Description                             |
| --------------------- | ------------------------- | --------------- | --------------------------------------- |
| `open`                | `boolean`                 | Required        | Controls dialog visibility              |
| `onOpenChange`        | `(open: boolean) => void` | Required        | Callback when dialog open state changes |
| `onConfirm`           | `() => void`              | Required        | Callback when delete is confirmed       |
| `isDeleting`          | `boolean`                 | `false`         | Shows loading state during deletion     |
| `title`               | `string`                  | `"Xóa dữ liệu"` | Dialog title                            |
| `description`         | `string`                  | `undefined`     | Optional description text               |
| `confirmText`         | `string`                  | `"Xóa"`         | Confirm button text                     |
| `requireConfirmation` | `boolean`                 | `false`         | Requires typing confirmation text       |
| `confirmationText`    | `string`                  | `"DELETE"`      | Text user must type to confirm          |
| `itemName`            | `string`                  | `undefined`     | Name of item being deleted              |

## Usage Examples

### Basic Usage (Simple Confirmation)

```tsx
import { DeleteDialog } from "@/components/shared";
import { useState } from "react";

function MyComponent() {
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const deleteMutation = useDeleteItem();

  const handleDelete = () => {
    if (!itemToDelete) return;
    deleteMutation.mutate({ id: itemToDelete.id });
  };

  return (
    <>
      <DeleteDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        title="Xóa file"
        description={`Bạn có chắc chắn muốn xóa file "${itemToDelete?.name}"? Hành động này không thể hoàn tác.`}
      />
    </>
  );
}
```

### With Confirmation Input (Critical Actions)

```tsx
<DeleteDialog
  open={!!userToDelete}
  onOpenChange={(open) => !open && setUserToDelete(null)}
  onConfirm={handleDeleteUser}
  isDeleting={deleteUserMutation.isPending}
  title="Xóa người dùng"
  itemName={userToDelete?.username}
  requireConfirmation={true}
  confirmationText="DELETE"
  confirmText="Xóa người dùng"
/>
```

### Custom Confirmation Text

```tsx
<DeleteDialog
  open={!!account}
  onOpenChange={(open) => !open && setAccount(null)}
  onConfirm={handleDeleteAccount}
  isDeleting={isDeleting}
  title="Xóa tài khoản vĩnh viễn"
  description="Tất cả dữ liệu liên quan sẽ bị xóa. Bạn sẽ không thể khôi phục."
  requireConfirmation={true}
  confirmationText={account?.email || ""}
  itemName={account?.name}
  confirmText="Xóa tài khoản"
/>
```

## Complete Integration Example

```tsx
import { useState } from "react";
import { useDeleteApiFileId } from "@/api/endpoints/files";
import { DeleteDialog } from "@/components/shared";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileResponse } from "@/api/types/file";

function FileManager() {
  const [deleteItem, setDeleteItem] = useState<FileResponse | null>(null);
  const queryClient = useQueryClient();

  // Mutation with callbacks
  const deleteFileMutation = useDeleteApiFileId({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa file thành công!", {
          description: `File "${deleteItem?.name}" đã được xóa.`,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/file"] });
        setDeleteItem(null);
      },
      onError: (error: any) => {
        toast.error("Không thể xóa file", {
          description: error?.response?.data?.message || "Đã xảy ra lỗi.",
        });
      },
    },
  });

  const handleDelete = () => {
    if (!deleteItem) return;
    deleteFileMutation.mutate({ id: deleteItem._id });
  };

  return (
    <div>
      {/* Your UI with delete buttons */}
      <button onClick={() => setDeleteItem(someFile)}>Delete File</button>

      {/* Delete Dialog */}
      <DeleteDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={handleDelete}
        isDeleting={deleteFileMutation.isPending}
        title="Xóa file"
        itemName={deleteItem?.name}
        description="File sẽ bị xóa vĩnh viễn khỏi hệ thống."
      />
    </div>
  );
}
```

## Benefits

1. **Consistent UX**: Same delete confirmation experience across the app
2. **Flexible**: Can be used for any delete operation
3. **Safe**: Prevents accidental deletions with confirmation
4. **Loading States**: Shows feedback during async operations
5. **Accessible**: Proper keyboard navigation and ARIA labels
6. **Type-Safe**: Full TypeScript support
7. **Easy to Use**: Simple prop interface

## Migration from Old DeleteDialog

**Old Pattern:**

```tsx
<DeleteDialog
  deleting={mutation.isPending}
  currentRow={item}
  onDelete={(item) => mutation.mutate(item)}
/>
```

**New Pattern:**

```tsx
<DeleteDialog
  open={!!item}
  onOpenChange={(open) => !open && setItem(null)}
  onConfirm={handleDelete}
  isDeleting={mutation.isPending}
  title="Xóa dữ liệu"
  itemName={item?.name}
/>
```
