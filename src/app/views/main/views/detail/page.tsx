import React, { Fragment, useState } from "react";

import { ContentResponse } from "@/api/types/content";
import { Lens } from "@/components/ui/lens";
import { BlueprintDetailFeedback, BlueprintDetailView } from "./components";
import { useGetApiContentId } from "@/api/endpoints/content";
import { useRequiredPathParams } from "@/hooks";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";

const Detail = () => {
  // Hooks
  const { id } = useRequiredPathParams(["id"]);

  // Queries
  const getContentDetailQuery = useGetApiContentId(id, {
    query: {
      select: (data) => data as unknown as ContentResponse,
    },
  }) as UseQueryResult<ContentResponse>;

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
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <QueryBoundary query={getContentDetailQuery}>
            {(content) => <BlueprintDetailFeedback content={content} />}
          </QueryBoundary>
        </div>
      </div>
    </div>
  );
};

export default Detail;
