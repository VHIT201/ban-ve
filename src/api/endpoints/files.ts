// @ts-nocheck
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  ErrorResponse,
  File,
  FileUploadResponse,
  GetApiFile401,
  GetApiFileDownloadsHistory200,
  GetApiFileDownloadsHistoryParams,
  GetApiFileIdDownload403,
  PaymentRequiredResponse,
  PostApiFileUpload400,
  PostApiFileUpload401,
  PostApiFileUpload500,
  PostApiFileUploadBody,
} from "../models";

import { mainInstance } from "../mutator/custom-instance";
import type { ErrorType, BodyType } from "../mutator/custom-instance";

/**
 * Tải lên file lên máy chủ và lưu thông tin vào cơ sở dữ liệu.
Yêu cầu phải đăng nhập với quyền admin hoặc cộng tác viên.
Hỗ trợ các định dạng: 3D, PDF, hình ảnh, tài liệu văn bản, v.v.

 * @summary Tải lên file (Yêu cầu quyền admin hoặc cộng tác viên)
 */
export const postApiFileUpload = (
  postApiFileUploadBody: BodyType<PostApiFileUploadBody>,
  signal?: AbortSignal
) => {
  const formData = new FormData();
  formData.append(`file`, postApiFileUploadBody.file);
  if (postApiFileUploadBody.filename !== undefined) {
    formData.append(`filename`, postApiFileUploadBody.filename);
  }
  if (postApiFileUploadBody.dir !== undefined) {
    formData.append(`dir`, postApiFileUploadBody.dir);
  }
  if (postApiFileUploadBody.private !== undefined) {
    formData.append(`private`, postApiFileUploadBody.private.toString());
  }
  if (postApiFileUploadBody.compress !== undefined) {
    formData.append(`compress`, postApiFileUploadBody.compress.toString());
  }

  return mainInstance<FileUploadResponse>({
    url: `/api/file/upload`,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
    signal,
  });
};

export const getPostApiFileUploadMutationOptions = <
  TError = ErrorType<
    PostApiFileUpload400 | PostApiFileUpload401 | PostApiFileUpload500
  >,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiFileUpload>>,
    TError,
    { data: BodyType<PostApiFileUploadBody> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiFileUpload>>,
  TError,
  { data: BodyType<PostApiFileUploadBody> },
  TContext
> => {
  const mutationKey = ["postApiFileUpload"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiFileUpload>>,
    { data: BodyType<PostApiFileUploadBody> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiFileUpload(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiFileUploadMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiFileUpload>>
>;
export type PostApiFileUploadMutationBody = BodyType<PostApiFileUploadBody>;
export type PostApiFileUploadMutationError = ErrorType<
  PostApiFileUpload400 | PostApiFileUpload401 | PostApiFileUpload500
>;

/**
 * @summary Tải lên file (Yêu cầu quyền admin hoặc cộng tác viên)
 */
export const usePostApiFileUpload = <
  TError = ErrorType<
    PostApiFileUpload400 | PostApiFileUpload401 | PostApiFileUpload500
  >,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiFileUpload>>,
      TError,
      { data: BodyType<PostApiFileUploadBody> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiFileUpload>>,
  TError,
  { data: BodyType<PostApiFileUploadBody> },
  TContext
> => {
  const mutationOptions = getPostApiFileUploadMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * @summary Lấy danh sách tất cả file (Yêu cầu đăng nhập)
 */
export const getApiFile = (signal?: AbortSignal) => {
  return mainInstance<File[]>({ url: `/api/file`, method: "GET", signal });
};

export const getGetApiFileInfiniteQueryKey = () => {
  return ["infinite", `/api/file`] as const;
};

export const getGetApiFileQueryKey = () => {
  return [`/api/file`] as const;
};

export const getGetApiFileInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>,
  TError = ErrorType<GetApiFile401>
>(options?: {
  query?: Partial<
    UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getApiFile>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiFileInfiniteQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFile>>> = ({
    signal,
  }) => getApiFile(signal);

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiFile>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFile>>
>;
export type GetApiFileInfiniteQueryError = ErrorType<GetApiFile401>;

export function useGetApiFileInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>,
  TError = ErrorType<GetApiFile401>
>(
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFile>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>,
  TError = ErrorType<GetApiFile401>
>(
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFile>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>,
  TError = ErrorType<GetApiFile401>
>(
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFile>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy danh sách tất cả file (Yêu cầu đăng nhập)
 */

export function useGetApiFileInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>,
  TError = ErrorType<GetApiFile401>
>(
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFile>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileInfiniteQueryOptions(options);

  const query = useInfiniteQuery(
    queryOptions,
    queryClient
  ) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getGetApiFileQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiFile>>,
  TError = ErrorType<GetApiFile401>
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiFileQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFile>>> = ({
    signal,
  }) => getApiFile(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiFile>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFile>>
>;
export type GetApiFileQueryError = ErrorType<GetApiFile401>;

export function useGetApiFile<
  TData = Awaited<ReturnType<typeof getApiFile>>,
  TError = ErrorType<GetApiFile401>
>(
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFile<
  TData = Awaited<ReturnType<typeof getApiFile>>,
  TError = ErrorType<GetApiFile401>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFile<
  TData = Awaited<ReturnType<typeof getApiFile>>,
  TError = ErrorType<GetApiFile401>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy danh sách tất cả file (Yêu cầu đăng nhập)
 */

export function useGetApiFile<
  TData = Awaited<ReturnType<typeof getApiFile>>,
  TError = ErrorType<GetApiFile401>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * ## Yêu cầu
- Người dùng phải đăng nhập
- Đã thanh toán cho file (nếu file yêu cầu thanh toán)
- Giao dịch thanh toán còn hiệu lực
- Chưa vượt quá số lần tải xuống cho phép

 * @summary Tải xuống file (yêu cầu đăng nhập và thanh toán)
 */
export const getApiFileIdDownload = (id: string, signal?: AbortSignal) => {
  return mainInstance<Blob>({
    url: `/api/file/${id}/download`,
    method: "GET",
    responseType: "blob",
    signal,
  });
};

export const getGetApiFileIdDownloadInfiniteQueryKey = (id?: string) => {
  return ["infinite", `/api/file/${id}/download`] as const;
};

export const getGetApiFileIdDownloadQueryKey = (id?: string) => {
  return [`/api/file/${id}/download`] as const;
};

export const getGetApiFileIdDownloadInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiFileIdDownloadInfiniteQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiFileIdDownload>>
  > = ({ signal }) => getApiFileIdDownload(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiFileIdDownload>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileIdDownloadInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFileIdDownload>>
>;
export type GetApiFileIdDownloadInfiniteQueryError = ErrorType<
  ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
>;

export function useGetApiFileIdDownloadInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileIdDownloadInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileIdDownloadInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Tải xuống file (yêu cầu đăng nhập và thanh toán)
 */

export function useGetApiFileIdDownloadInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileIdDownloadInfiniteQueryOptions(id, options);

  const query = useInfiniteQuery(
    queryOptions,
    queryClient
  ) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getGetApiFileIdDownloadQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiFileIdDownload>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiFileIdDownloadQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiFileIdDownload>>
  > = ({ signal }) => getApiFileIdDownload(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiFileIdDownload>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileIdDownloadQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFileIdDownload>>
>;
export type GetApiFileIdDownloadQueryError = ErrorType<
  ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
>;

export function useGetApiFileIdDownload<
  TData = Awaited<ReturnType<typeof getApiFileIdDownload>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileIdDownload<
  TData = Awaited<ReturnType<typeof getApiFileIdDownload>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileIdDownload<
  TData = Awaited<ReturnType<typeof getApiFileIdDownload>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Tải xuống file (yêu cầu đăng nhập và thanh toán)
 */

export function useGetApiFileIdDownload<
  TData = Awaited<ReturnType<typeof getApiFileIdDownload>>,
  TError = ErrorType<
    ErrorResponse | PaymentRequiredResponse | GetApiFileIdDownload403
  >
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileIdDownload>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileIdDownloadQueryOptions(id, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Lấy thông tin chi tiết file (Yêu cầu đăng nhập)
 */
export const getApiFileId = (id: string, signal?: AbortSignal) => {
  return mainInstance<File>({ url: `/api/file/${id}`, method: "GET", signal });
};

export const getGetApiFileIdInfiniteQueryKey = (id?: string) => {
  return ["infinite", `/api/file/${id}`] as const;
};

export const getGetApiFileIdQueryKey = (id?: string) => {
  return [`/api/file/${id}`] as const;
};

export const getGetApiFileIdInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileId>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiFileIdInfiniteQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileId>>> = ({
    signal,
  }) => getApiFileId(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiFileId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileIdInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFileId>>
>;
export type GetApiFileIdInfiniteQueryError = ErrorType<void>;

export function useGetApiFileIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>,
  TError = ErrorType<void>
>(
  id: string,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileId>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy thông tin chi tiết file (Yêu cầu đăng nhập)
 */

export function useGetApiFileIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileId>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileIdInfiniteQueryOptions(id, options);

  const query = useInfiniteQuery(
    queryOptions,
    queryClient
  ) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getGetApiFileIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiFileId>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiFileIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileId>>> = ({
    signal,
  }) => getApiFileId(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiFileId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFileId>>
>;
export type GetApiFileIdQueryError = ErrorType<void>;

export function useGetApiFileId<
  TData = Awaited<ReturnType<typeof getApiFileId>>,
  TError = ErrorType<void>
>(
  id: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileId<
  TData = Awaited<ReturnType<typeof getApiFileId>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileId<
  TData = Awaited<ReturnType<typeof getApiFileId>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy thông tin chi tiết file (Yêu cầu đăng nhập)
 */

export function useGetApiFileId<
  TData = Awaited<ReturnType<typeof getApiFileId>>,
  TError = ErrorType<void>
>(
  id: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileIdQueryOptions(id, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Xóa file (Yêu cầu đăng nhập)
 */
export const deleteApiFileId = (id: string) => {
  return mainInstance<File>({ url: `/api/file/${id}`, method: "DELETE" });
};

export const getDeleteApiFileIdMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteApiFileId>>,
    TError,
    { id: string },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteApiFileId>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationKey = ["deleteApiFileId"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteApiFileId>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return deleteApiFileId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteApiFileIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteApiFileId>>
>;

export type DeleteApiFileIdMutationError = ErrorType<void>;

/**
 * @summary Xóa file (Yêu cầu đăng nhập)
 */
export const useDeleteApiFileId = <
  TError = ErrorType<void>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteApiFileId>>,
      TError,
      { id: string },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteApiFileId>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions = getDeleteApiFileIdMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * Lấy lịch sử tải xuống file.
- Người dùng thông thường chỉ xem được lịch sử của chính mình
- Admin và cộng tác viên xem được tất cả lịch sử

 * @summary Lấy lịch sử tải xuống
 */
export const getApiFileDownloadsHistory = (
  params?: GetApiFileDownloadsHistoryParams,
  signal?: AbortSignal
) => {
  return mainInstance<GetApiFileDownloadsHistory200>({
    url: `/api/file/downloads/history`,
    method: "GET",
    params,
    signal,
  });
};

export const getGetApiFileDownloadsHistoryInfiniteQueryKey = (
  params?: GetApiFileDownloadsHistoryParams
) => {
  return [
    "infinite",
    `/api/file/downloads/history`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiFileDownloadsHistoryQueryKey = (
  params?: GetApiFileDownloadsHistoryParams
) => {
  return [`/api/file/downloads/history`, ...(params ? [params] : [])] as const;
};

export const getGetApiFileDownloadsHistoryInfiniteQueryOptions = <
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    GetApiFileDownloadsHistoryParams["page"]
  >,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiFileDownloadsHistoryParams["page"]
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetApiFileDownloadsHistoryInfiniteQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    QueryKey,
    GetApiFileDownloadsHistoryParams["page"]
  > = ({ signal, pageParam }) =>
    getApiFileDownloadsHistory(
      { ...params, page: pageParam || params?.["page"] },
      signal
    );

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    TError,
    TData,
    QueryKey,
    GetApiFileDownloadsHistoryParams["page"]
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileDownloadsHistoryInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
>;
export type GetApiFileDownloadsHistoryInfiniteQueryError = ErrorType<void>;

export function useGetApiFileDownloadsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    GetApiFileDownloadsHistoryParams["page"]
  >,
  TError = ErrorType<void>
>(
  params: undefined | GetApiFileDownloadsHistoryParams,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiFileDownloadsHistoryParams["page"]
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          QueryKey
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileDownloadsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    GetApiFileDownloadsHistoryParams["page"]
  >,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiFileDownloadsHistoryParams["page"]
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          QueryKey
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileDownloadsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    GetApiFileDownloadsHistoryParams["page"]
  >,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiFileDownloadsHistoryParams["page"]
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy lịch sử tải xuống
 */

export function useGetApiFileDownloadsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    GetApiFileDownloadsHistoryParams["page"]
  >,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiFileDownloadsHistoryParams["page"]
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileDownloadsHistoryInfiniteQueryOptions(
    params,
    options
  );

  const query = useInfiniteQuery(
    queryOptions,
    queryClient
  ) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getGetApiFileDownloadsHistoryQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiFileDownloadsHistoryQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
  > = ({ signal }) => getApiFileDownloadsHistory(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiFileDownloadsHistoryQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
>;
export type GetApiFileDownloadsHistoryQueryError = ErrorType<void>;

export function useGetApiFileDownloadsHistory<
  TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
  TError = ErrorType<void>
>(
  params: undefined | GetApiFileDownloadsHistoryParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileDownloadsHistory<
  TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiFileDownloadsHistory<
  TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy lịch sử tải xuống
 */

export function useGetApiFileDownloadsHistory<
  TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
  TError = ErrorType<void>
>(
  params?: GetApiFileDownloadsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiFileDownloadsHistoryQueryOptions(
    params,
    options
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}
