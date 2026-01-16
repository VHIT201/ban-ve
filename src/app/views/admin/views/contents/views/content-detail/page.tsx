import {
  getGetApiContentIdQueryKey,
  getGetApiContentQueryKey,
  useGetApiContentId,
  usePutApiContentId,
  usePutApiContentIdApprove,
} from "@/api/endpoints/content";
import { ContentInput } from "@/api/models";
import { ContentResponse } from "@/api/types/content";
import { ContentEditorForm } from "@/components/modules/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { QueryBoundary } from "@/components/shared";
import { BASE_PATHS } from "@/constants/paths";
import { useRequiredPathParams } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";
import { UseQueryResult } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ContentDetail = () => {
  // Hooks
  const { id: contentId } = useRequiredPathParams(["id"]);

  // Queries
  const getContentDetailQuery = useGetApiContentId(
    contentId,
    {}
  ) as UseQueryResult<ContentResponse>;

  // Mutations
  const editContentMutation = usePutApiContentId({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiContentIdQueryKey(contentId),
          getGetApiContentQueryKey(),
        ],
      },
    },
  });

  // Methods
  const handleUpdateContent = async (formData: ContentFormValues) => {
    try {
      await editContentMutation.mutateAsync({
        id: contentId,
        data: {
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id,
          price: formData.price,
          file_id: formData?.content_file?._id,
        },
      });

      toast.success("Nội dung đã được cập nhật thành công.");
    } catch (error) {
      toast.error(
        extractErrorMessage(error) || "Có lỗi không xác định xảy ra."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link to={BASE_PATHS.admin.contents.path}>
            <ArrowLeftIcon className="size-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-wider">
              Chỉnh sửa nội dung
            </h2>
            <p className="text-muted-foreground">
              Quản lý các nội dung trong hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Content Detail */}
      <QueryBoundary query={getContentDetailQuery}>
        {(contentDetail) => {
          console.log("CONTENT DETAIL : ", contentDetail);

          return (
            <ContentEditorForm
              mode="edit"
              defaultValues={{
                title: contentDetail.title,
                description: contentDetail.description,
                category_id: contentDetail?.category?._id,
                price: contentDetail.price,
                content_file: {
                  name: contentDetail?.file_id?.name ?? "",
                  size: contentDetail?.file_id?.size ?? 0,
                  type: contentDetail?.file_id?.type ?? "",
                  _id: contentDetail?.file_id?._id ?? "",
                },
              }}
              defaultFiles={
                contentDetail?.file_id?.url ? [contentDetail.file_id.url] : []
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

export default ContentDetail;
