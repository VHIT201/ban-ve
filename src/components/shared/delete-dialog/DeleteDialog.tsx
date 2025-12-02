"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  requireConfirmation?: boolean;
  confirmationText?: string;
  itemName?: string;
};

const DeleteDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
  title = "Xóa dữ liệu",
  description,
  confirmText = "Xóa",
  requireConfirmation = false,
  confirmationText = "DELETE",
  itemName,
}: DeleteDialogProps) => {
  const [confirmValue, setConfirmValue] = useState("");

  const handleOpenChange = (newOpen: boolean) => {
    if (!isDeleting) {
      onOpenChange(newOpen);
      if (!newOpen) {
        setConfirmValue("");
      }
    }
  };

  const handleConfirm = () => {
    if (requireConfirmation && confirmValue !== confirmationText) {
      return;
    }
    onConfirm();
    setConfirmValue("");
  };

  const isConfirmDisabled = requireConfirmation
    ? confirmValue !== confirmationText
    : false;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-base pt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 py-4">
          {itemName && (
            <p className="text-sm">
              Bạn chắc chắn muốn xóa{" "}
              <span className="font-semibold">{itemName}</span>?
            </p>
          )}

          {requireConfirmation && (
            <div className="space-y-2">
              <Label htmlFor="confirmation">
                Nhập{" "}
                <span className="font-mono font-semibold">
                  {confirmationText}
                </span>{" "}
                để xác nhận:
              </Label>
              <Input
                id="confirmation"
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                placeholder={`Nhập "${confirmationText}" để xác nhận`}
                disabled={isDeleting}
                autoComplete="off"
              />
            </div>
          )}

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Cảnh báo</AlertTitle>
            <AlertDescription>
              Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isDeleting}
          >
            Hủy
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting || isConfirmDisabled}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                {confirmText}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
