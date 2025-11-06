import { Category } from "@/api/models/category";
import CategoryItem from "./CategoryItem";

// Example data for demonstration
const exampleCategories: Category[] = [
  {
    _id: "1",
    name: "Nhà ở dân dụng",
    slug: "nha-o-dan-dung",
    description:
      "Thiết kế bản vẽ cho nhà ở gia đình, biệt thự, căn hộ và các công trình dân dụng",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "2",
    name: "Công trình thương mại",
    slug: "cong-trinh-thuong-mai",
    description:
      "Bản vẽ thiết kế cho trung tâm thương mại, cửa hàng, nhà hàng và các công trình kinh doanh",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "3",
    name: "Khu công nghiệp",
    slug: "khu-cong-nghiep",
    description:
      "Thiết kế nhà máy, kho bãi, xưởng sản xuất và các công trình công nghiệp",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "4",
    name: "Công trình giáo dục",
    slug: "cong-trinh-giao-duc",
    description:
      "Bản vẽ thiết kế trường học, đại học, thư viện và các công trình giáo dục",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "5",
    name: "Y tế & Chăm sóc sức khỏe",
    slug: "y-te-cham-soc-suc-khoe",
    description:
      "Thiết kế bệnh viện, phòng khám, trung tâm y tế và các công trình sức khỏe",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "6",
    name: "Cảnh quan & Công viên",
    slug: "canh-quan-cong-vien",
    description:
      "Thiết kế công viên, khu vườn, cảnh quan và các không gian xanh",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const CategoryItemExamples = () => {
  const handleCategoryClick = (category: Category) => {
    console.log("Category clicked:", category);
  };

  return (
    <div className="p-8 space-y-8 bg-background">
      <div>
        <h2 className="text-2xl font-bold mb-4">CategoryItem Variants</h2>

        {/* Default Variant */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Default Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleCategories.slice(0, 3).map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>

        {/* Featured Variant */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Featured Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleCategories.slice(0, 3).map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                variant="featured"
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>

        {/* Compact Variant */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Compact Variant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl">
            {exampleCategories.map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                variant="compact"
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>

        {/* Without Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Without Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exampleCategories.slice(0, 4).map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                showDescription={false}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItemExamples;
