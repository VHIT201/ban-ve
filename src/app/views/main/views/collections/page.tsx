import React, { useState, useEffect } from "react";
import { ContentResponse } from "@/api/types/content";
import { Category } from "@/api/models/category";
import { ChevronRight, ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  CategoriesSection,
  CollectionFilters,
  CollectionList,
} from "./components";
import { FilterFormValues } from "./components/collection-filters/lib/types";
import { DEFAULT_FILTER_VALUES } from "./components/collection-filters/lib/constants";
import { Main } from "@/components/layouts";

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

const CategoryPage = () => {
  // Hooks
  const [searchParams] = useSearchParams();
  
  // States
  const [filteredProducts, setFilteredProducts] = useState<FilterFormValues>(
    DEFAULT_FILTER_VALUES,
  );

  // Update filter when URL changes
  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      setFilteredProducts(prev => ({
        ...prev,
        categories: [categoryId],
      }));
    } else {
      setFilteredProducts(prev => ({
        ...prev,
        categories: [],
      }));
    }
  }, [searchParams]);

  // Handle filter change
  const handleFilterChange = (newFilter: FilterFormValues) => {
    setFilteredProducts(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with bg-primary */}
      <div className="bg-primary">
        <Main>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <a href="/" className="hover:text-white transition-colors">
              Trang chủ
            </a>
            <ChevronRight className="w-4 h-4" />
            <a
              href="/collections"
              className="hover:text-white transition-colors"
            >
              Sản phẩm
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Tất cả sản phẩm</span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Khám phá bộ sưu tập
          </h1>
          <p className="text-white/80 mt-2 text-sm lg:text-base">
            Tìm kiếm và lựa chọn từ hàng nghìn thiết kế chất lượng cao
          </p>
        </Main>
      </div>

      {/* Main Content */}
      <Main>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-[350px] shrink-0 hidden lg:block">
            <div className="sticky top-20">
              <CollectionFilters 
                onFilterChange={handleFilterChange} 
                initialValues={filteredProducts}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* <CategoriesSection /> */}
            <CollectionList
              filter={filteredProducts}
              onClearFilters={() => setFilteredProducts(DEFAULT_FILTER_VALUES)}
            />
          </main>
        </div>
      </Main>
    </div>
  );
};

export default CategoryPage;
