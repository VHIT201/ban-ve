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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

  console.log("CollectionList render", props.filter);

  // States
  const { filter, onClearFilters } = props;

  const [sortBy, setSortBy] = useState("best-selling");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Số sản phẩm mỗi trang

  const handleViewDetail = (product: ContentResponse) => {
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
        return sorted.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

      case "price-low":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));

      case "price-high":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));

      case "name-az":
        return sorted.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "", "vi"),
        );

      case "name-za":
        return sorted.sort((a, b) =>
          (b.title || "").localeCompare(a.title || "", "vi"),
        );

      case "best-selling":
      default:
        return sorted;
    }
  };

  // Calculate pagination
  const getBlueprintListQuery = useGetApiContent<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>(
    {
      page: currentPage,
      limit: itemsPerPage,
      category: filter.categories.join(","),
      minPrice: filter.priceRange[0] * 10000,
      maxPrice: filter.priceRange[1] * 10000,
      search: filter.searchQuery,
    },
    {
      query: {
        queryKey: [...getGetApiContentQueryKey(), filter, sortBy, currentPage],
        select: (data) => {
          const response = data as unknown as {
            data: ContentResponse[];
            pagination: GetApiContent200Pagination;
          };

          const filteredValue = response.data.filter((item) => {
            // if (
            //   filter.categories.length > 0 &&
            //   (!item.category || !filter.categories.includes(item.category._id))
            // ) {
            //   return false;
            // }

            // const itemPrice = item.price || 0;
            // if (
            //   itemPrice < filter.priceRange[0] * 10000 ||
            //   itemPrice > filter.priceRange[1] * 10000
            // ) {
            //   return false;
            // }

            // // Search filter
            // if (filter.searchQuery && filter.searchQuery.trim() !== "") {
            //   const searchLower = filter.searchQuery.toLowerCase();

            //   const titleMatch = (item.title || "")
            //     .toLowerCase()
            //     .includes(searchLower);

            //   const descMatch = (item.description || "")
            //     .toLowerCase()
            //     .includes(searchLower);

            //   const categoryMatch = (item.category?.name || "")
            //     .toLowerCase()
            //     .includes(searchLower);

            //   if (!titleMatch && !descMatch && !categoryMatch) {
            //     return false;
            //   }
            // }

            // if (!filter.categories.length) {
            //   if (filter.categories.includes(item.category?._id! ?? "")) {
            //     return false;
            //   }
            // }

            return true;
          });

          return {
            data: sortProducts(filteredValue),
            pagination: response.pagination,
          };
        },
      },
    },
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
      {/* Header with Results Count & Sort */}
      <div className="flex items-center justify-between bg-transparent px-5 py-4 border-b border-black/10">
        <QueryBoundary query={getBlueprintListQuery}>
          {(blueprints) => (
            <div className="text-sm font-medium text-gray-700">
              <span className="text-gray-900">{blueprints.data.length}</span>{" "}
              sản phẩm
            </div>
          )}
        </QueryBoundary>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:inline">
            Sắp xếp:
          </span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best-selling">Bán chạy nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="price-low">Giá tăng dần</SelectItem>
              <SelectItem value="price-high">Giá giảm dần</SelectItem>
              <SelectItem value="name-az">Tên A-Z</SelectItem>
              <SelectItem value="name-za">Tên Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <QueryBoundary query={getBlueprintListQuery}>
        {(blueprints) => {
          // Empty state
          if (!blueprints.data || blueprints.data.length === 0) {
            return (
              <div className="flex items-center justify-center min-h-[500px]">
                <Card className="max-w-md w-full border border-gray-200 shadow-sm">
                  <CardContent className="p-10 text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                          {hasActiveFilters ? (
                            <SearchX className="w-10 h-10 text-gray-400" />
                          ) : (
                            <Package className="w-10 h-10 text-gray-400" />
                          )}
                        </div>
                        {hasActiveFilters && (
                          <div className="absolute -top-1 -right-1 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center">
                            <FilterIcon className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {hasActiveFilters
                          ? "Không tìm thấy kết quả"
                          : "Chưa có sản phẩm"}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {hasActiveFilters
                          ? "Không có sản phẩm nào phù hợp với bộ lọc. Thử điều chỉnh tiêu chí tìm kiếm."
                          : "Hiện tại chưa có sản phẩm nào. Vui lòng quay lại sau."}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    {hasActiveFilters && onClearFilters && (
                      <div className="pt-2">
                        <Button
                          onClick={onClearFilters}
                          size="lg"
                          className="gap-2"
                        >
                          <FilterIcon className="w-4 h-4" />
                          Xóa bộ lọc
                        </Button>
                      </div>
                    )}

                    {/* Additional Info */}
                    {hasActiveFilters && (
                      <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          💡 Thử tìm kiếm với từ khóa khác hoặc mở rộng khoảng
                          giá
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          }

          // Products grid
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {blueprints.data.map((blueprint) => (
                <BlueprintCard
                  key={blueprint._id}
                  product={blueprint}
                  onViewDetail={handleViewDetail}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          );
        }}
      </QueryBoundary>

      {/* Pagination */}
      <QueryBoundary query={getBlueprintListQuery}>
        {(blueprints) => {
          if (!blueprints.data?.length) return null;

          const totalPages = Math.ceil(
            (blueprints.pagination?.total || 0) / itemsPerPage,
          );
          if (totalPages <= 1) return null;

          const maxPageNumbers = 5; // Số lượng số trang hiển thị
          let startPage = Math.max(
            1,
            currentPage - Math.floor(maxPageNumbers / 2),
          );
          let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

          if (endPage - startPage + 1 < maxPageNumbers) {
            startPage = Math.max(1, endPage - maxPageNumbers + 1);
          }

          const pageNumbers = [];
          for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
          }

          return (
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }
                    />
                  </PaginationItem>

                  {startPage > 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {endPage < totalPages && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default CollectionList;
