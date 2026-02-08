# Quick Reference: Tree & Number Range Filters

## Tree Select

### Minimal Setup

```typescript
// Schema
const schema = z.object({
  categories: z.array(z.string()).optional(),
});

// Config
const config = {
  categories: {
    type: "tree",
    nodes: [
      { id: "1", label: "Category 1" },
      { id: "2", label: "Category 2", children: [...] },
    ],
  },
};
```

### With API

```typescript
const query = useGetApiCategoriesAllTree();

const config = {
  categories: {
    type: "tree",
    nodes: query, // Pass query directly
  },
};
```

### Props

| Prop          | Type                             | Default   | Description        |
| ------------- | -------------------------------- | --------- | ------------------ |
| `nodes`       | `TreeNode[]` \| `UseQueryResult` | required  | Tree data or query |
| `searchable`  | `boolean`                        | `true`    | Enable search      |
| `maxHeight`   | `string`                         | `"300px"` | Max height         |
| `placeholder` | `string`                         | -         | Placeholder text   |

---

## Number Range (Slider)

### Minimal Setup

```typescript
// Schema - MUST use tuple
const schema = z.object({
  priceRange: z.tuple([z.number(), z.number()]).optional(),
});

// Config
const config = {
  priceRange: {
    type: "number-range",
    min: 0,
    max: 1000,
    step: 10,
  },
};
```

### With Currency Format

```typescript
const config = {
  priceRange: {
    type: "number-range",
    min: 0,
    max: 10000000,
    step: 100000,
    showInputs: true,
    formatValue: (val) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(val),
  },
};
```

### Props

| Prop          | Type                      | Default  | Description      |
| ------------- | ------------------------- | -------- | ---------------- |
| `min`         | `number`                  | `0`      | Minimum value    |
| `max`         | `number`                  | `100`    | Maximum value    |
| `step`        | `number`                  | `1`      | Step increment   |
| `showInputs`  | `boolean`                 | `true`   | Show input boxes |
| `formatValue` | `(val: number) => string` | `String` | Format function  |

---

## Complete Example

```typescript
import { z } from "zod";
import { DynamicFilter } from "@/components/shared/dynamic-filter";

const MyFilter = () => {
  const schema = z.object({
    categories: z.array(z.string()).optional(),
    priceRange: z.tuple([z.number(), z.number()]).optional(),
  });

  const fieldConfig = {
    categories: {
      type: "tree" as const,
      label: "Categories",
      nodes: [
        { id: "1", label: "Electronics" },
        { id: "2", label: "Fashion" },
      ],
    },
    priceRange: {
      type: "number-range" as const,
      label: "Price",
      min: 0,
      max: 1000,
    },
  };

  return (
    <DynamicFilter
      schema={schema}
      fieldConfig={fieldConfig}
      onSubmit={(data) => console.log(data)}
    />
  );
};
```

---

## Common Patterns

### Pattern 1: Currency Range

```typescript
priceRange: {
  type: "number-range",
  min: 0,
  max: 10000000,
  step: 100000,
  formatValue: (val) => `${val.toLocaleString("vi-VN")} ₫`,
}
```

### Pattern 2: Percentage Range

```typescript
discountRange: {
  type: "number-range",
  min: 0,
  max: 100,
  step: 5,
  formatValue: (val) => `${val}%`,
}
```

### Pattern 3: API-driven Tree

```typescript
const query = useGetCategories();

categories: {
  type: "tree",
  nodes: query,
  searchable: true,
}
```

---

## Type Imports

```typescript
import type {
  TreeNode,
  TreeFieldConfig,
  NumberRangeFieldConfig,
} from "@/components/shared/dynamic-filter";
```
