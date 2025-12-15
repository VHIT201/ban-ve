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
  CreatePaymentInput,
  CreateSepayQrPaymentInput,
  CreateVnpayPaymentUrlInput,
  GetApiPaymentsHistory200,
  GetApiPaymentsHistoryParams,
  GetApiPaymentsPaymentId200,
  GetApiPaymentsVnpayReturnParams,
  PostApiPayments201,
  PostApiPaymentsSepayWebhook200,
  PostApiPaymentsWebhook200,
  PostApiPaymentsWebhookBody,
  SepayWebhookInput,
} from "../models";

import { mainInstance } from "../mutator/custom-instance";
import type { ErrorType, BodyType } from "../mutator/custom-instance";

/**
 * Payment gateway sẽ gọi endpoint này để cập nhật trạng thái thanh toán và đơn hàng.
 * @summary Endpoint nhận thông báo Webhook từ payment gateway
 */
export const postApiPaymentsWebhook = (
  postApiPaymentsWebhookBody: BodyType<PostApiPaymentsWebhookBody>,
  signal?: AbortSignal
) => {
  return mainInstance<PostApiPaymentsWebhook200>({
    url: `/api/payments/webhook`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: postApiPaymentsWebhookBody,
    signal,
  });
};

export const getPostApiPaymentsWebhookMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiPaymentsWebhook>>,
    TError,
    { data: BodyType<PostApiPaymentsWebhookBody> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiPaymentsWebhook>>,
  TError,
  { data: BodyType<PostApiPaymentsWebhookBody> },
  TContext
> => {
  const mutationKey = ["postApiPaymentsWebhook"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiPaymentsWebhook>>,
    { data: BodyType<PostApiPaymentsWebhookBody> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiPaymentsWebhook(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiPaymentsWebhookMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiPaymentsWebhook>>
>;
export type PostApiPaymentsWebhookMutationBody =
  BodyType<PostApiPaymentsWebhookBody>;
export type PostApiPaymentsWebhookMutationError = ErrorType<void>;

/**
 * @summary Endpoint nhận thông báo Webhook từ payment gateway
 */
export const usePostApiPaymentsWebhook = <
  TError = ErrorType<void>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiPaymentsWebhook>>,
      TError,
      { data: BodyType<PostApiPaymentsWebhookBody> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiPaymentsWebhook>>,
  TError,
  { data: BodyType<PostApiPaymentsWebhookBody> },
  TContext
> => {
  const mutationOptions = getPostApiPaymentsWebhookMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * SePay sẽ gọi endpoint này để cập nhật trạng thái thanh toán.
 * @summary Endpoint nhận thông báo Webhook từ SePay
 */
export const postApiPaymentsSepayWebhook = (
  sepayWebhookInput: BodyType<SepayWebhookInput>,
  signal?: AbortSignal
) => {
  return mainInstance<PostApiPaymentsSepayWebhook200>({
    url: `/api/payments/sepay/webhook`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: sepayWebhookInput,
    signal,
  });
};

export const getPostApiPaymentsSepayWebhookMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiPaymentsSepayWebhook>>,
    TError,
    { data: BodyType<SepayWebhookInput> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiPaymentsSepayWebhook>>,
  TError,
  { data: BodyType<SepayWebhookInput> },
  TContext
> => {
  const mutationKey = ["postApiPaymentsSepayWebhook"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiPaymentsSepayWebhook>>,
    { data: BodyType<SepayWebhookInput> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiPaymentsSepayWebhook(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiPaymentsSepayWebhookMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiPaymentsSepayWebhook>>
>;
export type PostApiPaymentsSepayWebhookMutationBody =
  BodyType<SepayWebhookInput>;
export type PostApiPaymentsSepayWebhookMutationError = ErrorType<void>;

/**
 * @summary Endpoint nhận thông báo Webhook từ SePay
 */
export const usePostApiPaymentsSepayWebhook = <
  TError = ErrorType<void>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiPaymentsSepayWebhook>>,
      TError,
      { data: BodyType<SepayWebhookInput> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiPaymentsSepayWebhook>>,
  TError,
  { data: BodyType<SepayWebhookInput> },
  TContext
> => {
  const mutationOptions =
    getPostApiPaymentsSepayWebhookMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * @summary Tạo yêu cầu thanh toán mới
 */
export const postApiPayments = (
  createPaymentInput: BodyType<CreatePaymentInput>,
  signal?: AbortSignal
) => {
  return mainInstance<PostApiPayments201>({
    url: `/api/payments`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createPaymentInput,
    signal,
  });
};

export const getPostApiPaymentsMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiPayments>>,
    TError,
    { data: BodyType<CreatePaymentInput> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiPayments>>,
  TError,
  { data: BodyType<CreatePaymentInput> },
  TContext
> => {
  const mutationKey = ["postApiPayments"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiPayments>>,
    { data: BodyType<CreatePaymentInput> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiPayments(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiPaymentsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiPayments>>
>;
export type PostApiPaymentsMutationBody = BodyType<CreatePaymentInput>;
export type PostApiPaymentsMutationError = ErrorType<unknown>;

/**
 * @summary Tạo yêu cầu thanh toán mới
 */
export const usePostApiPayments = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiPayments>>,
      TError,
      { data: BodyType<CreatePaymentInput> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiPayments>>,
  TError,
  { data: BodyType<CreatePaymentInput> },
  TContext
> => {
  const mutationOptions = getPostApiPaymentsMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * @summary Tạo URL QR thanh toán SePay trực tiếp
 */
export const postApiPaymentsSepayCreateQrPayment = (
  createSepayQrPaymentInput: BodyType<CreateSepayQrPaymentInput>,
  signal?: AbortSignal
) => {
  return mainInstance<string>({
    url: `/api/payments/sepay/create-qr-payment`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createSepayQrPaymentInput,
    signal,
  });
};

export const getPostApiPaymentsSepayCreateQrPaymentMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiPaymentsSepayCreateQrPayment>>,
    TError,
    { data: BodyType<CreateSepayQrPaymentInput> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiPaymentsSepayCreateQrPayment>>,
  TError,
  { data: BodyType<CreateSepayQrPaymentInput> },
  TContext
> => {
  const mutationKey = ["postApiPaymentsSepayCreateQrPayment"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiPaymentsSepayCreateQrPayment>>,
    { data: BodyType<CreateSepayQrPaymentInput> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiPaymentsSepayCreateQrPayment(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiPaymentsSepayCreateQrPaymentMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiPaymentsSepayCreateQrPayment>>
>;
export type PostApiPaymentsSepayCreateQrPaymentMutationBody =
  BodyType<CreateSepayQrPaymentInput>;
export type PostApiPaymentsSepayCreateQrPaymentMutationError =
  ErrorType<unknown>;

/**
 * @summary Tạo URL QR thanh toán SePay trực tiếp
 */
export const usePostApiPaymentsSepayCreateQrPayment = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiPaymentsSepayCreateQrPayment>>,
      TError,
      { data: BodyType<CreateSepayQrPaymentInput> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiPaymentsSepayCreateQrPayment>>,
  TError,
  { data: BodyType<CreateSepayQrPaymentInput> },
  TContext
> => {
  const mutationOptions =
    getPostApiPaymentsSepayCreateQrPaymentMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * @summary Tạo URL thanh toán VNPAY trực tiếp
 */
export const postApiPaymentsVnpayCreatePaymentUrl = (
  createVnpayPaymentUrlInput: BodyType<CreateVnpayPaymentUrlInput>,
  signal?: AbortSignal
) => {
  return mainInstance<string>({
    url: `/api/payments/vnpay/create-payment-url`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createVnpayPaymentUrlInput,
    signal,
  });
};

export const getPostApiPaymentsVnpayCreatePaymentUrlMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiPaymentsVnpayCreatePaymentUrl>>,
    TError,
    { data: BodyType<CreateVnpayPaymentUrlInput> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiPaymentsVnpayCreatePaymentUrl>>,
  TError,
  { data: BodyType<CreateVnpayPaymentUrlInput> },
  TContext
> => {
  const mutationKey = ["postApiPaymentsVnpayCreatePaymentUrl"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiPaymentsVnpayCreatePaymentUrl>>,
    { data: BodyType<CreateVnpayPaymentUrlInput> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiPaymentsVnpayCreatePaymentUrl(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiPaymentsVnpayCreatePaymentUrlMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiPaymentsVnpayCreatePaymentUrl>>
>;
export type PostApiPaymentsVnpayCreatePaymentUrlMutationBody =
  BodyType<CreateVnpayPaymentUrlInput>;
export type PostApiPaymentsVnpayCreatePaymentUrlMutationError =
  ErrorType<unknown>;

/**
 * @summary Tạo URL thanh toán VNPAY trực tiếp
 */
export const usePostApiPaymentsVnpayCreatePaymentUrl = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiPaymentsVnpayCreatePaymentUrl>>,
      TError,
      { data: BodyType<CreateVnpayPaymentUrlInput> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiPaymentsVnpayCreatePaymentUrl>>,
  TError,
  { data: BodyType<CreateVnpayPaymentUrlInput> },
  TContext
> => {
  const mutationOptions =
    getPostApiPaymentsVnpayCreatePaymentUrlMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * @summary Xử lý kết quả thanh toán từ VNPAY
 */
export const getApiPaymentsVnpayReturn = (
  params?: GetApiPaymentsVnpayReturnParams,
  signal?: AbortSignal
) => {
  return mainInstance<void>({
    url: `/api/payments/vnpay/return`,
    method: "GET",
    params,
    signal,
  });
};

export const getGetApiPaymentsVnpayReturnInfiniteQueryKey = (
  params?: GetApiPaymentsVnpayReturnParams
) => {
  return [
    "infinite",
    `/api/payments/vnpay/return`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiPaymentsVnpayReturnQueryKey = (
  params?: GetApiPaymentsVnpayReturnParams
) => {
  return [`/api/payments/vnpay/return`, ...(params ? [params] : [])] as const;
};

export const getGetApiPaymentsVnpayReturnInfiniteQueryOptions = <
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    GetApiPaymentsVnpayReturnParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsVnpayReturnParams["page"]
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetApiPaymentsVnpayReturnInfiniteQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    QueryKey,
    GetApiPaymentsVnpayReturnParams["page"]
  > = ({ signal, pageParam }) =>
    getApiPaymentsVnpayReturn(
      { ...params, page: pageParam || params?.["page"] },
      signal
    );

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    TError,
    TData,
    QueryKey,
    GetApiPaymentsVnpayReturnParams["page"]
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiPaymentsVnpayReturnInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>
>;
export type GetApiPaymentsVnpayReturnInfiniteQueryError = ErrorType<unknown>;

export function useGetApiPaymentsVnpayReturnInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    GetApiPaymentsVnpayReturnParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params: undefined | GetApiPaymentsVnpayReturnParams,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsVnpayReturnParams["page"]
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
          QueryKey
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsVnpayReturnInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    GetApiPaymentsVnpayReturnParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsVnpayReturnParams["page"]
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
          QueryKey
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsVnpayReturnInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    GetApiPaymentsVnpayReturnParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsVnpayReturnParams["page"]
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Xử lý kết quả thanh toán từ VNPAY
 */

export function useGetApiPaymentsVnpayReturnInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    GetApiPaymentsVnpayReturnParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsVnpayReturnParams["page"]
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiPaymentsVnpayReturnInfiniteQueryOptions(
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

export const getGetApiPaymentsVnpayReturnQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiPaymentsVnpayReturnQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>
  > = ({ signal }) => getApiPaymentsVnpayReturn(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiPaymentsVnpayReturnQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>
>;
export type GetApiPaymentsVnpayReturnQueryError = ErrorType<unknown>;

export function useGetApiPaymentsVnpayReturn<
  TData = Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
  TError = ErrorType<unknown>
>(
  params: undefined | GetApiPaymentsVnpayReturnParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsVnpayReturn<
  TData = Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsVnpayReturn<
  TData = Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
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
 * @summary Xử lý kết quả thanh toán từ VNPAY
 */

export function useGetApiPaymentsVnpayReturn<
  TData = Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsVnpayReturnParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsVnpayReturn>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiPaymentsVnpayReturnQueryOptions(
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

/**
 * @summary Lấy thông tin chi tiết thanh toán
 */
export const getApiPaymentsPaymentId = (
  paymentId: string,
  signal?: AbortSignal
) => {
  return mainInstance<GetApiPaymentsPaymentId200>({
    url: `/api/payments/${paymentId}`,
    method: "GET",
    signal,
  });
};

export const getGetApiPaymentsPaymentIdInfiniteQueryKey = (
  paymentId?: string
) => {
  return ["infinite", `/api/payments/${paymentId}`] as const;
};

export const getGetApiPaymentsPaymentIdQueryKey = (paymentId?: string) => {
  return [`/api/payments/${paymentId}`] as const;
};

export const getGetApiPaymentsPaymentIdInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetApiPaymentsPaymentIdInfiniteQueryKey(paymentId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
  > = ({ signal }) => getApiPaymentsPaymentId(paymentId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!paymentId,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiPaymentsPaymentIdInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
>;
export type GetApiPaymentsPaymentIdInfiniteQueryError = ErrorType<unknown>;

export function useGetApiPaymentsPaymentIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsPaymentIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsPaymentIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
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
 * @summary Lấy thông tin chi tiết thanh toán
 */

export function useGetApiPaymentsPaymentIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiPaymentsPaymentIdInfiniteQueryOptions(
    paymentId,
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

export const getGetApiPaymentsPaymentIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiPaymentsPaymentIdQueryKey(paymentId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
  > = ({ signal }) => getApiPaymentsPaymentId(paymentId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!paymentId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiPaymentsPaymentIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
>;
export type GetApiPaymentsPaymentIdQueryError = ErrorType<unknown>;

export function useGetApiPaymentsPaymentId<
  TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsPaymentId<
  TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsPaymentId<
  TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
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
 * @summary Lấy thông tin chi tiết thanh toán
 */

export function useGetApiPaymentsPaymentId<
  TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
  TError = ErrorType<unknown>
>(
  paymentId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiPaymentsPaymentIdQueryOptions(
    paymentId,
    options
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Lấy lịch sử thanh toán của người dùng
 */
export const getApiPaymentsHistory = (
  params?: GetApiPaymentsHistoryParams,
  signal?: AbortSignal
) => {
  return mainInstance<GetApiPaymentsHistory200>({
    url: `/api/payments/history`,
    method: "GET",
    params,
    signal,
  });
};

export const getGetApiPaymentsHistoryInfiniteQueryKey = (
  params?: GetApiPaymentsHistoryParams
) => {
  return [
    "infinite",
    `/api/payments/history`,
    ...(params ? [params] : []),
  ] as const;
};

export const getGetApiPaymentsHistoryQueryKey = (
  params?: GetApiPaymentsHistoryParams
) => {
  return [`/api/payments/history`, ...(params ? [params] : [])] as const;
};

export const getGetApiPaymentsHistoryInfiniteQueryOptions = <
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    GetApiPaymentsHistoryParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsHistoryParams["page"]
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiPaymentsHistoryInfiniteQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    QueryKey,
    GetApiPaymentsHistoryParams["page"]
  > = ({ signal, pageParam }) =>
    getApiPaymentsHistory(
      { ...params, page: pageParam || params?.["page"] },
      signal
    );

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    TError,
    TData,
    QueryKey,
    GetApiPaymentsHistoryParams["page"]
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiPaymentsHistoryInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiPaymentsHistory>>
>;
export type GetApiPaymentsHistoryInfiniteQueryError = ErrorType<unknown>;

export function useGetApiPaymentsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    GetApiPaymentsHistoryParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params: undefined | GetApiPaymentsHistoryParams,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsHistoryParams["page"]
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          QueryKey
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    GetApiPaymentsHistoryParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsHistoryParams["page"]
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          QueryKey
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    GetApiPaymentsHistoryParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsHistoryParams["page"]
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy lịch sử thanh toán của người dùng
 */

export function useGetApiPaymentsHistoryInfinite<
  TData = InfiniteData<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    GetApiPaymentsHistoryParams["page"]
  >,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData,
        QueryKey,
        GetApiPaymentsHistoryParams["page"]
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiPaymentsHistoryInfiniteQueryOptions(
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

export const getGetApiPaymentsHistoryQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiPaymentsHistoryQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>
  > = ({ signal }) => getApiPaymentsHistory(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiPaymentsHistory>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiPaymentsHistoryQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiPaymentsHistory>>
>;
export type GetApiPaymentsHistoryQueryError = ErrorType<unknown>;

export function useGetApiPaymentsHistory<
  TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>,
  TError = ErrorType<unknown>
>(
  params: undefined | GetApiPaymentsHistoryParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsHistory<
  TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiPaymentsHistory<
  TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
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
 * @summary Lấy lịch sử thanh toán của người dùng
 */

export function useGetApiPaymentsHistory<
  TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>,
  TError = ErrorType<unknown>
>(
  params?: GetApiPaymentsHistoryParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiPaymentsHistory>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiPaymentsHistoryQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}
