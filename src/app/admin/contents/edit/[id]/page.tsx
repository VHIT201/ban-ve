"use client";

import {
  getGetApiContentAllQueryKey,
  getGetApiContentIdQueryKey,
  getGetApiContentQueryKey,
  useGetApiContentId,
  usePutApiContentId,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { ContentEditorForm } from "@/components/modules/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { QueryBoundary } from "@/components/shared";
import { BASE_PATHS } from "@/constants/paths";
import { useUploadMedia } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";
import { UseQueryResult } from "@tanstack/react-query";
import { ArrowLeftIcon, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

const ContentEditPage = () => {
  // Hooks
  const params = useParams();
  const contentId = (params?.id as string) || "";
  const router = useRouter();

  // Queries
  const getContentDetailQuery = useGetApiContentId(contentId, {
    query: {
      enabled: !!contentId,
      retry: 1,
    },
  }) as UseQueryResult<ContentResponse>;

  // Mutations
  const uploadMediaMutation = useUploadMedia();

  const editContentMutation = usePutApiContentId({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiContentAllQueryKey(),
          getGetApiContentIdQueryKey(contentId),
          getGetApiContentQueryKey(),
        ],
      },
    },
  });

  // Methods
  const handleUpdateContent = async (
    formData: ContentFormValues & { removeImages?: string[] },
  ) => {
    try {
      const warkMarkImages = [];
      if (formData.images && formData.images.length > 0) {
        for (const image of formData?.images) {
          const watermarkedImage =
            await uploadMediaMutation.applyWatermarkToImage(
              image as unknown as File,
              {
                text: "TẠO BỞI DATA - DATAORY",
                fontSize: 36,
                textOpacity: 0.7,
                overlayOpacity: 0.4,
                enableOverlay: true,
              },
            );

          warkMarkImages.push(watermarkedImage);
        }
      }

      const result = await editContentMutation.mutateAsync({
        id: contentId,
        data: {
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id,
          price: formData.price,
          file_id: formData?.content_file?._id,
          removeImages: formData?.removeImages,
          image1: warkMarkImages?.[0],
          image2: warkMarkImages?.[1],
          image3: warkMarkImages?.[2],
          image4: warkMarkImages?.[3],
          image5: warkMarkImages?.[4],
        },
      });

      if (result) {
        toast.success("Nội dung đã được cập nhật thành công.");

        await getContentDetailQuery.refetch();

        setTimeout(() => {
          router.push(BASE_PATHS.admin.contents.path);
          router.refresh();
        }, 300);
      }
    } catch (error) {
      console.error("Update content error:", error);
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
              Chỉnh sửa nội dung
            </h2>
            <p className="text-muted-foreground">
              Cập nhật thông tin và quản lý nội dung
            </p>
          </div>
        </div>
      </div>

      {/* Content Edit Form */}
      <QueryBoundary
        query={getContentDetailQuery}
        errorView={(error) => (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">
                  Không thể tải thông tin nội dung
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {error?.message || "Đã có lỗi xảy ra khi tải dữ liệu"}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Vui lòng kiểm tra ID nội dung hoặc thử lại sau.
                </p>
              </div>
            </div>
          </div>
        )}
      >
        {(contentDetail) => {
          console.log("Content Detail Data:", contentDetail);

          return (
            <ContentEditorForm
              mode="edit"
              defaultValues={{
                title: contentDetail.title,
                description: contentDetail.description,
                category_id: contentDetail?.category_id?._id,
                price: contentDetail.price,
                content_file: {
                  name: contentDetail?.file_id?.name ?? "",
                  size: contentDetail?.file_id?.size ?? 0,
                  type: contentDetail?.file_id?.type ?? "",
                  _id: contentDetail?.file_id?._id ?? "",
                },
              }}
              defaultFile={
                contentDetail?.file_id?.path
                  ? {
                      id: contentDetail?.file_id?._id ?? "",
                      name: contentDetail?.file_id?.name ?? "",
                      size: contentDetail?.file_id?.size ?? 0,
                      type: contentDetail?.file_id?.type ?? "",
                      path: contentDetail?.file_id?.path ?? "",
                    }
                  : undefined
              }
              defaultImages={contentDetail?.images || []}
              isLoading={editContentMutation.isPending}
              onSubmit={handleUpdateContent}
            />
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default ContentEditPage;
