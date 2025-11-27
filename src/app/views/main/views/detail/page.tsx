import React, { Fragment, useState } from "react";
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
import { BlueprintDetailFeedback, BlueprintDetailView } from "./components";
import { useGetApiContentId } from "@/api/endpoints/content";
import { useRequiredPathParams } from "@/hooks";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";

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
  // Hooks
  const { id } = useRequiredPathParams(["id"]);

  // Queries
  const getContentDetailQuery = useGetApiContentId(id, {
    query: {
      select: (data) => data as unknown as ContentResponse,
    },
  }) as UseQueryResult<ContentResponse>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <QueryBoundary query={getContentDetailQuery}>
          {(content) => (
            <Fragment>
              <BlueprintDetailView content={content} />
              <BlueprintDetailFeedback content={content} />
            </Fragment>
          )}
        </QueryBoundary>
      </div>
    </div>
  );
};

export default Detail;
