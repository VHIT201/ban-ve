import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Star,
  ShoppingCart,
  Download,
  Heart,
  Share2,
  Package,
  Info,
  CheckCircle,
  Zap,
  MonitorIcon,
  DollarSignIcon,
} from "lucide-react";
import { ContentResponse } from "@/api/types/content";
import { Lens } from "@/components/ui/lens";

// Mock data - replace with actual data from props/API
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

const Detail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [rating] = useState(0); // No rating yet

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", mockProduct);
    // TODO: Implement add to cart functionality
  };

  const handleDownload = () => {
    console.log("Download:", mockProduct);
    // TODO: Implement download functionality
  };

  const handleShare = () => {
    console.log("Share:", mockProduct);
    // TODO: Implement share functionality
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
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
              {mockProduct.title}
            </h1>

            {/* Price & Rating */}
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(mockProduct.price)}
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
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
                  {formatFileSize(mockProduct.file_id.size)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Format:</div>
                <div className="font-medium">AI, PDF, PNG</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Category:</div>
                <div className="font-medium">
                  {mockProduct.category_id.name}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-gray-700 leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 h-12"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>

                <Button
                  size="lg"
                  variant="destructive"
                  className="flex-1 h-12"
                  onClick={handleAddToCart}
                >
                  Mua Ngay
                </Button>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full h-12"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 mr-2" />
                Tải xuống miễn phí (Preview)
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="technical">Chi tiết kỹ thuật</TabsTrigger>
              <TabsTrigger value="compatibility">Tương thích</TabsTrigger>
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="about">Về Vector</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 mt-1 text-blue-500" />
                    <div>
                      <h4 className="font-medium mb-2">Chi tiết kỹ thuật:</h4>
                      <p className="text-gray-700">
                        Tất cả các bản vẽ vector đều có thể thay đổi kích thước.
                        Bạn có thể dễ dàng thay đổi màu sắc và mẫu của các file
                        AI trong Adobe Illustrator hoặc file PDF trong Adobe
                        Photoshop.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compatibility" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MonitorIcon className="w-5 h-5 mt-1 text-green-500" />
                    <div>
                      <h4 className="font-medium mb-2">
                        Tương thích phần mềm:
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Adobe Photoshop và Illustrator CS3 trở lên. Affinity
                        Photo và Designer. CorelDRAW. File PNG phù hợp với hầu
                        hết mọi phần mềm đồ họa.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Adobe Illustrator</Badge>
                        <Badge variant="outline">Adobe Photoshop</Badge>
                        <Badge variant="outline">Affinity Designer</Badge>
                        <Badge variant="outline">CorelDRAW</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 mt-1 text-purple-500" />
                    <div>
                      <h4 className="font-medium mb-2">Nội dung:</h4>
                      <p className="text-gray-700">
                        Gói này bao gồm các scale con người và động vật được vẽ
                        tay theo phong cách có thể tô màu và thay đổi kích
                        thước. Phù hợp cho mọi dự án.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 mt-1 text-orange-500" />
                    <div>
                      <h4 className="font-medium mb-2">Về Vector:</h4>
                      <p className="text-gray-700">
                        Con người, đồ nội thất, cây cối và các scale khác chủ
                        yếu được sử dụng trong kiến trúc và thiết kế để tạo cảm
                        giác về quy mô và tỷ lệ trong các bản vẽ kỹ thuật.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Detail;
