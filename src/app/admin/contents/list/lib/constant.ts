import z from "zod";

export const CONTENT_STATUS_OPTIONS = [
  { label: "Đã duyệt", value: "approved" },
  { label: "Đang chờ duyệt", value: "pending" },
];

// Filter Schema
const CONTENT_FILTER_SCHEMA = z.object({
  status: z.enum(["approved", "pending"]).default("approved").optional(),
  name: z.string().optional(),
  categories: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
});

type ContentFilterSchema = z.infer<typeof CONTENT_FILTER_SCHEMA>;

export { CONTENT_FILTER_SCHEMA };
export type { ContentFilterSchema };
