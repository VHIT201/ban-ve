import { toast } from "sonner";
import { ContentEditorForm } from "@/components/modules/content";
import {
  getGetApiContentQueryKey,
  usePostApiContentUpload,
} from "@/api/endpoints/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { UploadedFile } from "@/api/types/file";
import { useNavigate } from "react-router-dom";
import { BASE_PATHS } from "@/constants/paths";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useUploadMedia } from "@/hooks";

const ContentDetail = () => {
  // Hooks
  const navigate = useNavigate();

  // Mutations
  const uploadMediaMutation = useUploadMedia();
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
      if (!values.images || values.images.length === 0) {
        toast.error("Vui lòng chọn ảnh để tải lên.");
        return;
      }

      // const imageUploadResponse = await uploadMediaMutation.uploadWithImages(
      //   values.images[0],
      //   values.images,
      //   {
      //     filename: values.images[0].name,
      //     dir: "contents",
      //     private: false,
      //     compress: false,
      //   }
      // );

      // const imageData = imageUploadResponse as unknown as UploadedFile;

      if (!values.files || values.files.length === 0) {
        toast.error("Vui lòng chọn file để tải lên.");
        return;
      }

      const fileUploadResponse = await uploadMediaMutation.uploadWithImages(
        values.files[0],
        values.files,
        {
          filename: values.files[0].name,
          dir: "contents",
          private: false,
          compress: false,
        }
      );

      const fileData = fileUploadResponse as unknown as UploadedFile;

      await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          category_id: values.category_id,
          file_id: fileData._id,
          price: values.price,
          image1: values?.images[0],
          image2: values?.images[1],
          image3: values?.images[2],
          image4: values?.images[3],
          image5: values?.images[4],
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
          uploadMediaMutation.isUploading || createContentMutation.isPending
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ContentDetail;
