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
      const previewImages = values.images.slice(0, 4); // Max 4 images

      const fileUploadResponse = await uploadMediaMutation.uploadWithImages(
        fileToUpload as unknown as File,
        previewImages as unknown as File[],
        {
          filename: fileToUpload.name,
          dir: "contents",
          private: false,
          compress: false,
          applyWatermark: true, // Enable watermark
          watermarkOptions: {
            text: "TẠO BỞI BANVE.VN",
            fontSize: 24,
            textOpacity: 0.7,
            overlayOpacity: 0.4,
            enableOverlay: true,
          },
        },
      );

      const fileData = fileUploadResponse as unknown as UploadedFile;

      let image5Data = null;
      if (values.images[4]) {
        image5Data = await uploadMediaMutation.uploadSingle(
          values.images[4] as unknown as File,
          {
            dir: "contents/previews",
            compress: true,
            applyWatermark: true,
            watermarkOptions: {
              text: "TẠO BỞI BANVE.VN",
              fontSize: 24,
              textOpacity: 0.7,
              overlayOpacity: 0.4,
            },
          },
        );
      }

      const result = await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          category_id: values.category_id,
          file_id: fileData._id,
          price: values.price,
          image1: values?.images[0],
          image2: values?.images[1],
          image3: values?.images[2],
          image4: values?.images[3],
          image5: image5Data
            ? (image5Data as unknown as File)
            : values?.images[4],
        },
      });

      if (result) {
        toast.success("Nội dung đã được tạo thành công.");

        router.push(BASE_PATHS.admin.contents.path);
        router.refresh();
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo nội dung.");
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
