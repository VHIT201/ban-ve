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
import { useState, useEffect, use, useMemo, useCallback } from "react";
import TreeView, { TreeViewItem } from "@/components/shared/tree-view/TreeView";
import { Category } from "@/api/models/category";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  useGetApiCategories,
  useGetApiCategoriesAllTree,
} from "@/api/endpoints/categories";
import { QueryBoundary, TreeSelect } from "@/components/shared";
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
import { ResponseData } from "@/api/types/base";
import { TreeNode } from "@/components/shared/tree-select/TreeSelect";

const CollectionFilters = ({ onFilterChange, initialValues }: Props) => {
  // Hooks
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  // States
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // React Hook Form with Zod
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(FILTER_SCHEMA),
    defaultValues: {
      searchQuery: searchParams.get("search") || "",
      categories:
        initialValues?.categories ||
        [searchParams.get("category") || ""].filter(Boolean),
      priceRange: initialValues?.priceRange || [0, 10000000],
      minPrice: initialValues?.minPrice || 0,
      maxPrice: initialValues?.maxPrice || 10000000,
    },
  });

  // Update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  // Watch form values to detect changes
  const searchQuery = form.watch("searchQuery");
  const selectedCategories = form.watch("categories");
  const selectedViews = form.watch("views");

  // Queries
  const getCategoryTreeQuery = useGetApiCategoriesAllTree({
    query: {
      select: (data) => (data as unknown as ResponseData<any>).data.tree,
    },
  });

  const transformCategoryToTreeItem = (category: any): TreeViewItem => {
    return {
      id: category._id || category.id,
      name: category.name,
      type:
        category.children && category.children.length > 0 ? "folder" : "file",
      children: category.children?.map(transformCategoryToTreeItem),
      checked: selectedCategories.includes(category._id || category.id),
    };
  };

  // Memoize tree data
  const treeData = useMemo(() => {
    if (!getCategoryTreeQuery.data) return [];
    return getCategoryTreeQuery.data.map(transformCategoryToTreeItem);
  }, [getCategoryTreeQuery.data, selectedCategories]);

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
    onFilterChange?.({ ...data, categories: selected });
  };

  useEffect(() => {
    onFilterChange?.(form.getValues());
  }, []);

  const mapApiNodeToTreeNode = (node: any[]): TreeNode[] => {
    return node.map((item: any) => ({
      id: item.id,
      label: item.name,
      disabled: false,
      children: item.children?.length
        ? mapApiNodeToTreeNode(item.children)
        : undefined,
    })) as TreeNode[];
  };

  const mappedTreeData: TreeNode[] = mapApiNodeToTreeNode(
    treeData as any,
  ) as TreeNode[];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Filter Card Header */}
        <div className="bg-white border border-gray-200 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="font-semibold text-lg text-gray-900">Bộ lọc</h2>
          </div>

          {/* Search Filter */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-gray-700">Tìm kiếm</h3>
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
                        placeholder="Tìm theo tên..."
                        className="pl-10 h-10"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Category Filter */}
          <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <h3 className="font-medium text-sm text-gray-700">Danh mục</h3>
              {isCategoryOpen ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <TreeSelect
                nodes={mappedTreeData}
                value={selected}
                onChange={setSelected}
                placeholder="Chọn danh mục"
                searchable={true}
                maxHeight="350px"
              />
            </CollapsibleContent>
          </Collapsible>
          {/* Price Filter */}
          <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full group">
              <h3 className="font-medium text-sm text-gray-700">Khoảng giá</h3>
              {isPriceOpen ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
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
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="space-y-1.5">
                          <input
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              handleMinPriceChange(
                                parseInt(e.target.value) || 0,
                              )
                            }
                            placeholder="0"
                            className="w-full px-3 py-2 text-sm rounded-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                          <span className="text-xs text-gray-500 block">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(field.value)}
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-gray-400 text-sm mt-[-20px]">-</span>
                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="space-y-1.5">
                          <input
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              handleMaxPriceChange(
                                parseInt(e.target.value) || 100000000,
                              )
                            }
                            placeholder="100000000"
                            className="w-full px-3 py-2 text-sm rounded-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                          <span className="text-xs text-gray-500 block">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(field.value)}
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button type="submit" className="w-full gap-2 h-11">
            <Filter className="w-4 h-4" />
            Áp dụng bộ lọc
          </Button>

          {(searchQuery ||
            selectedCategories?.length > 0 ||
            selectedViews?.length > 0) && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
              className="w-full gap-2 h-11"
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
