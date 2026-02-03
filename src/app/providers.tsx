"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";
import { isAxiosError, HttpStatusCode } from "axios";
import { Response } from "@/api/types/base";
import { useAuthStore } from "@/stores";

interface ProvidersProps {
  children: ReactNode;
}

// Constants
const RETRY_COUNT = 0;

// Utils
const handleDelayRetry = (failureCount: number) =>
  failureCount * 1000 + Math.random() * 1000;

const handleRetry = (failureCount: number, error: Error) => {
  // Check retry count and is axios error
  if (failureCount > RETRY_COUNT || !isAxiosError<Response>(error)) {
    return false;
  }

  // Expired token error
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    useAuthStore.getState().resetStore();
    // In Next.js, we'll handle this in middleware
    window.location.href = "/auth/login";
    return false;
  }

  // Denied permission error
  if (error.response?.status === HttpStatusCode.Forbidden) {
    return false;
  }

  return error.response?.status === HttpStatusCode.InternalServerError
    ? false
    : true;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            retry: handleRetry,
            retryDelay: handleDelayRetry,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
