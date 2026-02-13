// Core
import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";
import { isAxiosError, HttpStatusCode } from "axios";

// App
import { Response } from "@/api/types/base";

// Constants
const RETRY_COUNT = 0;
const STALE_TIME = 0; // 0 minutes
const GC_TIME = 1000 * 60 * 3; // 3 minutes

// Utils
// Handle delay value
const handleDelayRetry = (failureCount: number) =>
  failureCount * 1000 + Math.random() * 1000;

// Handle retry
const handleRetry = (failureCount: number, error: Error) => {
  // Check retry count and is axios error
  if (failureCount > RETRY_COUNT || !isAxiosError<Response>(error)) {
    return false;
  }

  // Expired token error - will be handled in queryCache.onError
  if (error.response?.status === HttpStatusCode.Unauthorized) {
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

// Handle auth errors globally
const handleAuthError = (error: unknown) => {
  if (isAxiosError<Response>(error)) {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      // Dynamically import to avoid circular dependency
      import("@/stores").then(({ useAuthStore }) => {
        useAuthStore.getState().resetStore();
      });

      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
  }
};

export function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid refetch immediately on mount for SSR
        refetchOnMount: false,
        // Avoid refetch on window focus in production
        refetchOnWindowFocus: process.env.NODE_ENV === "development",
        // Refetch on reconnect
        refetchOnReconnect: "always",
        // Stale time - data considered fresh for 5 minutes
        staleTime: STALE_TIME,
        // Garbage collection time - unused data removed after 10 minutes
        gcTime: GC_TIME,
        // Keep previous data while fetching new data
        placeholderData: (previousData: unknown) => previousData,
        // Retry logic
        retry: handleRetry,
        retryDelay: handleDelayRetry,
      },
      mutations: {
        retry: handleRetry,
        retryDelay: handleDelayRetry,
        // Network mode - fail fast if offline
        networkMode: "online",
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        // Global error handler for queries
        handleAuthError(error);
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: async (_data, _variables, _context, mutation) => {
        const meta = mutation.options.meta;
        console.log("Mutation succeeded.", meta);
        if (meta?.invalidateQueries?.length) {
          console.log("Invalidating queries.", meta.invalidateQueries);

          const validQueryKeys = meta.invalidateQueries.filter(
            (qk) => qk && Array.isArray(qk) && qk.length > 0,
          );

          console.log("Valid query keys to invalidate:", validQueryKeys);

          if (validQueryKeys.length > 0) {
            const promises = validQueryKeys.map((qk) =>
              queryClient.refetchQueries({ queryKey: qk }),
            );

            await Promise.all(promises);
          }
        }
      },
    }),
  });

  return queryClient;
}

// Get or create query client for browser
export function getQueryClient() {
  return makeQueryClient();
}

// Default export for backward compatibility
const queryClient = getQueryClient();
export default queryClient;
