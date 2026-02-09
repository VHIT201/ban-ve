"use client";

import { useGetApiContentId } from "@/api/endpoints/content";
import { ContentResponse } from "@/api/types/content";
import { QueryBoundary } from "@/components/shared";
import { BASE_PATHS } from "@/constants/paths";
import { UseQueryResult } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  AdminContentDetailView,
  AdminContentFeedback,
  AdminContentFeedbackFilter,
} from "./components";

const ContentDetail = () => {
  // Hooks
  const { id: contentId } = useParams() as { id: string };

  // Queries
  const getContentDetailQuery = useGetApiContentId(
    contentId,
    {},
  ) as UseQueryResult<ContentResponse>;

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Content Header */}
      <motion.div
        className="flex flex-wrap items-end justify-between gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <Link
            href={BASE_PATHS.admin.contents.path}
            className="hover:opacity-70 transition-opacity"
          >
            <ArrowLeftIcon className="size-5 text-muted-foreground" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Chi tiết nội dung
            </h2>
            <p className="text-muted-foreground text-sm">
              Xem và quản lý thông tin nội dung
            </p>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 px-6 py-8">
        <motion.div
          className="relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />
          <div className="relative">
            <QueryBoundary query={getContentDetailQuery}>
              {(content) => <AdminContentDetailView content={content} />}
            </QueryBoundary>
          </div>
        </motion.div>
      </div>

      {/* Reviews & Comments Section */}
      <motion.div
        className="relative border-t border-border/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <QueryBoundary query={getContentDetailQuery}>
                {(content) => (
                  <AdminContentFeedback
                    content={content as unknown as ContentResponse}
                  />
                )}
              </QueryBoundary>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AdminContentFeedbackFilter contentId={contentId} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContentDetail;
