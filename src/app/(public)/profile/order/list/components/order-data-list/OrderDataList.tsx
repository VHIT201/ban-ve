"use client";

import { useState } from "react";
import { useGetApiOrders } from "@/api/endpoints/orders";
import { Order } from "@/api/models";
import { QueryBoundary } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import OrderDataItem from "./components/order-data-item";
import { UseQueryResult } from "@tanstack/react-query";
import { SearchX } from "lucide-react";

const OrderDataList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const ordersQuery = useGetApiOrders(
    {
      page: currentPage,
      limit: pageSize,
    },
    {
      query: {
        select: (res: any) => ({
          orders: res.data?.orders ?? [],
          pagination: res.data?.pagination ?? { total: 0, page: 1, limit: pageSize },
        }),
      },
    }
  ) as UseQueryResult<{ orders: Order[]; pagination: any }>;

  return (
    <div className="space-y-6">
      <QueryBoundary query={ordersQuery}>
        {({ orders, pagination }) => {
          if (!orders || orders.length === 0) {
            return (
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <SearchX className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      Chưa có đơn hàng
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Bạn chưa có đơn hàng nào. Hãy khám phá và mua sắm ngay!
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          }

          const totalPages = Math.ceil(pagination.total / pagination.limit);
          
          const handlePageChange = (page: number) => {
            setCurrentPage(page);
          };

          const generatePaginationItems = () => {
            const items = [];
            const maxVisiblePages = 5;
            
            if (totalPages <= maxVisiblePages) {
              for (let i = 1; i <= totalPages; i++) {
                items.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                      }}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            } else {
              // Show first page
              items.push(
                <PaginationItem key={1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              );

              // Show ellipsis if needed
              if (currentPage > 3) {
                items.push(
                  <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              // Show pages around current page
              const startPage = Math.max(2, currentPage - 1);
              const endPage = Math.min(totalPages - 1, currentPage + 1);
              
              for (let i = startPage; i <= endPage; i++) {
                items.push(
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                      }}
                    >
                      {i}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show ellipsis if needed
              if (currentPage < totalPages - 2) {
                items.push(
                  <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              // Show last page
              if (totalPages > 1) {
                items.push(
                  <PaginationItem key={totalPages}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === totalPages}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            }

            return items;
          };

          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Danh sách đơn hàng
                </h2>
                <div className="text-sm text-gray-500">
                  {orders.length} / {pagination.total} đơn hàng
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {orders.map((order) => (
                  <OrderDataItem key={order._id} order={order} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                              handlePageChange(currentPage - 1);
                            }
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {generatePaginationItems()}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                              handlePageChange(currentPage + 1);
                            }
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          );
        }}
      </QueryBoundary>
    </div>
  );
};

export default OrderDataList;
