"use client";

import {
  getGetApiContentAllQueryKey,
  getGetApiContentMyContentsQueryKey,
  getGetApiContentQueryKey,
  usePostApiContentUpload,
} from "@/api/endpoints/content";
import { ContentEditorForm } from "@/components/modules/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/error";
import { useUploadMedia } from "@/hooks";

const ContentDetail = () => {
  // Hooks
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutations
  const uploadMediaMutation = useUploadMedia();
  const createContentMutation = usePostApiContentUpload({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/content"] });
        router.push(BASE_PATHS.app.profile.collaborator.path);
      },
      meta: {
        invalidateQueries: [
          getGetApiContentQueryKey(),
          getGetApiContentAllQueryKey(),
          getGetApiContentMyContentsQueryKey(),
        ],
      },
    },
  });

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
    if (!values.content_file) {
      toast.error("Vui lòng chọn tệp tải lên.");
      return;
    }

    const price = Number(values.price) >= 0 ? Number(values.price) : 0;

    try {
      const warkMarkImages = [];
      if (values.images && values.images.length > 0) {
        for (const image of values.images) {
          const watermarkedImage =
            await uploadMediaMutation.applyWatermarkToImage(
              image as unknown as File,
              {
                text: "TẠO BỞI BANVE.VN",
                fontSize: 36,
                textOpacity: 0.7,
                overlayOpacity: 0.4,
                enableOverlay: true,
              },
            );

          warkMarkImages.push(watermarkedImage);
        }
      }

      await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          file_id: values.content_file._id,
          category_id: values.category_id,
          price: price,
          image1: warkMarkImages?.[0],
          image2: warkMarkImages?.[1],
          image3: warkMarkImages?.[2],
          image4: warkMarkImages?.[3],
          image5: warkMarkImages?.[4],
        },
      });

      toast.success("Tạo nội dung mới thành công");
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(
        errorMessage ||
          "Đã có lỗi xảy ra khi tạo nội dung mới. Vui lòng thử lại sau.",
      );
    }
  };

  return (
    <Card className="space-y-6">
      {/* Content Header */}
      <CardHeader className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link href={BASE_PATHS.app.profile.collaborator.path}>
            <ArrowLeftIcon className="size-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-wider">
              Thêm mới nội dung
            </h2>
            <p className="text-muted-foreground">
              Quản lý các nội dung trong hệ thống
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Content Detail */}
      <CardContent>
        <ContentEditorForm
          mode="create"
          isLoading={createContentMutation.isPending}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default ContentDetail;
