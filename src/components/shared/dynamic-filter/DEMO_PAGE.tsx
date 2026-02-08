/**
 * DEMO: Test Tree Select và Number Range Filters
 *
 * Copy component này vào một page để test ngay
 * VD: src/app/test-filters/page.tsx
 */

"use client";

import { z } from "zod";
import { DynamicFilter, TreeNode } from "@/components/shared/dynamic-filter";

// ===== DEMO DATA =====
const demoCategories: TreeNode[] = [
  {
    id: "electronics",
    label: "Electronics",
    children: [
      { id: "phones", label: "Phones" },
      { id: "laptops", label: "Laptops" },
      { id: "tablets", label: "Tablets" },
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    children: [
      {
        id: "men",
        label: "Men",
        children: [
          { id: "men-shirts", label: "Shirts" },
          { id: "men-pants", label: "Pants" },
        ],
      },
      {
        id: "women",
        label: "Women",
        children: [
          { id: "women-dresses", label: "Dresses" },
          { id: "women-skirts", label: "Skirts" },
        ],
      },
    ],
  },
  {
    id: "home",
    label: "Home & Garden",
    children: [
      { id: "furniture", label: "Furniture" },
      { id: "decor", label: "Decor" },
    ],
  },
];

// ===== SCHEMA =====
const demoFilterSchema = z.object({
  // Text search
  search: z.string().optional(),

  // Tree select
  categories: z.array(z.string()).optional(),

  // Number range (price)
  priceRange: z.tuple([z.number(), z.number()]).optional(),

  // Number range (rating)
  ratingRange: z.tuple([z.number(), z.number()]).optional(),

  // Number range (discount)
  discountRange: z.tuple([z.number(), z.number()]).optional(),
});

type DemoFilterValues = z.infer<typeof demoFilterSchema>;

// ===== COMPONENT =====
export const DemoTreeAndRangeFilters = () => {
  // Field configuration
  const fieldConfig = {
    search: {
      type: "text" as const,
      label: "🔍 Tìm kiếm",
      placeholder: "Tìm sản phẩm...",
    },
    categories: {
      type: "tree" as const,
      label: "📁 Danh mục",
      placeholder: "Chọn danh mục",
      nodes: demoCategories,
      searchable: true,
      maxHeight: "350px",
    },
    priceRange: {
      type: "number-range" as const,
      label: "💰 Khoảng giá",
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
    ratingRange: {
      type: "number-range" as const,
      label: "⭐ Đánh giá",
      min: 0,
      max: 5,
      step: 0.5,
      showInputs: true,
      formatValue: (value: number) => `${value} ⭐`,
    },
    discountRange: {
      type: "number-range" as const,
      label: "🎯 Giảm giá (%)",
      min: 0,
      max: 100,
      step: 5,
      showInputs: true,
      formatValue: (value: number) => `${value}%`,
    },
  };

  // Default values
  const defaultValues: DemoFilterValues = {
    search: "",
    categories: [],
    priceRange: [0, 10000000],
    ratingRange: [0, 5],
    discountRange: [0, 100],
  };

  // Submit handler
  const handleSubmit = (data: DemoFilterValues) => {
    console.log("=== FILTER VALUES ===");
    console.log("Search:", data.search);
    console.log("Categories:", data.categories);
    console.log("Price Range:", data.priceRange);
    console.log("Rating Range:", data.ratingRange);
    console.log("Discount Range:", data.discountRange);
    console.log("=====================");

    alert(
      `Filters applied!\n\n` +
        `Search: ${data.search || "N/A"}\n` +
        `Categories: ${data.categories?.length || 0} selected\n` +
        `Price: ${data.priceRange?.[0]?.toLocaleString()} - ${data.priceRange?.[1]?.toLocaleString()} VND\n` +
        `Rating: ${data.ratingRange?.[0]} - ${data.ratingRange?.[1]} ⭐\n` +
        `Discount: ${data.discountRange?.[0]}% - ${data.discountRange?.[1]}%\n\n` +
        `Check console for details!`,
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          🧪 Demo: Tree & Range Filters
        </h1>
        <p className="text-gray-600">
          Test TreeSelect và Number Range filters với DynamicFilter component
        </p>
      </div>

      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <DynamicFilter
          schema={demoFilterSchema}
          fieldConfig={fieldConfig}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">
          💡 Hướng dẫn sử dụng
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Nhập text vào ô tìm kiếm</li>
          <li>✓ Click vào "Danh mục" để chọn từ tree (có search)</li>
          <li>✓ Kéo slider hoặc nhập số trực tiếp cho các range</li>
          <li>✓ Click "Apply Filters" để xem kết quả</li>
          <li>✓ Check console để xem data structure</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">
          📝 Implementation Notes
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • <strong>Tree Select:</strong> Search enabled, max height 350px
          </li>
          <li>
            • <strong>Price Range:</strong> 0-10M VND, step 100K, currency
            format
          </li>
          <li>
            • <strong>Rating Range:</strong> 0-5 stars, step 0.5
          </li>
          <li>
            • <strong>Discount Range:</strong> 0-100%, step 5%
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DemoTreeAndRangeFilters;

// ===== USAGE =====
/**
 * Để sử dụng demo này:
 *
 * 1. Tạo file: src/app/demo-filters/page.tsx
 *
 * 2. Paste code:
 *    ```tsx
 *    export { default } from "@/components/shared/dynamic-filter/DEMO_PAGE";
 *    ```
 *
 * 3. Truy cập: http://localhost:3000/demo-filters
 *
 * 4. Test các filters!
 */
