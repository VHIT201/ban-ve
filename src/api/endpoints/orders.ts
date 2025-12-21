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
  CreateOrderInput,
  GetApiOrders200,
  GetApiOrdersOrderId200,
  PostApiOrders201,
} from "../models";

import { mainInstance } from "../mutator/custom-instance";
import type { ErrorType, BodyType } from "../mutator/custom-instance";

/**
 * @summary Tạo đơn hàng mới
 */
export const postApiOrders = (
  createOrderInput: BodyType<CreateOrderInput>,
  signal?: AbortSignal
) => {
  return mainInstance<PostApiOrders201>({
    url: `/api/orders`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: createOrderInput,
    signal,
  });
};

export const getPostApiOrdersMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiOrders>>,
    TError,
    { data: BodyType<CreateOrderInput> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postApiOrders>>,
  TError,
  { data: BodyType<CreateOrderInput> },
  TContext
> => {
  const mutationKey = ["postApiOrders"];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiOrders>>,
    { data: BodyType<CreateOrderInput> }
  > = (props) => {
    const { data } = props ?? {};

    return postApiOrders(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostApiOrdersMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiOrders>>
>;
export type PostApiOrdersMutationBody = BodyType<CreateOrderInput>;
export type PostApiOrdersMutationError = ErrorType<void>;

/**
 * @summary Tạo đơn hàng mới
 */
export const usePostApiOrders = <TError = ErrorType<void>, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postApiOrders>>,
      TError,
      { data: BodyType<CreateOrderInput> },
      TContext
    >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postApiOrders>>,
  TError,
  { data: BodyType<CreateOrderInput> },
  TContext
> => {
  const mutationOptions = getPostApiOrdersMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
/**
 * @summary Lấy danh sách đơn hàng
 */
export const getApiOrders = (signal?: AbortSignal) => {
  return mainInstance<GetApiOrders200>({
    url: `/api/orders`,
    method: "GET",
    signal,
  });
};

export const getGetApiOrdersInfiniteQueryKey = () => {
  return ["infinite", `/api/orders`] as const;
};

export const getGetApiOrdersQueryKey = () => {
  return [`/api/orders`] as const;
};

export const getGetApiOrdersInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrders>>>,
  TError = ErrorType<void>
>(options?: {
  query?: Partial<
    UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getApiOrders>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiOrdersInfiniteQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiOrders>>> = ({
    signal,
  }) => getApiOrders(signal);

  return { queryKey, queryFn, ...queryOptions } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiOrders>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiOrdersInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiOrders>>
>;
export type GetApiOrdersInfiniteQueryError = ErrorType<void>;

export function useGetApiOrdersInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrders>>>,
  TError = ErrorType<void>
>(
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrders>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiOrders>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrdersInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrders>>>,
  TError = ErrorType<void>
>(
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrders>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiOrders>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrdersInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrders>>>,
  TError = ErrorType<void>
>(
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrders>>,
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
 * @summary Lấy danh sách đơn hàng
 */

export function useGetApiOrdersInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrders>>>,
  TError = ErrorType<void>
>(
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrders>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiOrdersInfiniteQueryOptions(options);

  const query = useInfiniteQuery(
    queryOptions,
    queryClient
  ) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const getGetApiOrdersQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiOrders>>,
  TError = ErrorType<void>
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getApiOrders>>, TError, TData>
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetApiOrdersQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiOrders>>> = ({
    signal,
  }) => getApiOrders(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiOrders>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiOrdersQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiOrders>>
>;
export type GetApiOrdersQueryError = ErrorType<void>;

export function useGetApiOrders<
  TData = Awaited<ReturnType<typeof getApiOrders>>,
  TError = ErrorType<void>
>(
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiOrders>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiOrders>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrders<
  TData = Awaited<ReturnType<typeof getApiOrders>>,
  TError = ErrorType<void>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiOrders>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrders>>,
          TError,
          Awaited<ReturnType<typeof getApiOrders>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrders<
  TData = Awaited<ReturnType<typeof getApiOrders>>,
  TError = ErrorType<void>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiOrders>>, TError, TData>
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Lấy danh sách đơn hàng
 */

export function useGetApiOrders<
  TData = Awaited<ReturnType<typeof getApiOrders>>,
  TError = ErrorType<void>
>(
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getApiOrders>>, TError, TData>
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiOrdersQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Lấy thông tin đơn hàng theo ID
 */
export const getApiOrdersOrderId = (orderId: string, signal?: AbortSignal) => {
  return mainInstance<GetApiOrdersOrderId200>({
    url: `/api/orders/${orderId}`,
    method: "GET",
    signal,
  });
};

export const getGetApiOrdersOrderIdInfiniteQueryKey = (orderId?: string) => {
  return ["infinite", `/api/orders/${orderId}`] as const;
};

export const getGetApiOrdersOrderIdQueryKey = (orderId?: string) => {
  return [`/api/orders/${orderId}`] as const;
};

export const getGetApiOrdersOrderIdInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrdersOrderId>>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiOrdersOrderIdInfiniteQueryKey(orderId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiOrdersOrderId>>
  > = ({ signal }) => getApiOrdersOrderId(orderId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!orderId,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiOrdersOrderId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiOrdersOrderIdInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiOrdersOrderId>>
>;
export type GetApiOrdersOrderIdInfiniteQueryError = ErrorType<void>;

export function useGetApiOrdersOrderIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrdersOrderId>>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options: {
    query: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrdersOrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiOrdersOrderId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrdersOrderIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrdersOrderId>>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrdersOrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiOrdersOrderId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrdersOrderIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrdersOrderId>>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
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
 * @summary Lấy thông tin đơn hàng theo ID
 */

export function useGetApiOrdersOrderIdInfinite<
  TData = InfiniteData<Awaited<ReturnType<typeof getApiOrdersOrderId>>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseInfiniteQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiOrdersOrderIdInfiniteQueryOptions(
    orderId,
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

export const getGetApiOrdersOrderIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiOrdersOrderId>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetApiOrdersOrderIdQueryKey(orderId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getApiOrdersOrderId>>
  > = ({ signal }) => getApiOrdersOrderId(orderId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!orderId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiOrdersOrderId>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiOrdersOrderIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiOrdersOrderId>>
>;
export type GetApiOrdersOrderIdQueryError = ErrorType<void>;

export function useGetApiOrdersOrderId<
  TData = Awaited<ReturnType<typeof getApiOrdersOrderId>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrdersOrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiOrdersOrderId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrdersOrderId<
  TData = Awaited<ReturnType<typeof getApiOrdersOrderId>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiOrdersOrderId>>,
          TError,
          Awaited<ReturnType<typeof getApiOrdersOrderId>>
        >,
        "initialData"
      >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetApiOrdersOrderId<
  TData = Awaited<ReturnType<typeof getApiOrdersOrderId>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
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
 * @summary Lấy thông tin đơn hàng theo ID
 */

export function useGetApiOrdersOrderId<
  TData = Awaited<ReturnType<typeof getApiOrdersOrderId>>,
  TError = ErrorType<void>
>(
  orderId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getApiOrdersOrderId>>,
        TError,
        TData
      >
    >;
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetApiOrdersOrderIdQueryOptions(orderId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}
