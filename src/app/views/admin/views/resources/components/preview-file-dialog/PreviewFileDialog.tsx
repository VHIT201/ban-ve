import { FileResponse } from "@/api/types/file";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DownloadIcon } from "lucide-react";
interface Props {
  previewItem: FileResponse | null;
  onClose: () => void;
}

const PreviewFileDialog = ({ previewItem, onClose }: Props) => {
  return (
    <Dialog open={!!previewItem} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <AlertDialogHeader>
          <DialogTitle>{previewItem?.name}</DialogTitle>
          <DialogDescription>
            {previewItem && formatFileSize(previewItem.size)} •{" "}
            {previewItem?.type}
          </DialogDescription>
        </AlertDialogHeader>
        <div className="mt-4">
          {previewItem && (
            <div className="bg-muted rounded-lg overflow-hidden">
              {previewItem.type.toLowerCase().includes("image") ? (
                <img
                  alt={previewItem.name}
                  src={
                    previewItem.path ||
                    "https://placehold.co/800x600?text=No+Image"
                  }
                  className="w-full h-auto rounded-lg max-h-[600px] object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/800x600?text=Error";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <span className="text-8xl mb-4">
                    {getFileIcon(previewItem.type)}
                  </span>
                  <p className="text-lg font-medium">{previewItem.name}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Xem trước không khả dụng cho loại file này
                  </p>
                  <Button className="mt-4">
                    <a
                      href={previewItem.path}
                      download={previewItem.name}
                      className="inline-flex gap-1 items-center"
                    >
                      <DownloadIcon className="size-4 mr-2" />
                      Tải xuống
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewFileDialog;
