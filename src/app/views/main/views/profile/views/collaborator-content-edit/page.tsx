import {
  useGetApiContentId,
  usePutApiContentIdApprove,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { ContentEditorForm } from "@/components/modules/content";
import { QueryBoundary } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { useRequiredPathParams } from "@/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
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
    <Card className="space-y-6">
      {/* Content Header */}
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

      {/* Content Detail */}
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
              onSubmit={() => handleApproveContent(contentDetail._id)}
            />
          )}
        </QueryBoundary>
      </CardContent>
    </Card>
  );
};

export default ContentDetail;
