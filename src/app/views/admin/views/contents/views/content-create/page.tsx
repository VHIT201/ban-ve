import { toast } from "sonner";
import { ContentEditorForm } from "@/components/modules/content";
import { usePostApiContentUpload } from "@/api/endpoints/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { MutationData } from "@/api/types/base";
import { FileResponse } from "@/api/types/file";
import { usePostApiFileUpload } from "@/api/endpoints/files";

const ContentDetail = () => {
  // Mutations
  const createContentMutation = usePostApiContentUpload();

  const uploadFileMutation = usePostApiFileUpload();

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
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
          fileUrl: fileData?.path || "",
          field: values.category_id,
          fileType: values.file.type,
        },
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
            Tạo nội dung mới
          </h2>
          <p className="text-muted-foreground">
            Quản lý các nội dung trong hệ thống
          </p>
        </div>
      </div>

      {/* Content Create Form */}
      <ContentEditorForm
        mode="create"
        isLoading={
          uploadFileMutation.isPending || createContentMutation.isPending
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ContentDetail;
