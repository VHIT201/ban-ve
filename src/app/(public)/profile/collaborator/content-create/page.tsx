"use client";

import { usePostApiContentUpload } from "@/api/endpoints/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { ContentEditorForm } from "@/components/modules/content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ContentCreate = () => {
  // Hooks
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutations
  const createContentMutation = usePostApiContentUpload();

  // Methods
  const handleCreateContent = async (formData: ContentFormValues) => {
    try {
      // Prepare images data for API
      const imageData: any = {};
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          if (index < 5) {
            imageData[`image${index + 1}`] = image;
          }
        });
      }

      await createContentMutation.mutateAsync({
        data: {
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id,
          price: formData.price,
          file_id: formData.content_file?._id || "",
          ...imageData
        }
      }, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ 
            queryKey: ['/api/content/my-contents'] 
          });
          await queryClient.invalidateQueries({ 
            queryKey: ['/api/content'] 
          });
          toast.success("Nội dung đã được tạo thành công.");
          router.push(BASE_PATHS.app.profile.collaborator.path);
        },
        onError: (error) => {
          console.error('Error creating content:', error);
          toast.error("Có lỗi xảy ra khi tạo nội dung.");
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
              Tạo mới nội dung
            </h2>
            <p className="text-muted-foreground">
              Thêm nội dung mới vào hệ thống
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ContentEditorForm
          mode="create"
          defaultValues={{
            title: "",
            description: "",
            category_id: "",
            price: 0,
            content_file: undefined
          }}
          onSubmit={handleCreateContent}
        />
      </CardContent>
    </Card>
  );
};

export default ContentCreate;
