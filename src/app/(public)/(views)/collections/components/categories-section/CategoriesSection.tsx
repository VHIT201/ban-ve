"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "@/components/ui/image";
import { useRouter } from "next/navigation";
import { useGetApiCategories } from "@/api/endpoints/categories";
import { Category } from "@/api/models";
import { UseQueryResult } from "@tanstack/react-query";
import { QueryBoundary } from "@/components/shared";
import { generateImageRandom } from "@/utils/image";
import { ResponseData } from "@/api/types/base";
import CategoriesSectionSkeleton from "./CategoriesSectionSkeleton";

const CategoriesSection = () => {
  // Hooks
  const router = useRouter();

  // Queries
  const getCategoryListQuery = useGetApiCategories({
    query: {
      select: (data) =>
        (data as unknown as ResponseData<{ categories: Category[] }>).data
          .categories,
    },
  }) as UseQueryResult<Category[]>;

  // Methods
  const handleCategoryClick = (category: Category) => {
    router.push(`/collections?category=${category._id}`);
  };

  const handleViewAll = () => {
    router.push("/collections");
  };

  return (
    <section className="mt-8">
      <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-8">
        <h2 className="text-2xl uppercase font-semibold tracking-tight text-[#1a1a1a]">
          Danh mục bản vẽ
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px mb-8 bg-black/5 border border-black/5 overflow-hidden">
        <QueryBoundary
          query={getCategoryListQuery}
          fetchingView={<CategoriesSectionSkeleton />}
        >
          {(categories) => {
            return categories.map((category, index) => (
              <div
                key={`${category.name}-${index}`}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "group relative aspect-square bg-white flex flex-col items-center justify-center p-8 transition-all duration-500 hover:z-10",
                  "hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden"
                )}
              >
                <div className="relative w-full aspect-square mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={generateImageRandom()}
                    alt={category.name}
                    className="object-contain p-4 scale-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium text-black/80 group-hover:text-black transition-colors">
                    {category.name}
                  </h3>
                  <div className="h-px w-0 bg-black/20 mx-auto mt-2 group-hover:w-8 transition-all duration-500" />
                </div>

                {/* Subtle architectural corner markers */}
                <div className="absolute top-4 left-4 w-2 h-px bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 h-2 w-px bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 w-2 h-px bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 h-2 w-px bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ));
          }}
        </QueryBoundary>
      </div>
    </section>
  );
};

export default CategoriesSection;
