/**
 * VÍ DỤ: CHUYỂN ĐỔI TỪ COLLECTIONFILTERS SANG DYNAMICFILTER
 *
 * File này demo cách chuyển đổi component CollectionFilters hiện tại
 * sang sử dụng DynamicFilter với Tree và Number Range filters
 */

"use client";

import { z } from "zod";
import { DynamicFilter, TreeNode } from "@/components/shared/dynamic-filter";
import { useGetApiCategoriesAllTree } from "@/api/endpoints/categories";
import { ResponseData } from "@/api/types/base";

// ===== 1. ĐỊNH NGHĨA SCHEMA =====
const collectionFilterSchema = z.object({
  searchQuery: z.string().optional(),
  categories: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

type CollectionFilterValues = z.infer<typeof collectionFilterSchema>;

// ===== 2. PROPS =====
interface Props {
  onFilterChange?: (values: CollectionFilterValues) => void;
  initialValues?: Partial<CollectionFilterValues>;
}

// ===== 3. COMPONENT =====
export const CollectionFiltersDynamic = ({
  onFilterChange,
  initialValues,
}: Props) => {
  // Query để lấy category tree từ API
  const getCategoryTreeQuery = useGetApiCategoriesAllTree(
    {},
    {
      query: {
        select: (data) => {
          try {
            const response = data as unknown as ResponseData<any>;

            // Xử lý các cấu trúc response khác nhau
            if (response?.data?.tree && Array.isArray(response.data.tree)) {
              return transformToTreeNodes(response.data.tree);
            }
            if (response?.data && Array.isArray(response.data)) {
              return transformToTreeNodes(response.data);
            }
            if (Array.isArray(response)) {
              return transformToTreeNodes(response);
            }

            return [];
          } catch (error) {
            console.error("Error processing category tree data:", error);
            return [];
          }
        },
      },
    },
  );

  // ===== 4. FIELD CONFIG =====
  const fieldConfig = {
    searchQuery: {
      type: "text" as const,
      label: "Tìm kiếm",
      placeholder: "Tìm theo tên...",
      description: "Tìm kiếm sản phẩm theo tên",
    },
    categories: {
      type: "tree" as const,
      label: "Danh mục",
      placeholder: "Chọn danh mục",
      nodes: getCategoryTreeQuery,
      searchable: true,
      maxHeight: "350px",
    },
    priceRange: {
      type: "number-range" as const,
      label: "Khoảng giá",
      min: 0,
      max: 10000000,
      step: 100000,
      showInputs: true,
      formatValue: (value: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },
  };

  // ===== 5. DEFAULT VALUES =====
  const defaultValues: CollectionFilterValues = {
    searchQuery: initialValues?.searchQuery || "",
    categories: initialValues?.categories || [],
    priceRange: initialValues?.priceRange || [0, 10000000],
    minPrice: initialValues?.minPrice || 0,
    maxPrice: initialValues?.maxPrice || 10000000,
  };

  // ===== 6. SUBMIT HANDLER =====
  const handleSubmit = (data: CollectionFilterValues) => {
    // Sync minPrice và maxPrice với priceRange
    const syncedData = {
      ...data,
      minPrice: data.priceRange?.[0] ?? 0,
      maxPrice: data.priceRange?.[1] ?? 10000000,
    };

    onFilterChange?.(syncedData);
  };

  // ===== 7. RENDER =====
  return (
    <DynamicFilter
      schema={collectionFilterSchema}
      fieldConfig={fieldConfig}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

// ===== HELPER FUNCTIONS =====

/**
 * Transform API category data thành TreeNode format
 */
const transformToTreeNodes = (categories: any[]): TreeNode[] => {
  if (!Array.isArray(categories)) return [];

  return categories.map((category) => ({
    id: category._id || category.id,
    label: category.name,
    children: category.children
      ? transformToTreeNodes(category.children)
      : undefined,
    disabled: category.disabled || false,
  }));
};

// ===== SO SÁNH VỚI COLLECTIONFILTERS CŨ =====

/**
 * TRƯỚC (CollectionFilters.tsx):
 * - 400+ lines code
 * - Manually quản lý form state
 * - Riêng lẻ xử lý từng field type
 * - Custom UI cho từng filter
 * - Phức tạp trong việc sync state giữa các fields
 *
 * SAU (DynamicFilter):
 * - ~100 lines code
 * - React Hook Form + Zod tự động xử lý
 * - Reusable field configs
 * - Consistent UI
 * - State management tự động
 *
 * LỢI ÍCH:
 * ✅ Ít code hơn 75%
 * ✅ Type-safe với Zod schema
 * ✅ Validation tự động
 * ✅ Dễ maintain và extend
 * ✅ Consistent UX
 * ✅ Reusable cho các filters khác
 */

export default CollectionFiltersDynamic;
