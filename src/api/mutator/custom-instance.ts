// Core
import Axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

// App
import { useAuthStore } from "@/stores";
import { shouldRefreshToken } from "@/utils/token";

// Internal
import baseConfig from "../../configs/base";
import { isUndefined } from "lodash-es";

const getAuthRefreshFunction = async () => {
  const { postApiAuthRefreshToken } = await import("../endpoints/auth");
  return postApiAuthRefreshToken;
};

export const MAIN_AXIOS_INSTANCE = Axios.create({
  timeout: 60000,
  baseURL: baseConfig.backendDomain,
});

// Refresh token state management
let isRefreshing = false;
let refreshTokenPromise: Promise<string> | null = null;

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

let failedQueue: QueuedRequest[] = [];

/**
 * Process queued requests after token refresh
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Add request to queue and wait for token refresh
 */
const addToQueue = (
  resolve: (token: string) => void,
  reject: (error: AxiosError) => void,
): void => {
  failedQueue.push({ resolve, reject });
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = useAuthStore.getState().refreshToken;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  // Get the refresh function dynamically to avoid circular dependency
  const postApiAuthRefreshToken = await getAuthRefreshFunction();
  const authRefreshResponse = await postApiAuthRefreshToken({
    refreshToken,
  });

  if (!authRefreshResponse.data?.accessToken) {
    throw new Error("Refresh token failed - no access token returned");
  }

  const newAccessToken = authRefreshResponse.data.accessToken;
  const newRefreshToken = authRefreshResponse.data.refreshToken || refreshToken;

  // Update store with new tokens
  useAuthStore.getState().setStore({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });

  return newAccessToken;
};

/**
 * Request interceptor - adds auth token and handles proactive refresh
 */
MAIN_AXIOS_INSTANCE.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;

    // Skip auth for public endpoints
    const publicEndpoints = [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/refresh-token",
    ];
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    if (isPublicEndpoint) {
      return config;
    }

    // Check if we have a token
    if (!accessToken) {
      return config;
    }

    // Proactive token refresh - refresh if token will expire soon
    if (shouldRefreshToken(accessToken, 5)) {
      try {
        // If already refreshing, wait for it
        if (isRefreshing && refreshTokenPromise) {
          const newToken = await refreshTokenPromise;
          if (config.headers) {
            config.headers.Authorization = `Bearer ${newToken}`;
          }
          return config;
        }

        // Start refresh process
        isRefreshing = true;
        refreshTokenPromise = refreshAccessToken();

        const newToken = await refreshTokenPromise;

        if (config.headers) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }

        isRefreshing = false;
        refreshTokenPromise = null;

        return config;
      } catch (error) {
        console.error("Proactive token refresh failed:", error);
        isRefreshing = false;
        refreshTokenPromise = null;
        // Continue with current token, might fail and trigger response interceptor
      }
    }

    // Add current token to request
    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor - handles 401 errors and automatic token refresh
 */
MAIN_AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    // Check if response exists
    if (isUndefined(error.response)) {
      console.error("Network error or request cancelled:", error.message);
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Skip token refresh for authentication endpoints
      const authEndpoints = [
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/refresh-token",
      ];
      if (
        authEndpoints.some((endpoint) =>
          originalRequest.url?.includes(endpoint),
        )
      ) {
        return Promise.reject(error);
      }

      // Prevent infinite retry loops
      if (originalRequest._retry) {
        console.error("Token refresh already attempted, logging out");
        useAuthStore.getState().resetStore();

        // Only show toast once
        if (!originalRequest._retryCount || originalRequest._retryCount === 1) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }

        // Optionally redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(error);
      }

      // If already refreshing, add to queue
      if (isRefreshing && refreshTokenPromise) {
        try {
          const newToken = await new Promise<string>((resolve, reject) => {
            addToQueue(resolve, reject);
          });

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          // Retry original request with new token
          return MAIN_AXIOS_INSTANCE(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      // Mark this request as retry attempt
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      isRefreshing = true;

      try {
        // Start refresh process
        refreshTokenPromise = refreshAccessToken();
        const newAccessToken = await refreshTokenPromise;

        // Update the failed request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Process all queued requests
        processQueue(null, newAccessToken);

        // Retry the original request
        return MAIN_AXIOS_INSTANCE(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Notify all queued requests about the failure
        processQueue(refreshError as AxiosError, null);

        // Clear auth state
        useAuthStore.getState().resetStore();

        // Show error message
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

        // Optionally redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshTokenPromise = null;
      }
    }

    // Handle other errors with specific messages
    if (error.response?.status === 403) {
      toast.error("Bạn không có quyền truy cập tài nguyên này.");
    } else if (error.response?.status === 429) {
      toast.error("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
    } else if (error.response?.status >= 500) {
      toast.error("Lỗi server. Vui lòng thử lại sau.");
    }

    return Promise.reject(error);
  },
);

export const mainInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = MAIN_AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => {
    return data;
  });

  // @ts-expect-error not exist cancel
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };
  return promise;
};

// File upload service instance (nếu khác với main API)
export const FILE_UPLOAD_AXIOS_INSTANCE = Axios.create({
  baseURL: `${baseConfig.backendDomain}/storage`,
});

export const fileUploadServiceInstance = async <T>(
  config: any,
  options?: any,
): Promise<T> => {
  const response = await FILE_UPLOAD_AXIOS_INSTANCE({
    ...config,
    ...options,
  });
  return response.data as T;
};

export default mainInstance;

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type SnakeToCamelCaseDeep<T> = {
  [K in keyof T as K extends string
    ? SnakeToCamelCase<K>
    : K]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<SnakeToCamelCaseDeep<U>>
      : SnakeToCamelCaseDeep<T[K]>
    : T[K];
};

export type ErrorType<Error = any> = Error;
export type BodyType<BodyData = any> = BodyData;

// export type ErrorType<Error = any> = SnakeToCamelCaseDeep<Error>;
// export type BodyType<BodyData = any> = SnakeToCamelCaseDeep<BodyData>;
