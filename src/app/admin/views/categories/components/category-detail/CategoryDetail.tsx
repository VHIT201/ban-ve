"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PlusIcon, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { AxiosError } from "axios";

import CategoryDialog from "../category-dialog";
import { CategoryFormValues } from "../category-dialog/lib/types";
import { useUploadMedia } from "@/hooks";
import baseConfig from "@/configs/base";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/shared";
import { DataTableBulkActions } from "@/components/shared/data-table/shared";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  useGetApiCategoriesIdChildren,
  usePostApiCategories,
  useDeleteApiCategoriesId,
  useGetApiCategories,
  usePutApiCategoriesId,
} from "@/api/endpoints/categories";
import { useCategoryTableColumnsDefs } from "../category-table/lib/hooks";
import { Category } from "@/api/models";
import type {
  GetApiCategoriesIdChildren200,
  GetApiCategories200,
} from "@/api/models";

const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 10,
};

const extractSubcategories = (
  res: GetApiCategoriesIdChildren200 | Category[] | undefined,
): Category[] => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  return res?.data?.children ?? [];
};

export const CategoryDetail = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  // Upload hook
  const uploadFileMutation = useUploadMedia();

  const { data: currentCategory } = useGetApiCategories(
    {},
    {
      query: {
        enabled: !!id,
        queryKey: ["category", id],
        select: (data: GetApiCategories200) => {
          const categories = data?.data?.categories || [];
          const category = categories[0];
          return category
            ? {
                id: category._id,
                name: category.name || "",
                slug: category.slug || "",
                description: category.description,
                parentId: category.parentId,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
              }
            : null;
        },
      },
    },
  );

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetApiCategoriesIdChildren(
    id ?? "",
    {},
    {
      query: {
        enabled: !!id,
        queryKey: ["subcategories", id],
      },
    },
  );

  const subcategories = useMemo(
    () => extractSubcategories(response),
    [response],
  );

  const { mutate: createCategory, isPending: isCreating } =
    usePostApiCategories({
      mutation: {
        onSuccess: () => {
          toast.success("Tạo danh mục con thành công");
          setIsCreateDialogOpen(false);
          refetch();

          // Reload page after success
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        onError: (err: AxiosError<{ message?: string }>) => {
          toast.error(err.response?.data?.message ?? "Tạo danh mục thất bại");
        },
      },
    });

  const deleteCategoryMutation = useDeleteApiCategoriesId({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa danh mục con thành công");
        setCategoryToDelete(null);
        setDeleteConfirmationText("");
        refetch();

        // Reload page after success
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Có lỗi xảy ra khi xóa");
      },
    },
  });

  const updateCategoryMutation = usePutApiCategoriesId({
    mutation: {
      onSuccess: () => {
        toast.success("Cập nhật danh mục thành công");
        setCategoryToEdit(null);
        refetch();

        // Reload page after success
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Có lỗi xảy ra khi cập nhật");
      },
    },
  });

  const handleCreateSubmit = async (data: CategoryFormValues) => {
    if (!id) return;

    try {
      // Upload image if exists
      let imageUrl = "";
      if (data.image) {
        const imageRes = await uploadFileMutation.uploadSingle(
          data.image as File,
          {
            filename: data.image.name,
            dir: "categories",
            private: false,
          },
        );

        if (imageRes?.path) {
          imageUrl = `${baseConfig.mediaDomain}${imageRes.path}`;
        }
      } else {
        console.log("❌ No image selected");
      }
      // Create category with parentId and imageUrl
      createCategory({
        data: {
          name: data.name,
          description: data.description,
          parentId: id,
          ...(imageUrl && { imageUrl }), // Only include imageUrl if it exists
        },
      });
    } catch (error) {
      console.error("❌ Error creating category:", error);
      toast.error("Có lỗi xảy ra khi upload ảnh");
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete || deleteConfirmationText !== categoryToDelete.name)
      return;

    await deleteCategoryMutation.mutateAsync({
      id: categoryToDelete._id!,
    });
  };

  const handleEditSubmit = async (data: CategoryFormValues) => {
    if (!categoryToEdit?._id) return;

    try {
      // Keep existing imageUrl or get from form data
      let imageUrl = data.imageUrl || categoryToEdit.imageUrl || "";

      // Upload new image if selected
      if (data.image) {
        const imageRes = await uploadFileMutation.uploadSingle(
          data.image as File,
          {
            filename: data.image.name,
            dir: "categories",
            private: false,
          },
        );

        if (imageRes?.path) {
          imageUrl = `${baseConfig.mediaDomain}${imageRes.path}`;
        }
      }

      // Prepare update data
      const updateData: import("@/api/models").PutApiCategoriesIdBody = {
        name: data.name,
        description: data.description,
      };

      // Only include imageUrl if it exists
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      // Update category
      await updateCategoryMutation.mutateAsync({
        id: categoryToEdit._id,
        data: updateData,
      });
    } catch (error) {
      console.error("❌ Error updating category:", error);
      toast.error("Có lỗi xảy ra khi upload ảnh");
    }
  };

  const handleViewDetails = (category: Category) => {
    if (category?._id) {
      router.push(`/admin/categories/${category._id}`);
    }
  };

  const columns = useCategoryTableColumnsDefs({
    onViewDetails: handleViewDetails,
    onDelete: (category) => setCategoryToDelete(category),
    onEdit: (category) => setCategoryToEdit(category),
  });

  const bulkActionList = useMemo(
    () => [
      {
        label: "Xóa danh mục đã chọn",
        tooltip: "Xóa tất cả danh mục con đang được chọn",
        icon: Trash2,
        variant: "destructive" as const,
        onAction: () => {},
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-destructive">
        Không thể tải danh sách danh mục con
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {(currentCategory as Category)?.name ?? "Danh mục chi tiết"}
          </h1>
        </div>

        <Button onClick={() => setIsCreateDialogOpen(true)} disabled={!id}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Thêm danh mục con
        </Button>
      </div>

      <CategoryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
        onSubmit={handleCreateSubmit}
        loading={isCreating}
      />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục con ({subcategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={subcategories}
            rowCount={subcategories.length}
            manualPagination
            enablePagination
            enableRowSelection
            state={{ pagination }}
            onPaginationChange={setPagination}
          >
            <DataTable.Content>
              <DataTable.Header />
              <DataTable.Body />
            </DataTable.Content>
            <DataTable.Pagination />

            <DataTableBulkActions
              actions={bulkActionList}
              entityName="danh mục con"
            />
          </DataTable>
        </CardContent>
      </Card>

      <CategoryDialog
        open={!!categoryToEdit}
        onOpenChange={(open: boolean) => !open && setCategoryToEdit(null)}
        mode="edit"
        category={categoryToEdit as any}
        onSubmit={handleEditSubmit}
        loading={updateCategoryMutation.isPending}
      />

      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent className="border border-destructive p-0">
          <AlertDialogHeader className="px-6 pt-6">
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              Xóa dữ liệu
            </AlertDialogTitle>

            <AlertDialogDescription className="mt-2 space-y-3 text-sm">
              <p>
                Bạn chắc chắn muốn xóa{" "}
                <span className="font-semibold text-destructive">
                  {categoryToDelete?.name}
                </span>
                ?
              </p>
              <p>
                Hành động này không thể hoàn tác. Vui lòng nhập tên để xác nhận.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="px-6">
            <Input
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="Nhập tên danh mục để xác nhận"
            />
          </div>

          <div className="mx-6 mt-4 rounded-md bg-destructive px-4 py-3 text-sm font-medium text-destructive-foreground">
            ⚠️ Cảnh báo
            <div className="font-normal">
              Hành động này sẽ xóa vĩnh viễn danh mục và toàn bộ dữ liệu liên
              quan.
            </div>
          </div>

          <AlertDialogFooter className="px-6 pb-6 pt-4">
            <AlertDialogCancel disabled={deleteCategoryMutation.isPending}>
              Hủy
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteCategory}
              disabled={
                deleteCategoryMutation.isPending ||
                deleteConfirmationText !== categoryToDelete?.name
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteCategoryMutation.isPending ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryDetail;
