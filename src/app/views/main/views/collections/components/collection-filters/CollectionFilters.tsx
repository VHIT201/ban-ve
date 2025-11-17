import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  Filter,
  Search,
} from "lucide-react";
import { useState, useEffect, use } from "react";
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
import { FilterFormValues, Props } from "./lib/types";
import { DEFAULT_FILTER_VALUES, FILTER_SCHEMA } from "./lib/constants";
import { Input } from "@/components/ui/input";

const CollectionFilters = ({ onFilterChange }: Props) => {
  // Hooks
  const [searchParams] = useSearchParams();

  // States
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // React Hook Form with Zod
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(FILTER_SCHEMA),
    defaultValues: {
      searchQuery: "",
      categories: [searchParams.get("category") || ""].filter(Boolean),
      priceRange: [0, 10000000],
      minPrice: 0,
      maxPrice: 10000000,
    },
  });

  // Watch form values to detect changes
  const searchQuery = form.watch("searchQuery");
  const selectedCategories = form.watch("categories");
  const selectedViews = form.watch("views");

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
  };

  const handlePriceRangeChange = (value: number[]) => {
    form.setValue("priceRange", [value[0], value[1]] as [number, number], {
      shouldValidate: true,
    });
    form.setValue("minPrice", value[0], { shouldValidate: true });
    form.setValue("maxPrice", value[1], { shouldValidate: true });
  };

  const handleMinPriceChange = (value: number) => {
    const maxPrice = form.getValues("maxPrice");
    const validValue = Math.min(value, maxPrice);
    form.setValue("minPrice", validValue, { shouldValidate: true });
    form.setValue("priceRange", [validValue, maxPrice] as [number, number], {
      shouldValidate: true,
    });
  };

  const handleMaxPriceChange = (value: number) => {
    const minPrice = form.getValues("minPrice");
    const validValue = Math.max(value, minPrice);
    form.setValue("maxPrice", validValue, { shouldValidate: true });
    form.setValue("priceRange", [minPrice, validValue] as [number, number], {
      shouldValidate: true,
    });
  };

  const handleClearFilters = () => {
    form.reset(DEFAULT_FILTER_VALUES);
    onFilterChange?.(DEFAULT_FILTER_VALUES);
  };

  const onSubmit = (data: FilterFormValues) => {
    onFilterChange?.(data);
  };

  useEffect(() => {
    onFilterChange?.(form.getValues());
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky top-20 space-y-6"
      >
        {/* Search Filter */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 pb-3 border-b">Tìm kiếm</h3>
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Tìm theo tên sản phẩm..."
                      className="pl-10"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

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
                      max={10000000}
                      step={100000}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-start justify-between gap-4">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-1">
                      <FormControl>
                        <input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            handleMinPriceChange(parseInt(e.target.value) || 0)
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                      </FormControl>
                      <span className="text-xs text-gray-500">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(field.value)}
                      </span>
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
                    <div className="flex flex-col gap-1">
                      <FormControl>
                        <input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            handleMaxPriceChange(
                              parseInt(e.target.value) || 100000000
                            )
                          }
                          placeholder="100000000"
                          className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                      </FormControl>
                      <span className="text-xs text-gray-500">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(field.value)}
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Apply Filters Button */}
          <Button type="submit" className="w-full gap-2">
            <Filter className="w-4 h-4" />
            Áp dụng bộ lọc
          </Button>

          {/* Clear Filters */}
          {(searchQuery ||
            selectedCategories?.length > 0 ||
            selectedViews?.length > 0) && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
              className="w-full gap-2"
            >
              <XIcon className="w-4 h-4" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CollectionFilters;
