"use client";

import { useState } from "react";
import { Trash2Icon, TrashIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConfirmDialog from "@/components/shared/confirm-dialog";
import { useDataTableContext } from "../../DataTableContext";

type UserDeleteDialogProps<TData> = {
  deleting?: boolean;
  currentRow: (TData & { name: string }) | null;
  onDelete: (row: TData) => void;
};

const DataTableDeleteDialog = <TData,>({
  onDelete,
  currentRow,
  deleting,
}: UserDeleteDialogProps<TData>) => {
  const { openDeleteDialog, openDeleteDialogAction } =
    useDataTableContext<TData>();

  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (currentRow && value === currentRow.name) {
      onDelete(currentRow);
    }
  };

  return (
    <ConfirmDialog
      isLoading={deleting}
      open={openDeleteDialog && currentRow !== null}
      onOpenChange={openDeleteDialogAction}
      handleConfirm={handleDelete}
      title={
        <span className="text-destructive">
          <Trash2Icon
            className="stroke-destructive me-1 inline-block"
            size={18}
          />{" "}
          Xóa dữ liệu
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Bạn chắc chắn xóa{" "}
            <span className="font-bold ml-1 text-destructive">
              {currentRow?.name}
            </span>
            <br />
            Hành động này không thể hoàn tác. Vui lòng nhập tên giá trị để xác
            nhận.
          </p>

          <Label className="my-2">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Nhập tên giá trị để xác nhận việc xóa."
              disabled={deleting}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Cảnh báo</AlertTitle>
            <AlertDescription>
              Vui lòng cẩn thận, hành động này không thể hoàn tác.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
};

export default DataTableDeleteDialog;
