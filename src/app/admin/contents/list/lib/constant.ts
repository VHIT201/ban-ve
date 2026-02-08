import z from "zod";

// Filter Schema
const CONTENT_FILTER_SCHEMA = z.object({
  name: z.string().optional(),
  categories: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
});

type ContentFilterSchema = z.infer<typeof CONTENT_FILTER_SCHEMA>;

export { CONTENT_FILTER_SCHEMA };
export type { ContentFilterSchema };
