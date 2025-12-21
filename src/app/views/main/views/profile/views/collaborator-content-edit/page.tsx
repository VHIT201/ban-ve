import {
  useGetApiContentId,
  usePutApiContentId,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { ContentInput } from "@/api/models/contentInput";
import { ContentEditorForm } from "@/components/modules/content";
import { QueryBoundary } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { useRequiredPathParams } from "@/hooks";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ContentDetail = () => {
  // Hooks
  const { id } = useRequiredPathParams(["id"]);
  const queryClient = useQueryClient();

  // Queries
  const getContentDetailQuery = useGetApiContentId(
    id
  ) as UseQueryResult<ContentResponse>;

  // Mutations
  const editContentMutation = usePutApiContentId();

  // Methods
const handleUpdateContent = async (contentId: string, formData: ContentInput) => {
  try {
    await editContentMutation.mutateAsync({
      id: contentId,
      data: {
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        file_id: formData.file_id || '',
        field: formData.field || '',
        file_type: formData.file_type || '',
        file_url: formData.file_url || ''
      }
    }, {
      onSuccess: async () => {
        // Invalidate and refetch the specific content query
        await queryClient.invalidateQueries({ 
          queryKey: ['/api/content', contentId] 
        });
        // Also invalidate the list query if needed
        await queryClient.invalidateQueries({ 
          queryKey: ['/api/content'] 
        });
        toast.success("Nội dung đã được cập nhật thành công.");
      }
    });
  } catch (error) {
    console.error("Failed to update content:", error);
    toast.error("Đã có lỗi xảy ra khi cập nhật nội dung.");
  }
};

  return (
    <Card className="space-y-6">
      <CardHeader className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link to={BASE_PATHS.app.profile.collaborator.path}>
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
      </CardHeader>
      <CardContent>
        <QueryBoundary query={getContentDetailQuery}>
          {(contentDetail) => (
            <ContentEditorForm
              mode="edit"
              defaultValues={{
                title: contentDetail.title,
                description: contentDetail.description,
                category_id: contentDetail.category_id._id,
              }}
              onSubmit={(data) => handleUpdateContent(contentDetail._id, data)}
            />
          )}
        </QueryBoundary>
      </CardContent>
    </Card>
  );
};

export default ContentDetail;
