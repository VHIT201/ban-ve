"use client";

// Core
import { z } from "zod";
import { useMemo } from "react";

// Internal
import { Button } from "@/components/ui/button";
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import {
  getGetApiCategoriesIdChildrenQueryKey,
  getGetApiCategoriesIdWithChildrenQueryKey,
  getGetApiCategoriesQueryKey,
  usePostApiCategories,
} from "@/api/endpoints/categories";
import type { PostApiCategoriesBody } from "@/api/models";
import { toast } from "sonner";
import { useUploadMedia } from "@/hooks";
import { extractErrorMessage } from "@/utils/error";
import baseConfig from "@/configs/base";
import { useParams, useSearchParams } from "next/navigation";
import { DynamicFilter } from "@/components/shared";
import CategoryDialog, {
  CategoryFormValues,
} from "../_components/category-dialog";
import CategoryTable from "../_components/category-table";

// Filter Schema
const categoryFilterSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
  description: z.string().optional(),
  createdAfter: z.string().optional(),
  createdBefore: z.string().optional(),
});

const Categories = () => {
  // Hooks
  const params = useParams<{ id: string }>();
  const id = params.id;
  const searchParams = useSearchParams();
  const withChildren = searchParams.get("withChildren") === "true";

  // States
  const [filterValues, setFilterValues] =
    useState<z.infer<typeof categoryFilterSchema>>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mutations
  const createCategoryMutation = usePostApiCategories({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiCategoriesQueryKey(),
          ...(id ? [getGetApiCategoriesIdChildrenQueryKey(id)] : []),
          ...(withChildren
            ? [getGetApiCategoriesIdWithChildrenQueryKey(id || "")]
            : []),
        ],
      },
    },
  });

  const uploadFileMutation = useUploadMedia();

  // Filter Configuration
  const filterFieldConfig = {
    name: {
      label: "Tên danh mục",
      type: "text" as const,
      placeholder: "Tìm theo tên danh mục...",
    },
  };

  // Methods
  const handleFilterSubmit = (data: z.infer<typeof categoryFilterSchema>) => {
    setFilterValues(data);

    const hasValues = Object.values(data).some(
      (value) => value !== undefined && value !== "",
    );
    if (!hasValues) {
      toast.info("Đã xóa bộ lọc");
    } else {
      toast.success("Đã áp dụng bộ lọc");
    }
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    if (!filterValues) return 0;
    return Object.values(filterValues).filter(
      (value) => value !== undefined && value !== "",
    ).length;
  }, [filterValues]);

  const handleCreateCategory = async (data: CategoryFormValues) => {
    try {
      let imageUrl: string | undefined = undefined;

      if (data.image) {
        const imageRes = await uploadFileMutation.uploadSingle(data.image, {
          filename: data.image?.name,
          dir: "categories",
          private: false,
        });

        if (imageRes?.path) {
          imageUrl = `${baseConfig.mediaDomain}${imageRes.path}`;
        }
      }

      const createData: PostApiCategoriesBody = {
        name: data.name,
        description: data.description,
      };

      if (id) {
        createData.parentId = id;
      }

      if (imageUrl) {
        createData.imageUrl = imageUrl;
      }

      await createCategoryMutation.mutateAsync({
        data: createData,
      });

      setIsDialogOpen(false);
      toast.success("Danh mục mới đã được tạo thành công.");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Filter Sidebar */}
      <DynamicFilter
        schema={categoryFilterSchema}
        onSubmit={handleFilterSubmit}
        fieldConfig={filterFieldConfig}
      >
        <DynamicFilter.Sidebar
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <div className="space-y-5">
            <DynamicFilter.Fields />
            <DynamicFilter.Actions />
          </div>
        </DynamicFilter.Sidebar>
      </DynamicFilter>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-7xl mx-auto space-y-6 p-6 lg:p-8">
          {/* Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Thể loại sản phẩm
              </h1>
              <p className="text-sm text-muted-foreground">
                Quản lý các thể loại sản phẩm trong hệ thống
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="default"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="gap-2 relative"
              >
                <SlidersHorizontalIcon className="h-4 w-4" />
                {isFilterOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
              </Button>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <PlusIcon className="h-4 w-4" />
                Thêm mới
              </Button>
            </div>
          </div>

          {/* Category Table */}
          <CategoryTable
            id={id}
            filterValues={filterValues}
            mode={id ? "children" : withChildren ? "with-children" : "all"}
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
      </div>
    </div>
  );
};

export default Categories;
