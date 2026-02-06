"use client";

import { useState } from "react";
import { Star, ThumbsUp, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { useParams } from "next/navigation";
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
  ratingStats?: any;
}

const BlueprintDetailFeedbackFilter = ({
  ratingStats,
}: ReviewSidebarProps & {
  onRatingFilterChange?: (rating: number | null) => void;
}) => {
  const params = useParams<{ id: string }>();

  const ratingData: any = (ratingStats as any)?.data;
  const averageRating = ratingData?.averageStars || 0;
  const totalReviews = ratingData?.totalRatings || 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratingData?.starsCount?.[stars] || 0;
    const percentage =
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, count, percentage };
  });
  const [userRating] = useState<number | null>(null);
  const [guestEmail, setGuestEmail] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);

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
              >
                Hủy
              </Button>
              <Button>Gửi đánh giá</Button>
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
                  className="cursor-pointer p-1 rounded-full hover:bg-primary/20 backdrop-blur-md"
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
    </div>
  );
};

export default BlueprintDetailFeedbackFilter;
