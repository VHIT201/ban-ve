import { usePostApiContentUpload } from "@/api/endpoints/content";
import { usePostApiFileUpload } from "@/api/endpoints/files";
import { MutationData } from "@/api/types/base";
import { FileResponse } from "@/api/types/file";
import { ContentEditorForm } from "@/components/modules/content";
import { ContentFormValues } from "@/components/modules/content/content-editor-form/ContentEditorForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ContentDetail = () => {
  // Hooks
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutations
  const createContentMutation = usePostApiContentUpload({
    mutation: {
      onSuccess: () => {
        // Invalidate the content list query to refresh the data
        queryClient.invalidateQueries({ queryKey: ["/api/content"] });
        // Navigate back to the content list
        router.push(BASE_PATHS.app.profile.collaborator.path);
      },
    },
  });

  // Methods
  const handleSubmit = async (values: ContentFormValues) => {
    if (!values.content_file) {
      toast.error("Vui lòng chọn tệp tải lên.");
      return;
    }

    const price = Number(values.price) >= 0 ? Number(values.price) : 0;

    try {
      await createContentMutation.mutateAsync({
        data: {
          title: values.title,
          description: values.description,
          file_id: values.content_file._id,
          category_id: values.category_id,
          price: price,
        },
      });

      toast.success(
        "Đã gửi yêu cầu tạo bản vẽ mới thành công. Vui lòng chờ quản trị viên phê duyệt."
      );
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo bản vẽ mới. Vui lòng thử lại sau.");
    }
  };

  return (
    <Card className="space-y-6">
      {/* Content Header */}
      <CardHeader className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link href={BASE_PATHS.app.profile.collaborator.path}>
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
          isLoading={createContentMutation.isPending}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default ContentDetail;
