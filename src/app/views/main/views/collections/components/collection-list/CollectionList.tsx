import {
  getGetApiContentQueryKey,
  useGetApiContent,
} from "@/api/endpoints/content";
import { Category, GetApiContent200Pagination } from "@/api/models";
import { ContentResponse } from "@/api/types/content";
import { BlueprintCard } from "@/components/modules/content";
import { QueryBoundary } from "@/components/shared";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseQueryResult } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Props } from "./lib/types";

const CollectionList: FC<Props> = (props) => {
  // States
  const { filter } = props;

  const [sortBy, setSortBy] = useState("best-selling");

  const handleViewDetails = (product: ContentResponse) => {
    console.log("View details:", product);
  };

  const handleAddToCart = (product: ContentResponse) => {
    console.log("Add to cart:", product);
  };

  // Sort function
  const sortProducts = (products: ContentResponse[]) => {
    const sorted = [...products];

    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);

      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);

      case "name-az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title, "vi"));

      case "name-za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title, "vi"));

      case "best-selling":
      default:
        // Keep original order or implement best-selling logic
        return sorted;
    }
  };

  const getBlueprintListQuery = useGetApiContent<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>(
    {},
    {
      query: {
        queryKey: [...getGetApiContentQueryKey(), filter, sortBy],
        select: (data) => {
          console.log("Filtered : ", filter);

          const filteredValue = (
            data as unknown as {
              data: ContentResponse[];
              pagination?: GetApiContent200Pagination;
            }
          ).data.filter((item) => {
            if (
              filter.categories.length > 0 &&
              !filter.categories.includes(item.category_id._id)
            ) {
              return false;
            }

            console.log("Items ss", item);

            if (
              item.price < filter.priceRange[0] * 10000 ||
              item.price > filter.priceRange[1] * 10000
            ) {
              return false;
            }

            // Search filter
            if (filter.searchQuery && filter.searchQuery.trim() !== "") {
              const searchLower = filter.searchQuery.toLowerCase();
              const titleMatch = item.title.toLowerCase().includes(searchLower);
              const descMatch = item.description
                ?.toLowerCase()
                .includes(searchLower);
              const categoryMatch = item.category_id.name
                .toLowerCase()
                .includes(searchLower);

              if (!titleMatch && !descMatch && !categoryMatch) {
                return false;
              }
            }

            return true;
          });

          console.log("Filtered Value : ", filteredValue, data);

          return {
            data: sortProducts(filteredValue),
          } as {
            data: ContentResponse[];
            pagination?: GetApiContent200Pagination;
          };
        },
      },
    }
  ) as UseQueryResult<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>;

  return (
    <div className="space-y-6">
      {/* Header with Sort */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          <QueryBoundary query={getBlueprintListQuery}>
            {(blueprints) => (
              <span>Showing {blueprints.data.length} products</span>
            )}
          </QueryBoundary>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-0 bg-transparent font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-selling">Best Selling</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="price-low">Giá: Thấp đến Cao</SelectItem>
                <SelectItem value="price-high">Giá: Cao đến Thấp</SelectItem>
                <SelectItem value="name-az">Tên: A-Z</SelectItem>
                <SelectItem value="name-za">Tên: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <QueryBoundary query={getBlueprintListQuery}>
          {(blueprints) => {
            return blueprints.data.map((blueprint) => (
              <BlueprintCard
                key={blueprint._id}
                blueprint={blueprint}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ));
          }}
        </QueryBoundary>
      </div>
    </div>
  );
};

export default CollectionList;
