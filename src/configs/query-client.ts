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

// Create query client with best practices
let browserQueryClient: QueryClient | undefined = undefined;

export function makeQueryClient() {
  return new QueryClient({
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
      onError: (error) => {
        // Global error handler for mutations
        handleAuthError(error);
      },
      onSuccess: async (_data, _variables, _context, mutation) => {
        const meta = mutation.options.meta;
        if (meta?.invalidateQueries?.length) {
          const validQueryKeys = meta.invalidateQueries.filter(
            (qk) => qk && Array.isArray(qk) && qk.length > 0,
          );

          if (validQueryKeys.length > 0) {
            const queryClientInstance = browserQueryClient;
            if (queryClientInstance) {
              const promises = validQueryKeys.map((qk) =>
                queryClientInstance.invalidateQueries({ queryKey: qk }),
              );

              await Promise.all(promises);
            }
          }
        }
      },
    }),
  });
}

// Get or create query client for browser
export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This ensures that data is not shared between different users and requests
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Default export for backward compatibility
const queryClient = getQueryClient();
export default queryClient;
