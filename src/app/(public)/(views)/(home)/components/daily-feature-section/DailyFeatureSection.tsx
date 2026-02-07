"use client";

import {
  BlueprintCard,
  BlueprintCardSkeleton,
} from "@/components/modules/content";
import { ContentResponse, ContentProduct } from "@/api/types/content";
import { useGetApiContentInfinite } from "@/api/endpoints/content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/utils/ui";
import { useRouter } from "next/navigation";

const DailyFeatureSection = () => {
  // Router
  const router = useRouter();

  // States
  const [pagination] = useState({
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
          const { currentPage, totalPages } = lastPage.pagination ?? {};
          if (
            currentPage === undefined ||
            totalPages === undefined ||
            currentPage + 1 >= totalPages
          ) {
            return undefined;
          }
          return currentPage + 1;
        },
      },
    },
  );

  // Methods
  const handleViewDetail = (blueprint: ContentResponse) => {
    router.push(`/detail/${blueprint._id}`);
  };

  const handleAddToCart = (blueprint: ContentResponse) => {
    console.log("Add to cart:", blueprint);
  };

  // Data
  const blueprintInfiniteList =
    getBluePrintListInfiniteQuery.data?.pages.flatMap((page) => page.data) ??
    [];

  return (
    <section className="pt-16 mb-12 bg-white">
      <div>
        <div className="flex items-end justify-between pb-2">
          <h2 className="text-xl uppercase font-semibold tracking-widest text-[#1a1a1a]">
            Sản phẩm nổi bật
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {blueprintInfiniteList.map(
            (blueprint) =>
              blueprint && (
                <BlueprintCard
                  key={blueprint._id}
                  product={
                    {
                      ...blueprint,
                      _id: blueprint._id!,
                      images: blueprint.images || [],
                      title: blueprint.title || "Untitled",
                      price: blueprint.price || 0,
                      file_id: blueprint.file_id
                        ? {
                            _id: blueprint.file_id._id ?? "",
                            name: blueprint.file_id.name ?? "",
                            path: blueprint.file_id.url ?? "",
                            type: blueprint.file_id.type ?? "",
                            size: blueprint.file_id.size ?? 0,
                          }
                        : undefined,
                    } as ContentProduct
                  }
                  onViewDetail={handleViewDetail}
                  onAddToCart={handleAddToCart}
                />
              ),
          )}

          {getBluePrintListInfiniteQuery.isFetchingNextPage &&
            Array.from({ length: pagination.limit }).map((_, index) => (
              <BlueprintCardSkeleton key={index} />
            ))}
        </div>

        <div className="flex justify-center">
          <Button
            loading={getBluePrintListInfiniteQuery.isFetchingNextPage}
            onClick={() => getBluePrintListInfiniteQuery.fetchNextPage()}
            className={cn(
              "h-14 px-8 text-xl font-medium",
              getBluePrintListInfiniteQuery.hasNextPage ? "block" : "hidden",
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
