import z from "zod";

// Zod Schema
export const FILTER_SCHEMA = z.object({
  searchQuery: z.string().default(""),
  categories: z.array(z.string()).default([]),
  views: z.array(z.string()).default([]),
  priceRange: z.tuple([z.number(), z.number()]).default([0, 10000000]),
  minPrice: z.number().min(0).default(0),
  maxPrice: z.number().max(10000000).default(10000000),
});

export const DEFAULT_FILTER_VALUES: z.infer<typeof FILTER_SCHEMA> = {
  searchQuery: "",
  categories: [],
  views: [],
  priceRange: [0, 10000000],
  minPrice: 0,
  maxPrice: 10000000,
};
