import { useGetApiContentId, usePutApiContentId } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { ContentEditorForm } from "@/components/modules/content";
import { QueryBoundary } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ContentDetail = () => {
  // Hooks
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  // Queries
  const getContentDetailQuery = useGetApiContentId(
    id
  ) as UseQueryResult<ContentResponse>;

  // Mutations
  const editContentMutation = usePutApiContentId();

  // Methods
const handleUpdateContent = async (contentId: string, formData: ContentFormValues) => {
  try {
    await editContentMutation.mutateAsync({
      id: contentId,
      data: {
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        price: formData.price,
        file_id: formData.content_file?._id || ""
      }
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ 
          queryKey: ['/api/content/my-contents'] 
        });
        await queryClient.invalidateQueries({ 
          queryKey: ['/api/content'] 
        });
        toast.success("Nội dung đã được cập nhật thành công.");
        router.push(BASE_PATHS.app.profile.collaborator.path);
      },
      onError: (error) => {
        console.error('Error updating content:', error);
        toast.error("Có lỗi xảy ra khi cập nhật nội dung.");
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error("Có lỗi không xác định xảy ra.");
  }
};

  return (
    <Card className="space-y-6">
      <CardHeader className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link href={BASE_PATHS.app.profile.collaborator.path}>
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
                category_id: contentDetail.category_id?._id || "",
                price: contentDetail.price,
                content_file: contentDetail.file_id ? {
                  _id: contentDetail.file_id._id,
                  name: contentDetail.file_id.name,
                  type: contentDetail.file_id.type,
                  size: contentDetail.file_id.size
                } : undefined
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
