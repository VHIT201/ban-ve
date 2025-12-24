import {
  useGetApiContentId,
  usePutApiContentId,
  usePostApiContentUpload,
} from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { ContentEditorForm } from "@/components/modules/content";
import { QueryBoundary } from "@/components/shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { useRequiredPathParams } from "@/hooks";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const ContentDetail = () => {
  // Hooks
  const { id } = useRequiredPathParams(["id"]);
  const queryClient = useQueryClient();

  // Queries
  const getContentDetailQuery = useGetApiContentId(
    id
  ) as UseQueryResult<ContentResponse>;

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mutations
  const editContentMutation = usePutApiContentId();
  const uploadFileMutation = usePostApiContentUpload();

  // Methods
const handleUpdateContent = async (contentId: string, formData: any) => {
  try {
    setIsSubmitting(true);
    
    // Prepare the data for the API
    const updateData: {
      title?: string;
      description?: string;
      category_id?: string;
      price?: number;
      file_id?: string;
    } = {
      title: formData.title,
      description: formData.description,
      category_id: formData.category_id,
      price: formData.price,
    };

    // Handle file upload if there's a new file
    if (formData.file) {
      try {
        // First, upload the file to get a file ID
        const fileFormData = new FormData();
        fileFormData.append('file', formData.file);
        
        // This assumes you have a separate endpoint for file uploads
        // that returns the file ID
        const uploadResponse = await fetch('/api/files/upload', {
          method: 'POST',
          body: fileFormData,
          // Don't set Content-Type header - let the browser set it with the correct boundary
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!uploadResponse.ok) {
          throw new Error('File upload failed');
        }
        
        const fileData = await uploadResponse.json();
        
        if (fileData && fileData._id) {
          updateData.file_id = fileData._id;
        } else {
          throw new Error('Invalid file upload response');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Có lỗi xảy ra khi tải lên file. Vui lòng thử lại.');
        setIsSubmitting(false);
        return;
      }
    } else if (formData.content_file?._id) {
      // Use the existing file ID if no new file is uploaded
      updateData.file_id = formData.content_file._id;
    }

    // Update the content with the new data
    await editContentMutation.mutateAsync({
      id: contentId,
      data: updateData
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ 
          queryKey: ['/api/content', contentId] 
        });
        await queryClient.invalidateQueries({ 
          queryKey: ['/api/content'] 
        });
        toast.success("Nội dung đã được cập nhật thành công.");
      },
      onError: (error) => {
        console.error('Error updating content:', error);
        toast.error("Có lỗi xảy ra khi cập nhật nội dung.");
      },
      onSettled: () => {
        setIsSubmitting(false);
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error("Có lỗi không xác định xảy ra.");
    setIsSubmitting(false);
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
              isLoading={isSubmitting}
            />
          )}
        </QueryBoundary>
      </CardContent>
    </Card>
  );
};

export default ContentDetail;
