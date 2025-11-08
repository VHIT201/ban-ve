import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlueprintCard } from "@/components/modules/content";
import { ContentResponse } from "@/api/types/content";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetApiContent } from "@/api/endpoints/content";
import { GetApiContent200Pagination } from "@/api/models";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const BlueprintFeatureSection = () => {
  // Hooks
  const navigate = useNavigate();

  // Queries
  const getBluerintListQuery = useGetApiContent<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>(
    {},
    {
      query: {
        select: (data) =>
          data as unknown as {
            data: ContentResponse[];
            pagination?: GetApiContent200Pagination;
          },
      },
    }
  ) as UseQueryResult<{
    data: ContentResponse[];
    pagination?: GetApiContent200Pagination;
  }>;
  const handleViewDetails = (blueprint: ContentResponse) => {
    navigate(`/detail/${blueprint._id}`);
  };

  const handleAddToCart = (blueprint: ContentResponse) => {
    console.log("Add to cart:", blueprint);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bản vẽ thiết kế chuyên nghiệp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập bản vẽ thiết kế chất lượng cao từ các chuyên gia
            hàng đầu
          </p>
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          }
        >
          <QueryBoundary query={getBluerintListQuery}>
            {(blueprints) => {
              return blueprints.data.map((blueprint) => (
                <div key={blueprint._id}>
                  <BlueprintCard
                    blueprint={blueprint}
                    onViewDetails={handleViewDetails}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ));
            }}
          </QueryBoundary>
        </div>
      </div>
    </section>
  );
};

export default BlueprintFeatureSection;
