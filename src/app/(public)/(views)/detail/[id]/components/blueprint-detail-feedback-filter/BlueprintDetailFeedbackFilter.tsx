"use client";

import { Star } from "lucide-react";
import { easeOut, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { RatingStar } from "@/components/shared";
import { useGetApiCommentsContentsContentId } from "@/api/endpoints/comments";

interface ReviewSidebarProps {
  contentId: string;
}

const BlueprintDetailFeedbackFilter = ({
  contentId,
}: ReviewSidebarProps & {
  onRatingFilterChange?: (rating: number | null) => void;
}) => {
  // Queries
  const getCommentListQuery = useGetApiCommentsContentsContentId(
    contentId,
    {
      page: 1,
      limit: 1000,
    },
    {
      query: {
        select: (query) => query.data,
      },
    },
  );

  // Memos
  const comments = getCommentListQuery.data ?? [];

  const totalReviews = comments.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          (
            comments.reduce((sum, comment) => sum + (comment.stars || 0), 0) /
            totalReviews
          ).toFixed(1),
        );

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = comments.filter((comment) => comment.stars === stars).length;
    const percentage = totalReviews === 0 ? 0 : (count / totalReviews) * 100;
    return { stars, count, percentage };
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const ratingBarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: easeOut,
      },
    }),
  };

  return (
    <motion.div
      className="flex flex-col gap-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Rating Summary Card */}
      <motion.div variants={cardVariants}>
        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50 backdrop-blur-sm overflow-hidden relative">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />

          <div className="relative flex flex-col items-center text-center gap-5">
            {/* Rating Number */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {averageRating}
                </motion.span>
                <span className="text-lg text-muted-foreground/70">/ 5</span>
              </div>
            </motion.div>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <RatingStar view value={averageRating} />
            </motion.div>

            {/* Review Count */}
            <motion.div
              className="flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="font-semibold text-foreground/90">
                {totalReviews.toLocaleString()}
              </span>
              <span className="text-muted-foreground/70">đánh giá</span>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Rating Distribution */}
      <motion.div variants={cardVariants}>
        <Card className="p-6 bg-card/80 border-border/50 backdrop-blur-sm">
          <h3 className="text-sm font-semibold mb-5 text-foreground/90">
            Phân bổ đánh giá
          </h3>
          <div className="flex flex-col gap-3">
            {ratingDistribution.map((item, index) => (
              <motion.div
                key={item.stars}
                custom={index}
                variants={ratingBarVariants}
                className="group flex items-center gap-3 cursor-pointer"
              >
                {/* Star Rating Label */}
                <div className="flex items-center gap-1.5 w-14">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.stars}
                  </span>
                  <Star className="h-3.5 w-3.5 fill-amber-400/90 text-amber-400/90 transition-transform group-hover:scale-110" />
                </div>

                {/* Progress Bar */}
                <div className="flex-1 relative">
                  <Progress value={item.percentage} className="h-2 bg-muted/50">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{
                        delay: 0.6 + index * 0.08,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </Progress>
                </div>

                {/* Count */}
                <motion.span
                  className="text-xs font-medium text-muted-foreground/70 w-12 text-right tabular-nums group-hover:text-foreground transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.08 }}
                >
                  {item.count}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BlueprintDetailFeedbackFilter;
