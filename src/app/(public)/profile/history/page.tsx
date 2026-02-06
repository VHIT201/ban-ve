"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit3Icon, CreditCardIcon, DownloadIcon } from "lucide-react";
import { DownloadList, CommentList, TransactionList } from "./components";

const History = () => {
  return (
    <div>
      <Tabs defaultValue="downloads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md h-12">
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
          <TabsTrigger
            value="transactions"
            className="flex items-center gap-2 h-10"
          >
            <CreditCardIcon className="h-4 w-4" />
            Lịch sử giao dịch
          </TabsTrigger>
        </TabsList>
        <TabsContent value="downloads" className="space-y-6">
          <DownloadList />
        </TabsContent>
        <TabsContent value="reviews" className="space-y-6">
          <CommentList />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-6">
          <TransactionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
