import { Star, ThumbsUp, ShieldCheck, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface ReviewSidebarProps {
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: { stars: number; count: number; percentage: number }[];
  verifiedPercentage?: number;
}

const BlueprintDetailFeedbackFilter = ({
  averageRating = 4.5,
  totalReviews = 1248,
  ratingDistribution = [
    { stars: 5, count: 856, percentage: 68.6 },
    { stars: 4, count: 265, percentage: 21.2 },
    { stars: 3, count: 87, percentage: 7.0 },
    { stars: 2, count: 25, percentage: 2.0 },
    { stars: 1, count: 15, percentage: 1.2 },
  ],
  verifiedPercentage = 89,
}: ReviewSidebarProps) => {
  return (
    <div className="flex flex-col gap-6 w-full">
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

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {totalReviews.toLocaleString()}
            </span>
            <span>đánh giá</span>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Đã xác thực</span>
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3 w-3" />
                {verifiedPercentage}%
              </Badge>
            </div>
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
