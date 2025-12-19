import { usePostApiContentUpload } from "@/api/endpoints/content";
import { usePostApiFileUpload } from "@/api/endpoints/files";
import { MutationData } from "@/api/types/base";
import { FileResponse } from "@/api/types/file";
import { ContentEditorForm } from "@/components/modules/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ContentDetail = () => {
  // Mutations
  const createContentMutation = usePostApiContentUpload();

  const uploadFileMutation = usePostApiFileUpload();

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
    if (!values.file) {
      toast.error("Vui lòng chọn tệp tải lên.");
      return;
    }

    try {
      const fileUploadResponse = await uploadFileMutation.mutateAsync({
        data: {
          file: values.file,
        },
      });
      const fileData = (
        fileUploadResponse as unknown as MutationData<FileResponse>
      ).responseData;

      await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          file_url: fileData.path,
          file_id: fileData.path,
          category_id: values.category_id,
          file_type: values.file.type,
        },
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
          isLoading={
            createContentMutation.isPending || uploadFileMutation.isPending
          }
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default ContentDetail;
