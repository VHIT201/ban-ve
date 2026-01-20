"use client";

import { Download, Clock, Package, XCircle, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/utils/date";
import { useDownloadOrder } from "./hooks/useDownloadOrder";
import { OrderInfoCard } from "./components/OrderInfoCard";
import { FileItem } from "./components/FileItem";

export default function DownloadPage() {
  const {
    order,
    files,
    isLoading,
    isExpired,
    isNotFound,
    isNotCompleted,
    hasNoFiles,
    orderCode,
    downloadFile,
    downloadAllFiles,
  } = useDownloadOrder();

  // No orderCode in URL
  if (!orderCode) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing Order Code</AlertTitle>
          <AlertDescription>
            No order code provided. Please check your email for the correct
            download link.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Info Skeleton */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>

          {/* Files Skeleton */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Order not found
  if (isNotFound) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Order Not Found</AlertTitle>
          <AlertDescription>
            We couldn't find an order with code <strong>{orderCode}</strong>.
            Please check your email or contact support if you believe this is an
            error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Order expired
  if (isExpired && order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive">
          <Clock className="h-4 w-4" />
          <AlertTitle>Download Link Expired</AlertTitle>
          <AlertDescription>
            This download link expired on {formatDate(order.expiresAt!)}. Please
            contact support to request a new download link.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Order not completed
  if (isNotCompleted && order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Order Not Ready</AlertTitle>
          <AlertDescription>
            Your order is currently in <strong>{order.status}</strong> status.
            Downloads will be available once your order is completed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No files available
  if (hasNoFiles) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert>
          <Package className="h-4 w-4" />
          <AlertTitle>No Files Available</AlertTitle>
          <AlertDescription>
            There are no files associated with this order. Please contact
            support if you believe this is an error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Success state - show order and files
  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Your Downloads
          </h1>
          <p className="text-muted-foreground">
            Download your purchased files below. This link will expire on{" "}
            <span className="font-semibold">
              {formatDate(order.expiresAt!)}
            </span>
          </p>
        </div>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Information */}
          <div className="lg:col-span-1">
            <OrderInfoCard order={order} />
          </div>

          {/* Right Column - Downloadable Files */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Your Files ({files.length})
                </CardTitle>
                <CardDescription>
                  Click the download button to save each file to your device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {files.map((file) => (
                    <FileItem
                      key={file.id}
                      fileName={file.name}
                      fileType={file.type}
                      fileSize={file.size}
                      fileUrl={file.url}
                      onDownload={() => downloadFile(file.id)}
                    />
                  ))}
                </div>

                {/* Download All Button */}
                {files.length > 1 && (
                  <div className="mt-6 pt-6 border-t">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full gap-2"
                      onClick={downloadAllFiles}
                    >
                      <Download className="h-4 w-4" />
                      Download All Files
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you encounter any issues downloading your files, please contact
              our support team with your order code:{" "}
              <strong>{order.orderCode}</strong>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
