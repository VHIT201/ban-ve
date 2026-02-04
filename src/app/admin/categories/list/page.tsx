"use client";

// Internal
import { Button } from "@/components/ui/button";
import { CategoryDialog, CategoryTable } from "../../views/categories/components";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  getGetApiCategoriesIdChildrenQueryKey,
  getGetApiCategoriesIdWithChildrenQueryKey,
  getGetApiCategoriesQueryKey,
  usePostApiCategories,
} from "@/api/endpoints/categories";
import { toast } from "sonner";
import { CategoryFormValues } from "../../views/categories/components/category-dialog";
import { useUploadMedia } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";
import baseConfig from "@/configs/base";
import { useParams, useSearchParams } from "next/navigation";

const Categories = () => {
  // Hooks
  const params = useParams<{ id: string }>();
  const id = params.id;
  const searchParams = useSearchParams();
  const withChildren = searchParams.get("withChildren") === "true";

  // States
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mutations
  const createCategoryMutation = usePostApiCategories({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiCategoriesQueryKey(),
          id ? getGetApiCategoriesIdChildrenQueryKey(id) : [],
          withChildren
            ? getGetApiCategoriesIdWithChildrenQueryKey(id || "")
            : [],
        ],
      },
    },
  });

  const uploadFileMutation = useUploadMedia();

  // Methods
  const handleCreateCategory = async (data: CategoryFormValues) => {
    try {
      const imageRes = await uploadFileMutation.uploadSingle(
        data.image as unknown as File,
        {
          filename: data.image?.name,
          dir: "categories",
          private: false,
        },
      );

      await createCategoryMutation.mutateAsync({
        data: {
          name: data.name,
          description: data.description,
          parentId: id,
          imageUrl: imageRes?.url
            ? `${baseConfig.mediaDomain}${imageRes.url}`
            : undefined,
        },
      });

      setIsDialogOpen(false);
      toast.success("Danh mục mới đã được tạo thành công.");
    } catch (error) {
      toast.error(extractErrorMessage(error));
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

      {/* Category Table - Sử dụng mode dựa trên id */}
      <CategoryTable
        mode={id ? "children" : withChildren ? "with-children" : "all"}
        id={id}
      />

      {/* Category Dialog */}
      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateCategory}
        loading={
          createCategoryMutation.isPending || uploadFileMutation.isUploading
        }
      />
    </div>
  );
};

export default Categories;
