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
import { Package, SearchX, Filter as FilterIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CollectionList: FC<Props> = (props) => {
  // Hooks
  const navigate = useNavigate();

  // States
  const { filter, onClearFilters } = props;

  const [sortBy, setSortBy] = useState("best-selling");

  const handleViewDetails = (product: ContentResponse) => {
    navigate(`/detail/${product._id}`);
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

  // Check if any filters are active
  const hasActiveFilters =
    filter.searchQuery !== "" ||
    filter.categories.length > 0 ||
    filter.priceRange[0] !== 0 ||
    filter.priceRange[1] !== 10000000;

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

      <QueryBoundary query={getBlueprintListQuery}>
        {(blueprints) => {
          // Empty state
          if (!blueprints.data || blueprints.data.length === 0) {
            return (
              <div className="flex items-center justify-center min-h-[500px]">
                <Card className="max-w-md w-full border-0 shadow-lg">
                  <CardContent className="p-12 text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          {hasActiveFilters ? (
                            <SearchX className="w-12 h-12 text-gray-400" />
                          ) : (
                            <Package className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        {hasActiveFilters && (
                          <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <FilterIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {hasActiveFilters
                          ? "Không tìm thấy sản phẩm"
                          : "Chưa có sản phẩm"}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {hasActiveFilters
                          ? "Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh tiêu chí tìm kiếm."
                          : "Hiện tại chưa có sản phẩm nào trong bộ sưu tập này. Vui lòng quay lại sau."}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    {hasActiveFilters && onClearFilters && (
                      <div className="pt-4">
                        <Button
                          onClick={onClearFilters}
                          size="lg"
                          className="w-full gap-2"
                          variant="outline"
                        >
                          <FilterIcon className="w-4 h-4" />
                          Xóa bộ lọc
                        </Button>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="pt-6 border-t">
                      <p className="text-sm text-gray-500">
                        Gợi ý: Thử tìm kiếm với từ khóa khác hoặc mở rộng phạm
                        vi giá
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }

          // Products grid
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blueprints.data.map((blueprint) => (
                <BlueprintCard
                  key={blueprint._id}
                  blueprint={blueprint}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default CollectionList;
