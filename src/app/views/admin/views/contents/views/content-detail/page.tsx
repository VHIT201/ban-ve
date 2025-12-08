import {
  useGetApiContentId,
  usePutApiContentIdApprove,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { ContentEditorForm } from "@/components/modules/content";
import { QueryBoundary } from "@/components/shared";
import { useRequiredPathParams } from "@/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";

const ContentDetail = () => {
  // Hooks
  const { id } = useRequiredPathParams(["id"]);

  // Queries
  const getContentDetailQuery = useGetApiContentId(
    id
  ) as UseQueryResult<ContentResponse>;

  // Mutations
  const editContentMutation = usePutApiContentIdApprove();

  // Methods
  const handleApproveContent = async (id: string) => {
    try {
      await editContentMutation.mutateAsync({
        id,
      });

      toast.success("Nội dung đã được duyệt thành công.");
    } catch (error) {
      console.error("Failed to approve content:", error);
      toast.error("Đã có lỗi xảy ra khi duyệt nội dung.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Chỉnh sửa nội dung
          </h2>
          <p className="text-muted-foreground">
            Quản lý các nội dung trong hệ thống
          </p>
        </div>
      </div>

      {/* Content Detail */}
      <QueryBoundary query={getContentDetailQuery}>
        {(contentDetail) => (
          <ContentEditorForm
            mode="edit"
            defaultValues={{
              title: contentDetail.title,
              description: contentDetail.description,
              category_id: contentDetail.category_id._id,
              content_file: {
                name: contentDetail.file_id.name,
                size: contentDetail.file_id.size,
                type: contentDetail.file_id.type,
                _id: contentDetail.file_id._id,
              },
            }}
            isLoading={editContentMutation.isPending}
            onSubmit={() => handleApproveContent(contentDetail._id)}
          />
        )}
      </QueryBoundary>
    </div>
  );
};

export default ContentDetail;
