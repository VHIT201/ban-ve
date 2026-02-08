# Hướng dẫn sử dụng Tree Select và Number Range Filters

## 1. Tree Select Filter

### Cấu hình cơ bản

```typescript
import { z } from "zod";
import { TreeNode } from "@/components/shared/dynamic-filter";

// Schema
const filterSchema = z.object({
  categories: z.array(z.string()).optional(),
});

// Field config
const fieldConfig = {
  categories: {
    type: "tree",
    label: "Danh mục",
    placeholder: "Chọn danh mục",
    nodes: [
      {
        id: "1",
        label: "Electronics",
        children: [
          { id: "1-1", label: "Phones" },
          { id: "1-2", label: "Laptops" },
        ],
      },
      {
        id: "2",
        label: "Fashion",
        children: [
          { id: "2-1", label: "Men" },
          { id: "2-2", label: "Women" },
        ],
      },
    ],
    searchable: true,
    maxHeight: "350px",
  },
};
```

### Sử dụng với API Query

```typescript
import { useGetApiCategoriesAllTree } from "@/api/endpoints/categories";

const CategoryFilter = () => {
  const getCategoryTreeQuery = useGetApiCategoriesAllTree({}, {
    query: {
      select: (data) => {
        // Transform API data thành TreeNode[]
        return transformToTreeNodes(data);
      },
    },
  });

  const fieldConfig = {
    categories: {
      type: "tree",
      label: "Danh mục",
      nodes: getCategoryTreeQuery, // Truyền query result trực tiếp
      searchable: true,
    },
  };

  return <DynamicFilter schema={filterSchema} fieldConfig={fieldConfig} />;
};

// Helper function để transform data
const transformToTreeNodes = (categories: any[]): TreeNode[] => {
  return categories.map((cat) => ({
    id: cat._id || cat.id,
    label: cat.name,
    children: cat.children?.map(transformToTreeNodes),
    disabled: cat.disabled || false,
  }));
};
```

### TreeNode Interface

```typescript
interface TreeNode {
  id: string; // ID duy nhất
  label: string; // Tên hiển thị
  children?: TreeNode[]; // Các node con (nếu có)
  disabled?: boolean; // Vô hiệu hóa node này
}
```

### Props của TreeFieldConfig

```typescript
{
  type: "tree";
  label?: string;              // Nhãn hiển thị
  placeholder?: string;        // Placeholder text
  nodes: TreeNode[] | UseQueryResult<TreeNode[]>; // Data hoặc query
  searchable?: boolean;        // Cho phép tìm kiếm (default: true)
  maxHeight?: string;          // Chiều cao tối đa (default: "300px")
}
```

---

## 2. Number Range Filter (Slider)

### Cấu hình cơ bản

```typescript
import { z } from "zod";

// Schema - sử dụng tuple cho range
const filterSchema = z.object({
  priceRange: z.tuple([z.number(), z.number()]).optional(),
});

// Field config
const fieldConfig = {
  priceRange: {
    type: "number-range",
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
```

### Ví dụ đơn giản hơn (score/rating)

```typescript
const filterSchema = z.object({
  scoreRange: z.tuple([z.number(), z.number()]).optional(),
});

const fieldConfig = {
  scoreRange: {
    type: "number-range",
    label: "Điểm số",
    min: 0,
    max: 100,
    step: 5,
    showInputs: true,
    formatValue: (value: number) => `${value} điểm`,
  },
};
```

### Props của NumberRangeFieldConfig

```typescript
{
  type: "number-range";
  label?: string;              // Nhãn hiển thị
  placeholder?: string;        // (không sử dụng cho slider)
  min?: number;                // Giá trị min (default: 0)
  max?: number;                // Giá trị max (default: 100)
  step?: number;               // Bước nhảy (default: 1)
  showInputs?: boolean;        // Hiển thị input boxes (default: true)
  formatValue?: (value: number) => string; // Format hiển thị giá trị
}
```

---

## 3. Ví dụ hoàn chỉnh: Collection Filter

```typescript
import { z } from "zod";
import { DynamicFilter } from "@/components/shared/dynamic-filter";
import { useGetApiCategoriesAllTree } from "@/api/endpoints/categories";

const CollectionFiltersExample = () => {
  // Query để lấy category tree
  const getCategoryTreeQuery = useGetApiCategoriesAllTree({}, {
    query: {
      select: (data) => transformToTreeNodes(data),
    },
  });

  // Schema
  const filterSchema = z.object({
    searchQuery: z.string().optional(),
    categories: z.array(z.string()).optional(),
    priceRange: z.tuple([z.number(), z.number()]).optional(),
  });

  // Field config
  const fieldConfig = {
    searchQuery: {
      type: "text",
      label: "Tìm kiếm",
      placeholder: "Tìm theo tên...",
    },
    categories: {
      type: "tree",
      label: "Danh mục",
      nodes: getCategoryTreeQuery,
      searchable: true,
      maxHeight: "350px",
      placeholder: "Chọn danh mục",
    },
    priceRange: {
      type: "number-range",
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

  // Default values
  const defaultValues = {
    searchQuery: "",
    categories: [],
    priceRange: [0, 10000000] as [number, number],
  };

  // Handle submit
  const handleSubmit = (data: z.infer<typeof filterSchema>) => {
    console.log("Filter data:", data);
    // Apply filters...
  };

  return (
    <DynamicFilter
      schema={filterSchema}
      fieldConfig={fieldConfig}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

// Helper function
const transformToTreeNodes = (categories: any[]) => {
  return categories.map((cat) => ({
    id: cat._id || cat.id,
    label: cat.name,
    children: cat.children ? transformToTreeNodes(cat.children) : undefined,
  }));
};
```

---

## 4. Lưu ý quan trọng

### Tree Select

- **Value type**: `string[]` - Luôn là mảng các ID được chọn
- **Multiple selection**: Tree select luôn hỗ trợ multiple selection
- **Searchable**: Mặc định bật tìm kiếm, có thể tắt bằng `searchable: false`
- **Query support**: Có thể truyền `UseQueryResult<TreeNode[]>` thay vì array tĩnh

### Number Range

- **Value type**: `[number, number]` - Tuple gồm 2 số (min, max)
- **Schema**: Phải dùng `z.tuple([z.number(), z.number()])` không phải `z.array()`
- **showInputs**: Khi `true`, hiển thị 2 input box để nhập chính xác
- **formatValue**: Function để format hiển thị (VD: currency, percentage)
- **Validation**: Input tự động validate để min <= max

---

## 5. Type Exports

Để sử dụng types trong code của bạn:

```typescript
import {
  TreeNode,
  TreeFieldConfig,
  NumberRangeFieldConfig,
} from "@/components/shared/dynamic-filter";
```
