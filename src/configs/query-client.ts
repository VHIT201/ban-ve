// Core
import { QueryClient } from "@tanstack/react-query";
import { isAxiosError, HttpStatusCode } from "axios";

// App
import router from "@/routes";
import { Response } from "@/api/types/base";
import { BASE_PATHS } from "@/constants/paths";
import { useAuthStore } from "@/stores";
import { MutationCache } from "@tanstack/react-query";

// Constants
const RETRY_COUNT = 0;

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

  // Expired token error
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    useAuthStore.getState().resetStore();

    router.navigate(BASE_PATHS.auth.login.path);
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

// Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData: unknown) => previousData,
      retry: handleRetry,
      retryDelay: handleDelayRetry,
    },
    mutations: {
      retry: handleRetry,
      retryDelay: handleDelayRetry,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: async (_data, _variables, _context, mutation) => {
      const meta = mutation.options.meta;

      if (meta?.invalidateQueries?.length) {
        const promises = meta.invalidateQueries.map((qk) =>
          queryClient.refetchQueries({ queryKey: qk, exact: true })
        );

        await Promise.all(promises);
      }
    },
  }),
});

export default queryClient;
