import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { PlusIcon, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { AxiosError } from "axios";

import { EditCategoryDialog } from "./components/EditCategoryDialog";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/shared";
import { DataTableBulkActions } from "@/components/shared/data-table/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
} from "@/api/endpoints/categories";
import { useCategoryTableColumnsDefs } from "../category-table/lib/hooks";
import { Category } from "@/api/models";
import { CategoryDetailProps } from "./types";

const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 10,
};

const extractSubcategories = (res: any): Category[] => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  return res?.data?.children ?? res?.children ?? [];
};

const generateSlug = (value?: string) =>
  value
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "") ?? "";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  displayOrder: z.number().default(0),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [categoryToEdit, setCategoryToEdit] =
    useState<CategoryDetailProps | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
      description: "",
      displayOrder: 0,
    },
  });

  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === "name") {
        form.setValue("slug", generateSlug(value.name));
      }
    });
    return () => sub.unsubscribe();
  }, [form]);

  const { data: currentCategory } = useGetApiCategories({
    query: {
      enabled: !!id,
      queryKey: ["category", id],
      select: (data: Category | Category[]) => {
        const category = Array.isArray(data) ? data[0] : data;
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
  });

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetApiCategoriesIdChildren(id ?? "", {
    query: {
      enabled: !!id,
      queryKey: ["subcategories", id],
    },
  });

  const subcategories = useMemo(
    () => extractSubcategories(response),
    [response]
  );

  const { mutate: createCategory, isPending: isCreating } =
    usePostApiCategories({
      mutation: {
        onSuccess: () => {
          toast.success("Tạo danh mục con thành công");
          form.reset();
          setIsCreateDialogOpen(false);
          refetch();
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
      },
      onError: (error: Error) => {
        toast.error(error.message || "Có lỗi xảy ra khi xóa");
      },
    },
  });

  const handleCreateSubmit = (data: CategoryFormValues) => {
    if (!id) return;
    createCategory({ data: { ...data, parentId: id } });
  };

  const handleDeleteCategory = async () => {
    if (
      !categoryToDelete ||
      deleteConfirmationText !== categoryToDelete.name
    )
      return;

    await deleteCategoryMutation.mutateAsync({
      id: categoryToDelete._id!,
    });
  };

  const handleViewDetails = (category: Category) => {
    if (category?._id) {
      navigate(`/admin/categories/detail/${category._id}`);
    }
  };

  const columns = useCategoryTableColumnsDefs({
    onViewDetails: handleViewDetails,
    onDelete: (category) => setCategoryToDelete(category),
    onEdit: (category) => setCategoryToEdit(category as CategoryDetailProps),
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
    []
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
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {(currentCategory as Category)?.name ?? "Danh mục chi tiết"}
          </h1>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!id}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Thêm danh mục con
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm danh mục con</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên danh mục</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Hủy</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? "Đang tạo..." : "Tạo mới"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách danh mục con ({subcategories.length})
          </CardTitle>
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

      <EditCategoryDialog
        category={categoryToEdit}
        open={!!categoryToEdit}
        onOpenChange={(open) => !open && setCategoryToEdit(null)}
        onSuccess={refetch}
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
              Hành động này sẽ xóa vĩnh viễn danh mục và toàn bộ dữ liệu liên quan.
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
