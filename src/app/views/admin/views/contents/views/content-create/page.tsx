import { toast } from "sonner";
import { ContentEditorForm } from "@/components/modules/content";
import {
  getGetApiContentQueryKey,
  usePostApiContentUpload,
} from "@/api/endpoints/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { MutationData } from "@/api/types/base";
import { FileResponse } from "@/api/types/file";
import { usePostApiFileUpload } from "@/api/endpoints/files";
import { useNavigate } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const ContentDetail = () => {
  // Hooks
  const navigate = useNavigate();

  // Mutations
  const uploadFileMutation = usePostApiFileUpload();
  const createContentMutation = usePostApiContentUpload({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiContentQueryKey()],
      },
    },
  });

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
    try {
      if (!values.file) {
        toast.error("Vui lòng chọn file để tải lên.");
        return;
      }

      const fileUploadResponse = await uploadFileMutation.mutateAsync({
        data: {
          file: values.file,
        },
      });
      const fileData = (
        fileUploadResponse as unknown as MutationData<FileResponse>
      ).data;

      await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          category_id: values.category_id,
          file_id: fileData?._id,
        },
      });

      navigate(BASE_PATHS.admin.contents.path);
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
        <div className="flex items-center gap-4">
          <Link to={BASE_PATHS.admin.contents.path}>
            <ArrowLeftIcon className="size-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-wider">
              Tạo nội dung mới
            </h2>
            <p className="text-muted-foreground">
              Quản lý các nội dung trong hệ thống
            </p>
          </div>
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
