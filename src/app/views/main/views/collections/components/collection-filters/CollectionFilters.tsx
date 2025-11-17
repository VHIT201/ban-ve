import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Category } from "@/api/models/category";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useGetApiCategories } from "@/api/endpoints/categories";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useSearchParams } from "react-router-dom";
import { useGetApiContent } from "@/api/endpoints/content";

// Zod Schema
const filterSchema = z.object({
  categories: z.array(z.string()).default([]),
  views: z.array(z.string()).default([]),
  priceRange: z.tuple([z.number(), z.number()]).default([0, 193]),
  minPrice: z.number().min(0).default(0),
  maxPrice: z.number().max(193).default(193),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface CollectionFiltersProps {
  onFilterChange?: (filters: FilterFormValues) => void;
}

const CollectionFilters = ({ onFilterChange }: CollectionFiltersProps) => {
  // Hooks
  const [searchParams] = useSearchParams();

  // States
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // React Hook Form with Zod
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      categories: [searchParams.get("category") || ""].filter(Boolean),
      priceRange: [0, 193],
      minPrice: 0,
      maxPrice: 193,
    },
  });

  // Watch form values
  const selectedCategories = form.watch("categories");
  const selectedViews = form.watch("views");
  const priceRange = form.watch("priceRange");

  // Queries
  const getCategoriesQuery = useGetApiCategories({
    query: {
      select: (data) => data as unknown as Category[],
    },
  }) as UseQueryResult<Category[]>;

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = form.getValues("categories");
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];

    form.setValue("categories", newCategories, { shouldValidate: true });

    // Trigger onChange callback
    onFilterChange?.({
      ...form.getValues(),
      categories: newCategories,
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    form.setValue("priceRange", [value[0], value[1]] as [number, number], {
      shouldValidate: true,
    });
    form.setValue("minPrice", value[0], { shouldValidate: true });
    form.setValue("maxPrice", value[1], { shouldValidate: true });

    // Trigger onChange callback
    onFilterChange?.({
      ...form.getValues(),
      priceRange: [value[0], value[1]] as [number, number],
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleMinPriceChange = (value: number) => {
    const maxPrice = form.getValues("maxPrice");
    const validValue = Math.min(value, maxPrice);
    form.setValue("minPrice", validValue, { shouldValidate: true });
    form.setValue("priceRange", [validValue, maxPrice] as [number, number], {
      shouldValidate: true,
    });

    // Trigger onChange callback
    onFilterChange?.({
      ...form.getValues(),
      minPrice: validValue,
      priceRange: [validValue, maxPrice] as [number, number],
    });
  };

  const handleMaxPriceChange = (value: number) => {
    const minPrice = form.getValues("minPrice");
    const validValue = Math.max(value, minPrice);
    form.setValue("maxPrice", validValue, { shouldValidate: true });
    form.setValue("priceRange", [minPrice, validValue] as [number, number], {
      shouldValidate: true,
    });

    // Trigger onChange callback
    onFilterChange?.({
      ...form.getValues(),
      maxPrice: validValue,
      priceRange: [minPrice, validValue] as [number, number],
    });
  };

  const handleClearFilters = () => {
    const resetValues = {
      categories: [],
      views: [],
      priceRange: [0, 193] as [number, number],
      minPrice: 0,
      maxPrice: 193,
    };
    form.reset(resetValues);

    // Trigger onChange callback
    onFilterChange?.(resetValues);
  };

  const onSubmit = (data: FilterFormValues) => {
    console.log("Filter data:", data);
    onFilterChange?.(data);
    // TODO: Apply filters to collection query
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky top-20 space-y-6"
      >
        {/* Category Filter */}
        <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b">
            <h3 className="font-medium text-gray-900">Category</h3>
            {isCategoryOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-3">
            <QueryBoundary query={getCategoriesQuery}>
              {(categories) => {
                return categories.map((category) => (
                  <FormField
                    key={category._id}
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            id={`category-${category._id}`}
                            checked={selectedCategories.includes(category._id!)}
                            onCheckedChange={() =>
                              handleCategoryToggle(category._id!)
                            }
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor={`category-${category._id}`}
                          className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors font-normal"
                        >
                          {category.name}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ));
              }}
            </QueryBoundary>
          </CollapsibleContent>
        </Collapsible>
        {/* Price Filter */}
        <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b">
            <h3 className="font-medium text-gray-900">Price</h3>
            {isPriceOpen ? (
              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Slider
                      value={field.value}
                      onValueChange={handlePriceRangeChange}
                      max={193}
                      step={1}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>
                      <FormControl>
                        <input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            handleMinPriceChange(parseInt(e.target.value) || 0)
                          }
                          className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <span className="text-gray-400">-</span>
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>
                      <FormControl>
                        <input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            handleMaxPriceChange(
                              parseInt(e.target.value) || 193
                            )
                          }
                          className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Clear Filters */}
        {(selectedCategories?.length > 0 || selectedViews?.length > 0) && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClearFilters}
            className="w-full gap-2"
          >
            <XIcon className="w-4 h-4" />
            Clear all filters (
            {selectedCategories?.length + selectedViews?.length})
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CollectionFilters;
