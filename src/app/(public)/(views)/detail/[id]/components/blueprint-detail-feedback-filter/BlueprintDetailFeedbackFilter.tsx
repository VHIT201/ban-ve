"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, ShieldCheck, TrendingUp, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  usePostApiRatings,
  usePutApiRatings,
  useGetApiRatingsStatsContentId, 
} from "@/api/endpoints/ratings";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores";
import { useShallow } from "zustand/shallow";
import { useParams } from "next/navigation";
import { extractErrorMessage } from "@/utils/error";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
interface ReviewSidebarProps {
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: { stars: number; count: number; percentage: number }[];
  verifiedPercentage?: number;
  onRatingFilterChange?: (rating: number | null) => void;
}

const BlueprintDetailFeedbackFilter = ({
  onRatingFilterChange,
}: ReviewSidebarProps & {
  onRatingFilterChange?: (rating: number | null) => void;
}) => {
  const params = useParams<{ id: string }>();
  const contentId = params?.id;

  const {
    data: ratingStats,
    isLoading,
    error,
  } = useGetApiRatingsStatsContentId(contentId || "", {
    query: {
      enabled: !!contentId,
      refetchOnWindowFocus: false,
      queryKey: ["ratings", "stats", contentId],
    },
  });

  // Calculate derived values from the API response
  const averageRating = ratingStats?.data?.averageStars || 0;
  const totalReviews = ratingStats?.data?.totalRatings || 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratingStats?.data?.starsCount?.[stars] || 0;
    const percentage =
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, count, percentage };
  });

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [guestEmail, setGuestEmail] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [pendingRating, setPendingRating] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { isSignedIn } = useAuthStore(
    useShallow((state) => ({
      isSignedIn: state.isSignedIn,
    })),
  );

  const { mutate: submitRating, isPending: isSubmitting } = usePostApiRatings({
    mutation: {
      onSuccess: (data) => {
        toast.success(data?.message || "Cảm ơn bạn đã đánh giá!");
        // Invalidate both the ratings list and the stats query
        queryClient.invalidateQueries({
          queryKey: ["ratings"],
        });
        queryClient.invalidateQueries({
          queryKey: ["ratings", "stats", contentId],
        });
      },
      onError: (error) => {
        console.error("Lỗi khi gửi đánh giá:", error);
        toast.error(extractErrorMessage(error));
      },
    },
  });

  const handleRatingClick = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    onRatingFilterChange?.(newRating);
  };

  const handleUserRating = (rating: number) => {
    setPendingRating(rating);

    if (isSignedIn) {
      submitRatingNow(rating);
    } else {
      setShowEmailDialog(true);
    }
  };

  const submitRatingNow = (rating: number, email?: string) => {
    const contentId = window.location.pathname.split("/").pop() || "";

    submitRating({
      data: {
        contentId,
        stars: rating,
        email: email,
      },
    });
    setUserRating(rating);
  };

  const handleEmailSubmit = () => {
    if (!guestEmail) {
      toast.error("Vui lòng nhập email của bạn");
      return;
    }
    if (pendingRating) {
      submitRatingNow(pendingRating, guestEmail);
      setShowEmailDialog(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-destructive">
        Đã có lỗi xảy ra khi tải thông tin đánh giá. Vui lòng thử lại sau.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
            <DialogDescription>
              Vui lòng nhập email của bạn để gửi đánh giá
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email của bạn"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button onClick={handleEmailSubmit} disabled={isSubmitting}>
                <span className="text-white">{isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rating Summary Card */}
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-foreground">
                {averageRating}
              </span>
              <span className="text-muted-foreground">/ 5</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleUserRating(rating)}
                  disabled={isSubmitting}
                  className="cursor-pointer p-1 rounded-full hover:bg-primary/20 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-colors",
                      userRating !== null && rating <= userRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {totalReviews.toLocaleString()}
            </span>
            <span>đánh giá</span>
          </div>

          <div className="pt-2 border-t border-border">
            {/* <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Đã xác thực</span>
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3 w-3" />
                {verifiedPercentage}%
              </Badge>
            </div> */}
          </div>
        </div>
      </Card>

      {/* Rating Distribution */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-sm font-semibold mb-4 text-foreground">
          Phân bổ đánh giá
        </h3>
        <div className="flex flex-col gap-3">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm text-muted-foreground">
                  {item.stars}
                </span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </div>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-xs text-muted-foreground w-12 text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Helpful Reviews */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Đánh giá hữu ích
        </h3>
        <div className="flex flex-col gap-4">
          {[
            {
              name: "Nguyễn Văn A",
              rating: 5,
              comment: "Sản phẩm chất lượng tốt, giao hàng nhanh...",
              helpful: 245,
            },
            {
              name: "Trần Thị B",
              rating: 4,
              comment: "Đóng gói cẩn thận, giá cả hợp lý...",
              helpful: 189,
            },
          ].map((review, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <div className="bg-primary/10 size-8 text-primary flex items-center justify-center h-full text-xs font-medium">
                    {review.name[0]}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {review.name}
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3 w-3 ${
                          j < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {review.comment}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ThumbsUp className="h-3 w-3" />
                <span>{review.helpful} người thấy hữu ích</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BlueprintDetailFeedbackFilter;
