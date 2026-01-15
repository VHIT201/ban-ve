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
  image: z
    .instanceof(File, { message: "Vui lòng chọn file ảnh hợp lệ" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Kích thước ảnh không được vượt quá 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "Chỉ chấp nhận file JPEG, PNG hoặc WebP" }
    )
    .optional()
    .nullable()
    .default(null),
});

export const DEFAULT_CATEGORY_FORM_VALUES: z.infer<typeof CATEGORY_SCHEMA> = {
  name: "",
  slug: "",
  description: "",
  image: null,
};
