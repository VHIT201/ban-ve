import { BlueprintCard } from "@/components/modules/content";
import { ContentResponse } from "@/api/types/content";

import { useGetApiContentInfinite } from "@/api/endpoints/content";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/utils/ui";

const DailyFeatureSection = () => {
  // Hooks
  const navigate = useNavigate();

  // States
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 0,
    limit: 0,
  });

  // Queries
  const getBluePrintListInfiniteQuery = useGetApiContentInfinite(
    {
      limit: pagination.limit,
      page: pagination.page,
    },
    {
      query: {
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          if (lastPage.pagination) {
            const { currentPage, totalPages } = lastPage.pagination;

            if (totalPages === undefined || currentPage === undefined) {
              return undefined;
            }

            if (currentPage + 1 < totalPages) {
              return currentPage + 1;
            }
          }
          return undefined;
        },
      },
    }
  );

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    navigate(`/detail/${blueprint._id}`);
  };

  const handleAddToCart = (blueprint: ContentResponse) => {
    console.log("Add to cart:", blueprint);
  };

  // Memos
  const blueprintInfiniteData = getBluePrintListInfiniteQuery.data?.pages;
  const blueprintInfiniteList =
    blueprintInfiniteData?.flatMap((page) => page.data) ?? [];

  // Effects
  useEffect(() => {
    if (getBluePrintListInfiniteQuery.data?.pages) {
      setPagination({
        page: getBluePrintListInfiniteQuery.data?.pageParams.length || 0,
        limit: 6,
      });
    }
  }, [getBluePrintListInfiniteQuery.data]);

  return (
    <section className="pt-16 mb-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between  border-b border-black/10 pb-8">
          <h2 className="text-2xl font-semibold tracking-wider text-foreground uppercase">
            Sản phẩm nổi bật
          </h2>
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          }
        >
          {blueprintInfiniteList.map(
            (blueprint) =>
              blueprint && (
                <BlueprintCard
                  key={blueprint._id}
                  product={blueprint}
                  onViewDetail={handleViewDetail}
                  onAddToCart={handleAddToCart}
                />
              )
          )}
        </div>

        <div className="flex justify-center">
          <Button
            loading={getBluePrintListInfiniteQuery.isFetchingNextPage}
            onClick={() => {
              getBluePrintListInfiniteQuery.fetchNextPage();
            }}
            className={cn(
              "h-14 px-8 text-xl font-medium",
              getBluePrintListInfiniteQuery.hasNextPage ? "block" : "hidden"
            )}
          >
            Xem thêm
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DailyFeatureSection;
