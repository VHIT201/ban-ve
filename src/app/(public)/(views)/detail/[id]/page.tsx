"use client";

import { BlueprintDetailFeedback, BlueprintDetailView } from "./components";
import { useGetApiContentId } from "@/api/endpoints/content";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import BlueprintDetailFeedbackFilter from "./components/blueprint-detail-feedback-filter";
import { Content } from "@/api/models";
import { ContentResponse } from "@/api/types/content";
import { use } from "react";

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Detail = ({ params }: DetailPageProps) => {
  const { id } = use(params);

  // Queries
  const getContentDetailQuery = useGetApiContentId(id, {
    query: {
      select: (data) => data as unknown as Content,
    },
  }) as UseQueryResult<Content>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Detail Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <QueryBoundary query={getContentDetailQuery}>
            {(content) => <BlueprintDetailView content={content} />}
          </QueryBoundary>
        </div>
      </div>

      {/* Reviews & Comments Section */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <QueryBoundary query={getContentDetailQuery}>
              {(content) => (
                <BlueprintDetailFeedback
                  content={content as unknown as ContentResponse}
                />
              )}
            </QueryBoundary>
          </div>
          <BlueprintDetailFeedbackFilter />
        </div>
      </div>
    </div>
  );
};

export default Detail;
