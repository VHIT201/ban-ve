"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentList } from "./components/comments/CommentList";
import DownloadList from "@/app/(public)/(views)/profile/(views)/history/components/downloads/DownloadList";
import { Edit3Icon, DownloadIcon } from "lucide-react";
import { PaymentStatus } from "@/api/models/paymentStatus";

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Không xác định";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const History = () => {
  return (
    <div>
      <Tabs defaultValue="downloads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md h-12">
          <TabsTrigger
            value="downloads"
            className="flex items-center gap-2 h-10"
          >
            <DownloadIcon className="h-4 w-4" />
            Lịch sử tải file
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2 h-10">
            <Edit3Icon className="h-4 w-4" />
            Lịch sử đánh giá
          </TabsTrigger>
        </TabsList>
        <TabsContent value="downloads" className="space-y-6">
          <DownloadList />
        </TabsContent>
        <TabsContent value="reviews" className="space-y-6">
          <CommentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
