// Core
import Axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

// App
import { useAuthStore } from "@/stores";
import { extractErrorMessage } from "@/utils/error";

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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

MAIN_AXIOS_INSTANCE.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

MAIN_AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (isUndefined(error.response)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip token refresh for login endpoint
      if (originalRequest.url?.includes("/api/auth/login")) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return MAIN_AXIOS_INSTANCE(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Gọi API refresh token
        const postApiAuthRefreshToken = await getAuthRefreshFunction();
        const authRefreshResponse = await postApiAuthRefreshToken({
          refreshToken,
        });

        if (!authRefreshResponse.data) {
          throw new Error("Refresh token failed");
        }

        const newAccessToken = authRefreshResponse.data.accessToken;

        useAuthStore.getState().setStore({
          accessToken: newAccessToken,
          refreshToken: authRefreshResponse.data.refreshToken || refreshToken,
        });

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);

        return MAIN_AXIOS_INSTANCE(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        useAuthStore.getState().resetStore();

        toast.error("Session expired. Please login again.");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
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
