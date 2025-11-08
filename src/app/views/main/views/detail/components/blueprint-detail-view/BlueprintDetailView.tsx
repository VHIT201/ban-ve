import { ContentResponse } from "@/api/types/content";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lens } from "@/components/ui/lens";
import { formatFileSize } from "@/utils/file";
import { DownloadIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import { FC, useState } from "react";
import { Props } from "./lib/types";

const mockProduct: ContentResponse = {
  _id: "1",
  title: "Flat Vector Everyday Life Detailed Plan Creator Bundle",
  description:
    "Flat vector everyday life themed detailed plan creator bundle for your architecture & design projects.",
  category_id: {
    _id: "cat1",
    name: "Thiết kế đồ họa",
    slug: "thiet-ke-do-hoa",
    description: "Bản vẽ thiết kế đồ họa",
  },
  file_id: {
    _id: "file1",
    name: "flat-vector-bundle.ai",
    url: "/uploads/flat-vector-bundle.ai",
    type: "AI",
    size: 78643200, // 75.3 MB
  },
  price: 289000, // ~$11.99
  status: "approved",
  createdBy: {
    _id: "user1",
    username: "TOFFU",
    email: "toffu@example.com",
  },
  createdAt: "2025-11-01T10:00:00Z",
  updatedAt: "2025-11-08T15:30:00Z",
};

const MOCK_IMAGE_LIST = [
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
  "https://images.pexels.com/photos/1404948/pexels-photo-1404948.jpeg",
];

const BlueprintDetailView: FC<Props> = (props) => {
  // Props
  const { content } = props;

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating] = useState(4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column - Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className=" bg-gray-50 rounded-lg overflow-hidden border">
          <Lens
            zoomFactor={2}
            lensSize={150}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <img
              src={MOCK_IMAGE_LIST[selectedImage]}
              alt={mockProduct.title}
              className="w-full h-[500px] object-cover"
            />
          </Lens>
        </div>

        {/* Thumbnail Gallery */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {MOCK_IMAGE_LIST.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/3 md:basis-1/4"
              >
                <button
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all duration-200 w-full ${
                    selectedImage === index
                      ? "border-gray-900 ring-2 ring-gray-900/20"
                      : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons - only show if there are more than 4 items */}
          {MOCK_IMAGE_LIST.length > 4 && (
            <>
              <CarouselPrevious className="left-0 size-8 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white" />
              <CarouselNext className="right-0 size-8 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white" />
            </>
          )}
        </Carousel>
      </div>

      {/* Right Column - Product Info */}
      <div className="space-y-6">
        {/* Brand & Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
          {content.title}
        </h1>

        {/* Price & Rating */}
        <div className="space-y-3">
          <div className="text-3xl font-bold text-gray-900">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(content.price)}
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-4 h-4 ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating > 0 ? `${rating}/5` : "Chưa có đánh giá"}
            </span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">File Type:</div>
            <div className="font-medium">Vector</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">File Size:</div>
            <div className="font-medium">
              {formatFileSize(content.file_id.size)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Format:</div>
            <div className="font-medium">AI, PDF, PNG</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Category:</div>
            <div className="font-medium">{content.category_id.name}</div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          <div className="flex gap-3">
            <Button size="lg" className="flex-1 h-12">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Thêm vào giỏ hàng
            </Button>

            <Button size="lg" variant="destructive" className="flex-1 h-12">
              Mua Ngay
            </Button>
          </div>

          <Button variant="outline" size="lg" className="w-full h-12">
            <DownloadIcon className="w-5 h-5 mr-2" />
            Tải xuống miễn phí (Preview)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlueprintDetailView;
