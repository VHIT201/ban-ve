"use client";

import { toast } from "sonner";
import { ContentEditorForm } from "@/components/modules/content";
import {
  getGetApiContentAllQueryKey,
  getGetApiContentQueryKey,
  usePostApiContentUpload,
} from "@/api/endpoints/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { UploadedFile } from "@/api/types/file";
import { useRouter } from "next/navigation";
import { BASE_PATHS } from "@/constants/paths";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useUploadMedia } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";

const ContentCreate = () => {
  // Hooks
  const router = useRouter();

  // Mutations
  const uploadMediaMutation = useUploadMedia();
  const createContentMutation = usePostApiContentUpload({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiContentQueryKey(),
          getGetApiContentAllQueryKey(),
        ],
      },
    },
  });

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
    try {
      if (!values.images || values.images.length === 0) {
        toast.error("Vui lòng chọn ảnh để tải lên.");
        return;
      }

      if (!values.files || values.files.length === 0 || !values.files[0]) {
        toast.error("Vui lòng chọn file để tải lên.");
        return;
      }

      const fileToUpload = values.files[0];
      const fileUploadResponse = await uploadMediaMutation.uploadSingle(
        fileToUpload as unknown as File,
        {
          filename: fileToUpload.name,
          dir: "contents",
          private: false,
          compress: false,
          applyWatermark: true,
          watermarkOptions: {
            text: "CREATED BY BANVE.VN",
            fontSize: 36,
            textOpacity: 0.7,
            overlayOpacity: 0.4,
            enableOverlay: true,
          },
        },
      );

      const warkMarkImages = [];
      for (const image of values.images) {
        const watermarkedImage =
          await uploadMediaMutation.applyWatermarkToImage(
            image as unknown as File,
            {
              text: "TẠO BỞI DATA - DATAORY",
              fontSize: 36,
              textOpacity: 0.7,
              overlayOpacity: 0.4,
              enableOverlay: true,
              textColor: "#FFFFFF",
            },
          );

        warkMarkImages.push(watermarkedImage);
      }

      const fileData = fileUploadResponse as unknown as UploadedFile;

      const result = await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          category_id: values.category_id,
          file_id: fileData._id,
          price: values.price,
          image1: warkMarkImages?.[0],
          image2: warkMarkImages?.[1],
          image3: warkMarkImages?.[2],
          image4: warkMarkImages?.[3],
          image5: warkMarkImages?.[4],
        },
      });

      if (result) {
        toast.success("Nội dung đã được tạo thành công.");

        router.push(BASE_PATHS.admin.contents.path);
        router.refresh();
      }
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Có lỗi không xác định xảy ra.",
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link href={BASE_PATHS.admin.contents.path}>
            <ArrowLeftIcon className="size-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-wider">
              Tạo nội dung mới
            </h2>
            <p className="text-muted-foreground">
              Quản lý các nội dung trong hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Content Create Form */}
      <ContentEditorForm
        mode="create"
        isLoading={
          uploadMediaMutation.isUploading || createContentMutation.isPending
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ContentCreate;
