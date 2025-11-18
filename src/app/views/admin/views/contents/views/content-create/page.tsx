import { toast } from "sonner";
import { ContentEditorForm } from "@/components/modules/content";
import { usePostApiContentUpload } from "@/api/endpoints/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";

const ContentDetail = () => {
  // Mutations
  const createContentMutation = usePostApiContentUpload();

  // Methods
  const handleCreateContent = async (data: ContentFormValues) => {
    try {
      await createContentMutation.mutateAsync({
        data: {
          title: data.title,
          description: data.description,
          field: "",
          fileType: "",
          fileUrl: "",
        },
      });

      toast.success("Nội dung đã được tạo thành công.");
    } catch (error) {
      console.error("Failed to create content:", error);
      toast.error("Đã có lỗi xảy ra khi tạo nội dung.");
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
      <ContentEditorForm mode="create" onSubmit={handleCreateContent} />
    </div>
  );
};

export default ContentDetail;
