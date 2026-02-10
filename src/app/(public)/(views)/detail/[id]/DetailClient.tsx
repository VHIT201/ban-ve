"use client";

import { BlueprintDetailFeedback, BlueprintDetailView } from "./components";
import { useGetApiContentId } from "@/api/endpoints/content";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import BlueprintDetailFeedbackFilter from "./components/blueprint-detail-feedback-filter";
import { Content } from "@/api/models";
import { ContentResponse } from "@/api/types/content";
import { motion } from "framer-motion";

interface DetailClientProps {
  id: string;
}

const DetailClient = ({ id }: DetailClientProps) => {
  // Queries
  const getContentDetailQuery = useGetApiContentId(id, {
    query: {
      select: (data) => data as unknown as Content,
    },
  }) as UseQueryResult<Content>;

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
    <div className="min-h-screen">
      {/* Product Detail Section */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500">
        <motion.div
          className="relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative container mx-auto px-4 py-12 lg:py-16">
            <QueryBoundary query={getContentDetailQuery}>
              {(content) => <BlueprintDetailView content={content} />}
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
                  <BlueprintDetailFeedback
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
              <BlueprintDetailFeedbackFilter contentId={id} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailClient;
