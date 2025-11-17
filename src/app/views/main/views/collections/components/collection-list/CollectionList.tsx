import { useGetApiContent } from "@/api/endpoints/content";
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
import { useState } from "react";

const mockCategories: Category[] = [
  { _id: "1", name: "Cad", slug: "cad", description: "CAD files" },
  {
    _id: "2",
    name: "Flat Vector",
    slug: "flat-vector",
    description: "Flat vector graphics",
  },
  {
    _id: "3",
    name: "Axonometric Vector",
    slug: "axonometric-vector",
    description: "Axonometric views",
  },
  { _id: "4", name: "3D Model", slug: "3d-model", description: "3D models" },
  { _id: "5", name: "Cutout", slug: "cutout", description: "Cutout graphics" },
  {
    _id: "6",
    name: "Brush & Swatch",
    slug: "brush-swatch",
    description: "Brushes and swatches",
  },
  { _id: "7", name: "Other", slug: "other", description: "Other files" },
];

const mockProducts: ContentResponse[] = Array.from({ length: 12 }, (_, i) => ({
  _id: `${i + 1}`,
  title:
    i === 0
      ? "Photoshop Brush Sanaá People"
      : i === 1
      ? "Student Starter Kit - Extended"
      : i === 2
      ? "Procreate Architectural Annotations Brushset"
      : `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  category_id: {
    _id: `cat${i + 1}`,
    name: mockCategories[i % mockCategories.length].name,
    slug: mockCategories[i % mockCategories.length].slug,
    description: mockCategories[i % mockCategories.length].description || "",
  },
  file_id: {
    _id: `file${i + 1}`,
    name: `product-${i + 1}.dwg`,
    url: `/uploads/product-${i + 1}.dwg`,
    type: "DWG",
    size: 5242880 + i * 1000000,
  },
  price:
    i === 0 ? 93000 : i === 1 ? 93000 : i === 2 ? 124000 : 150000 + i * 50000,
  status: "approved",
  createdBy: {
    _id: `user${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
  },
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

const CollectionList = () => {
  const [sortBy, setSortBy] = useState("best-selling");

  const handleViewDetails = (product: ContentResponse) => {
    console.log("View details:", product);
  };

  const handleAddToCart = (product: ContentResponse) => {
    console.log("Add to cart:", product);
  };

  const getBlueprintListQuery = useGetApiContent<{
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

  return (
    <div className="space-y-6">
      {/* Header with Sort */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          Showing {mockProducts.length} products
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-0 bg-transparent font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-selling">BEST SELLING</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-az">Name: A-Z</SelectItem>
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

      {/* Pagination - Optional */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
