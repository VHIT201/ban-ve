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

// Mock data for demonstration
const mockBlueprints: ContentResponse[] = [
  {
    _id: "1",
    title: "Kết cấu nhà cao tầng - Tầng điển hình",
    description:
      "Bản vẽ kết cấu bê tông cốt thép nhà cao tầng, đầy đủ các mặt bằng, mặt cắt và chi tiết",
    category_id: {
      _id: "cat1",
      name: "Xây dựng",
      slug: "xay-dung",
      description: "Bản vẽ xây dựng và kết cấu công trình",
    },
    file_id: {
      _id: "file1",
      name: "ket-cau-nha-cao-tang.rvt",
      url: "/uploads/ket-cau-nha-cao-tang.rvt",
      type: "RVT",
      size: 10485760,
    },
    price: 2500000,
    status: "approved",
    createdBy: {
      _id: "user1",
      username: "admin",
      email: "admin@example.com",
    },
    createdAt: "2025-11-02T15:19:57.181Z",
    updatedAt: "2025-11-02T15:19:57.181Z",
  },
  // Add more mock data...
  ...Array.from({ length: 11 }, (_, i) => ({
    _id: `${i + 2}`,
    title: `Bản vẽ thiết kế ${i + 2}`,
    description: `Mô tả chi tiết cho bản vẽ thiết kế số ${
      i + 2
    } với đầy đủ thông tin kỹ thuật`,
    category_id: {
      _id: `cat${i + 2}`,
      name: i % 3 === 0 ? "Điện" : i % 3 === 1 ? "Cơ khí" : "Xây dựng",
      slug: i % 3 === 0 ? "dien" : i % 3 === 1 ? "co-khi" : "xay-dung",
      description: "Mô tả danh mục",
    },
    file_id: {
      _id: `file${i + 2}`,
      name: `ban-ve-${i + 2}.dwg`,
      url: `/uploads/ban-ve-${i + 2}.dwg`,
      type: "DWG",
      size: 5242880 + i * 1000000,
    },
    price: 1500000 + i * 500000,
    status: i % 3 === 0 ? "approved" : i % 3 === 1 ? "pending" : "approved",
    createdBy: {
      _id: `user${i + 2}`,
      username: `user${i + 2}`,
      email: `user${i + 2}@example.com`,
    },
    createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  })),
];

const BlueprintFeatureSection = () => {
  const [blueprints] = useState<ContentResponse[]>(mockBlueprints);
  const [filteredBlueprints, setFilteredBlueprints] =
    useState<ContentResponse[]>(mockBlueprints);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get unique categories
  const categories = Array.from(
    new Set(blueprints.map((b) => b.category_id.name))
  );

  // Filter and sort logic
  React.useEffect(() => {
    let filtered = [...blueprints];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blueprint) =>
          blueprint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blueprint.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (blueprint) => blueprint.category_id.name === selectedCategory
      );
    }

    // Status filter
    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter(
        (blueprint) => blueprint.status === selectedStatus
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredBlueprints(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, blueprints]);

  // Pagination
  const totalPages = Math.ceil(filteredBlueprints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlueprints = filteredBlueprints.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewDetails = (blueprint: ContentResponse) => {
    console.log("View details:", blueprint);
    // TODO: Implement navigation to detail page
  };

  const handleAddToCart = (blueprint: ContentResponse) => {
    console.log("Add to cart:", blueprint);
    // TODO: Implement add to cart functionality
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("newest");
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

        {/* Filters & Controls */}
        <div className="mb-8 space-y-4">
          {/* Search & View Mode */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm bản vẽ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-9 px-3"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-9 px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex flex-wrap gap-3 flex-1">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="price-low">Giá thấp → cao</SelectItem>
                  <SelectItem value="price-high">Giá cao → thấp</SelectItem>
                  <SelectItem value="name">Tên A → Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="h-9 px-3"
              >
                <Filter className="w-4 h-4 mr-1" />
                Đặt lại
              </Button>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Hiển thị {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredBlueprints.length)}
              trong tổng số {filteredBlueprints.length} kết quả
            </span>
            {(searchTerm ||
              selectedCategory !== "all" ||
              selectedStatus !== "all") && (
              <Badge variant="secondary" className="text-xs">
                Đã lọc
              </Badge>
            )}
          </div>
        </div>

        {/* Grid/List */}
        {paginatedBlueprints.length > 0 ? (
          <div
            className={`
            ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
            mb-12
          `}
          >
            {paginatedBlueprints.map((blueprint) => (
              <div
                key={blueprint._id}
                className={viewMode === "list" ? "max-w-none" : ""}
              >
                <BlueprintCard
                  blueprint={blueprint}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-600 mb-4">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <Button variant="outline" onClick={handleResetFilters}>
              Đặt lại bộ lọc
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="h-9 px-3"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const distance = Math.abs(page - currentPage);
                  return (
                    distance === 0 ||
                    distance === 1 ||
                    page === 1 ||
                    page === totalPages
                  );
                })
                .map((page, index, array) => {
                  const showEllipsis = index > 0 && array[index - 1] < page - 1;

                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-9 min-w-[36px] px-3"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  );
                })}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="h-9 px-3"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlueprintFeatureSection;
