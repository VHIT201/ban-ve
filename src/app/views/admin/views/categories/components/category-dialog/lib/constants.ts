import z from "zod";

export const CATEGORY_SCHEMA = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(100, "Tên danh mục không được vượt quá 100 ký tự"),
  slug: z.string().min(1, "Slug không được để trống"),
  description: z
    .string()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .optional()
    .or(z.literal("")),
});

export const DEFAULT_CATEGORY_FORM_VALUES: z.infer<typeof CATEGORY_SCHEMA> = {
  name: "",
  slug: "",
  description: "",
};
