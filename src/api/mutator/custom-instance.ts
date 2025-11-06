import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import baseConfig from "../../configs/base";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";

// Main API instance
export const MAIN_AXIOS_INSTANCE = Axios.create({
  baseURL: baseConfig.backendDomain,
  timeout: 60000,
});

// Response middleware
MAIN_AXIOS_INSTANCE.interceptors.response.use(
  async (response) => response,
  (error) => {
    toast.warning(extractErrorMessage(error));

    return Promise.reject(error);
  }
);

export const mainInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = MAIN_AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data, status }) => {
    return data instanceof Blob ? data : { ...data, statusCode: status };
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
  options?: any
): Promise<T> => {
  const response = await FILE_UPLOAD_AXIOS_INSTANCE({
    ...config,
    ...options,
  });
  return response.data as T;
};

export default mainInstance;

export type ErrorType<Error = any> = Error;
export type BodyType<BodyData = any> = BodyData;
