import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Category } from "@/api/models/category";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

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

const CollectionFilters = () => {
  const [isViewOpen, setIsViewOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 193]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedViews, setSelectedViews] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleViewToggle = (viewId: string) => {
    setSelectedViews((prev) =>
      prev.includes(viewId)
        ? prev.filter((id) => id !== viewId)
        : [...prev, viewId]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedViews([]);
    setPriceRange([0, 193]);
  };

  const activeFiltersCount = selectedCategories.length + selectedViews.length;

  return (
    <div className="sticky top-20 space-y-6">
      {/* Category Filter */}
      <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b">
          <h3 className="font-medium text-gray-900">Category</h3>
          {isCategoryOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {mockCategories.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category._id}`}
                checked={selectedCategories.includes(category._id!)}
                onCheckedChange={() => handleCategoryToggle(category._id!)}
              />
              <Label
                htmlFor={`category-${category._id}`}
                className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
      {/* Price Filter */}
      <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full pb-3 border-b">
          <h3 className="font-medium text-gray-900">Price</h3>
          {isPriceOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-6 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={193}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                }
                className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <span className="text-gray-400">-</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    parseInt(e.target.value) || 193,
                  ])
                }
                className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full gap-2"
        >
          <XIcon className="w-4 h-4" />
          Clear all filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
};

export default CollectionFilters;
