"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  deleting?: boolean;
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
  deleting = false,
  title = "Xóa dữ liệu",
  description,
  confirmText = "Xóa",
  requireConfirmation = false,
  confirmationText = "DELETE",
  itemName,
}: DeleteDialogProps) => {
  const [confirmValue, setConfirmValue] = useState("");

  const handleOpenChange = (newOpen: boolean) => {
    if (!deleting) {
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

  // Animation variants - subtle and clean
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: custom * 0.1,
      },
    }),
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive" />

                <div className="flex-1">
                  <DialogTitle className="text-xl font-semibold text-destructive">
                    {title}
                  </DialogTitle>
                  {description && (
                    <DialogDescription className="text-sm text-muted-foreground mt-1.5">
                      {description}
                    </DialogDescription>
                  )}
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-4">
            {itemName && (
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-sm text-muted-foreground"
              >
                Bạn chắc chắn muốn xóa{" "}
                <span className="font-medium text-foreground">{itemName}</span>?
              </motion.div>
            )}

            {requireConfirmation && (
              <motion.div
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <Label htmlFor="confirmation" className="text-sm">
                  Nhập{" "}
                  <code className="px-1.5 py-0.5 bg-muted rounded text-destructive font-semibold">
                    {confirmationText}
                  </code>{" "}
                  để xác nhận
                </Label>
                <div className="relative">
                  <Input
                    id="confirmation"
                    value={confirmValue}
                    onChange={(e) => setConfirmValue(e.target.value)}
                    placeholder={confirmationText}
                    disabled={deleting}
                    autoComplete="off"
                    className="h-10 font-mono text-sm"
                  />
                  <AnimatePresence>
                    {confirmValue && confirmValue === confirmationText && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Alert className="border-destructive/20 bg-destructive/5">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertTitle className="text-sm font-medium text-foreground">
                  Không thể hoàn tác
                </AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-muted/30 border-t flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              disabled={deleting}
              className="h-10"
            >
              Hủy
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={deleting || isConfirmDisabled}
              className="h-10 min-w-[100px]"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xóa
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {confirmText}
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
