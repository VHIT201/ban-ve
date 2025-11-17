import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BlueprintCard } from "@/components/modules/content";
import { ContentResponse } from "@/api/types/content";
import { Category } from "@/api/models/category";
import { ChevronRight, ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { CollectionFilters, CollectionList } from "./components";
import { FilterFormValues } from "./components/collection-filters/lib/types";
import { DEFAULT_FILTER_VALUES } from "./components/collection-filters/lib/constants";

// Mock data
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

const productViews = [
  { id: "axonometric", name: "Axonometric" },
  { id: "axonometric-view", name: "Axonometric view" },
  { id: "front-view", name: "Front view" },
];

const CategoryPage = () => {
  // States
  const [filteredProducts, setFilteredProducts] = useState<FilterFormValues>(
    DEFAULT_FILTER_VALUES
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-gray-900 transition-colors">
            Home
          </a>
          <ChevronRight className="w-4 h-4" />
          <a
            href="/collections"
            className="hover:text-gray-900 transition-colors"
          >
            Collections
          </a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">All Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 shrink-0 space-y-6 md:block hidden`}>
            <CollectionFilters onFilterChange={setFilteredProducts} />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <CollectionList filter={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
