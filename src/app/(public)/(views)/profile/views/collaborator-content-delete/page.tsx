import { useDeleteApiContentId } from "@/api/endpoints/content";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BASE_PATHS } from "@/constants/paths";
import { useRequiredPathParams } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteContentPage() {
  const { id } = useRequiredPathParams(["id"]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteApiContentId({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa nội dung thành công");
        queryClient.invalidateQueries({ queryKey: ["content"] });
        router.push(BASE_PATHS.app.profile.collaborator.path);
      },
      onError: (error: any) => {
        console.error("Failed to delete content:", error);
        toast.error(
          `Lỗi khi xóa nội dung: ${error?.message || "Vui lòng thử lại sau"}`
        );
      },
    },
  });

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nội dung này?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <h2 className="text-2xl font-bold">Xóa nội dung</h2>
        <p className="text-muted-foreground">
          Bạn đang thực hiện xóa nội dung này. Hành động này không thể hoàn tác.
        </p>
      </CardHeader>
      <CardContent>
        <p>Bạn có chắc chắn muốn xóa nội dung này không?</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={deleteMutation.isPending}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Đang xóa..." : "Xác nhận xóa"}
        </Button>
      </CardFooter>
    </Card>
  );
}
