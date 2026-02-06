"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { cn } from "@/utils/ui";
import { CameraIcon, ImagePlusIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  avatarUrl: string;
  avatarAlt: string;
  onAvatarChange?: (file: File) => void;
  className?: string;
}

const UploadAvatarDialog: FC<Props> = ({
  avatarUrl,
  avatarAlt,
  onAvatarChange,
  className,
}) => {
  // State để lưu file đã chọn và preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Hàm xử lý khi file được chọn
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]!;
      setSelectedFile(file);

      // Tạo preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  }, []);

  // Hàm xóa file đã chọn
  const handleRemoveFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  }, [previewUrl]);

  // Hook Dropzone
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    noClick: true, // Vô hiệu hóa click trực tiếp để tự control
  });

  // Xử lý lưu avatar
  const handleSaveAvatar = () => {
    if (selectedFile && onAvatarChange) {
      onAvatarChange(selectedFile);
      // Reset sau khi lưu
      handleRemoveFile();
    }
  };

  // Cleanup preview URL khi component unmount
  useState(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  });

  // URL ảnh để hiển thị (preview nếu có, không thì dùng avatarUrl)
  const displayAvatarUrl = previewUrl || avatarUrl;

  return (
    <Dialog>
      <div className={cn("relative w-fit h-fit mx-auto", className)}>
        <Avatar className={cn("relative z-10", "size-48 border-3")}>
          <AvatarImage src={avatarUrl} alt={avatarAlt} className="size-48" />
          <AvatarFallback className="text-lg font-semibold bg-primary text-white">
            {avatarAlt
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <DialogTrigger
          asChild
          className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2"
        >
          <Button
            variant="outline"
            className="group size-10 rounded-full border-2"
          >
            <CameraIcon className="group-hover:text-white size-6 text-gray-300" />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cập nhật ảnh đại diện
          </DialogTitle>
        </DialogHeader>

        {/* Avatar Container với Dropzone */}
        <div className="mb-8 flex justify-center">
          <div
            {...getRootProps()}
            className={cn(
              "relative flex h-fit mx-auto w-fit items-center justify-center",
              "rounded-full border-2 border-dashed cursor-pointer",
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary",
              "transition-colors duration-200",
            )}
          >
            <input {...getInputProps()} />

            <Avatar
              className={cn(
                "overflow-hidden rounded-full border-4",
                "size-64 border-3",
                isDragActive && "opacity-80",
              )}
            >
              <AvatarImage
                src={displayAvatarUrl}
                alt="Avatar preview"
                className="size-64 bg-transparent object-cover  "
              />
              <AvatarFallback className="relative overflow-hidden">
                <Image
                  src={displayAvatarUrl}
                  alt="Avatar preview"
                  className="h-full w-full bg-transparent object-cover"
                />
              </AvatarFallback>
            </Avatar>

            {/* Overlay khi drag */}
            {isDragActive && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                <p className="text-white font-medium">Thả ảnh vào đây</p>
              </div>
            )}

            {/* Hiển thị khi có file được chọn */}
            {selectedFile && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="rounded-full size-12 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Hướng dẫn */}
        <div className="mb-6 text-center text-sm text-gray-500">
          <p>Kéo thả ảnh vào khung hoặc nhấn nút bên dưới</p>
          <p className="text-xs mt-1">Hỗ trợ: JPG, PNG, GIF (tối đa 50MB)</p>
        </div>

        <DialogFooter className="flex w-full items-center !justify-between">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleRemoveFile}>
              Hủy
            </Button>
          </DialogClose>
          <div className="space-x-2">
            <Button variant="outline" onClick={open} type="button">
              <ImagePlusIcon className="size-4 mr-2" />
              Chọn ảnh
            </Button>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={handleSaveAvatar}
                disabled={!selectedFile}
              >
                <SaveIcon className="size-4 mr-2" />
                Lưu
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadAvatarDialog;
