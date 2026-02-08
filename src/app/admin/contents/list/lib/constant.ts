import z from "zod";

// Filter Schema
const CONTENT_FILTER_SCHEMA = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
});

type ContentFilterSchema = z.infer<typeof CONTENT_FILTER_SCHEMA>;

export { CONTENT_FILTER_SCHEMA };
export type { ContentFilterSchema };
