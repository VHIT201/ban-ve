import { TrashIcon } from "lucide-react";
import { useMemo } from "react";

export const useBulkActions = ({
  onDeleteSelected,
}: {
  onDeleteSelected?: () => void;
}) => {
  return useMemo(
    () => [
      {
        label: "Xóa danh mục đã chọn",
        icon: TrashIcon,
        tooltip: "Xóa tất cả các danh mục đã chọn",
        variant: "destructive" as const,
        onAction: () => {
          onDeleteSelected?.();
        },
      },
    ],
    [],
  );
};
