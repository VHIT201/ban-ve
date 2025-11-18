// Internal
import { Button } from "@/components/ui/button";
import { CategoryDialog, CategoryTable } from "./components";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { usePostApiCategories } from "@/api/endpoints/categories";
import { CategoryFormValues } from "./components/category-dialog/CategoryDialog";
import { toast } from "sonner";

const Categories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mutations
  const createCategoryMutation = usePostApiCategories();

  const handleCreateCategory = async (data: CategoryFormValues) => {
    try {
      await createCategoryMutation.mutateAsync({
        data,
      });

      setIsDialogOpen(false);
      toast.success("Danh mục mới đã được tạo thành công.");
    } catch {
      toast.error("Đã có lỗi xảy ra khi tạo mới danh mục.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Thể loại sản phẩm
          </h2>
          <p className="text-muted-foreground">
            Quản lý các thể loại sản phẩm trong hệ thống
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusIcon className="mr-2 size-4" />
          Thêm mới
        </Button>
      </div>

      {/* Category Table */}
      <CategoryTable />

      {/* Add Category Dialog */}
      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
};

export default Categories;
