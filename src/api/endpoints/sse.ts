// @ts-nocheck
import {
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  InfiniteData,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  GetApiSseCheckPaymentStatus200,
  GetApiSseCheckPaymentStatus400,
  GetApiSseCheckPaymentStatusParams,
  GetApiSseConnectParams
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType } from '../mutator/custom-instance';





/**
 * Kết nối Server-Sent Events để nhận các thông báo real-time từ hệ thống.
Có thể sử dụng để theo dõi trạng thái thanh toán thời gian thực.

 * @summary Kết nối SSE để nhận thông báo real-time
 */
export const getApiSseConnect = (
    params?: GetApiSseConnectParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<string>(
      {url: `/api/sse/connect`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiSseConnectInfiniteQueryKey = (params?: GetApiSseConnectParams,) => {
    return [
    'infinite', `/api/sse/connect`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiSseConnectQueryKey = (params?: GetApiSseConnectParams,) => {
    return [
    `/api/sse/connect`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiSseConnectInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiSseConnect>>, GetApiSseConnectParams['page']>, TError = ErrorType<void>>(params?: GetApiSseConnectParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData, QueryKey, GetApiSseConnectParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSseConnectInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSseConnect>>, QueryKey, GetApiSseConnectParams['page']> = ({ signal, pageParam }) => getApiSseConnect({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData, QueryKey, GetApiSseConnectParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSseConnectInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSseConnect>>>
export type GetApiSseConnectInfiniteQueryError = ErrorType<void>


export function useGetApiSseConnectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseConnect>>, GetApiSseConnectParams['page']>, TError = ErrorType<void>>(
 params: undefined |  GetApiSseConnectParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData, QueryKey, GetApiSseConnectParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseConnect>>,
          TError,
          Awaited<ReturnType<typeof getApiSseConnect>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseConnectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseConnect>>, GetApiSseConnectParams['page']>, TError = ErrorType<void>>(
 params?: GetApiSseConnectParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData, QueryKey, GetApiSseConnectParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseConnect>>,
          TError,
          Awaited<ReturnType<typeof getApiSseConnect>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseConnectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseConnect>>, GetApiSseConnectParams['page']>, TError = ErrorType<void>>(
 params?: GetApiSseConnectParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData, QueryKey, GetApiSseConnectParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Kết nối SSE để nhận thông báo real-time
 */

export function useGetApiSseConnectInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseConnect>>, GetApiSseConnectParams['page']>, TError = ErrorType<void>>(
 params?: GetApiSseConnectParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData, QueryKey, GetApiSseConnectParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSseConnectInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiSseConnectQueryOptions = <TData = Awaited<ReturnType<typeof getApiSseConnect>>, TError = ErrorType<void>>(params?: GetApiSseConnectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSseConnectQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSseConnect>>> = ({ signal }) => getApiSseConnect(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSseConnectQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSseConnect>>>
export type GetApiSseConnectQueryError = ErrorType<void>


export function useGetApiSseConnect<TData = Awaited<ReturnType<typeof getApiSseConnect>>, TError = ErrorType<void>>(
 params: undefined |  GetApiSseConnectParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseConnect>>,
          TError,
          Awaited<ReturnType<typeof getApiSseConnect>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseConnect<TData = Awaited<ReturnType<typeof getApiSseConnect>>, TError = ErrorType<void>>(
 params?: GetApiSseConnectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseConnect>>,
          TError,
          Awaited<ReturnType<typeof getApiSseConnect>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseConnect<TData = Awaited<ReturnType<typeof getApiSseConnect>>, TError = ErrorType<void>>(
 params?: GetApiSseConnectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Kết nối SSE để nhận thông báo real-time
 */

export function useGetApiSseConnect<TData = Awaited<ReturnType<typeof getApiSseConnect>>, TError = ErrorType<void>>(
 params?: GetApiSseConnectParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseConnect>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSseConnectQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Kiểm tra xem user đã chuyển khoản thành công hay chưa.
API này trả về trạng thái hiện tại của giao dịch thanh toán.

 * @summary Kiểm tra trạng thái thanh toán
 */
export const getApiSseCheckPaymentStatus = (
    params: GetApiSseCheckPaymentStatusParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiSseCheckPaymentStatus200>(
      {url: `/api/sse/check-payment-status`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiSseCheckPaymentStatusInfiniteQueryKey = (params?: GetApiSseCheckPaymentStatusParams,) => {
    return [
    'infinite', `/api/sse/check-payment-status`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiSseCheckPaymentStatusQueryKey = (params?: GetApiSseCheckPaymentStatusParams,) => {
    return [
    `/api/sse/check-payment-status`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiSseCheckPaymentStatusInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, GetApiSseCheckPaymentStatusParams['page']>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData, QueryKey, GetApiSseCheckPaymentStatusParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSseCheckPaymentStatusInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, QueryKey, GetApiSseCheckPaymentStatusParams['page']> = ({ signal, pageParam }) => getApiSseCheckPaymentStatus({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData, QueryKey, GetApiSseCheckPaymentStatusParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSseCheckPaymentStatusInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>>
export type GetApiSseCheckPaymentStatusInfiniteQueryError = ErrorType<GetApiSseCheckPaymentStatus400 | void>


export function useGetApiSseCheckPaymentStatusInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, GetApiSseCheckPaymentStatusParams['page']>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData, QueryKey, GetApiSseCheckPaymentStatusParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>,
          TError,
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseCheckPaymentStatusInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, GetApiSseCheckPaymentStatusParams['page']>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData, QueryKey, GetApiSseCheckPaymentStatusParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>,
          TError,
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseCheckPaymentStatusInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, GetApiSseCheckPaymentStatusParams['page']>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData, QueryKey, GetApiSseCheckPaymentStatusParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Kiểm tra trạng thái thanh toán
 */

export function useGetApiSseCheckPaymentStatusInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, GetApiSseCheckPaymentStatusParams['page']>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData, QueryKey, GetApiSseCheckPaymentStatusParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSseCheckPaymentStatusInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiSseCheckPaymentStatusQueryOptions = <TData = Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSseCheckPaymentStatusQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>> = ({ signal }) => getApiSseCheckPaymentStatus(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSseCheckPaymentStatusQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>>
export type GetApiSseCheckPaymentStatusQueryError = ErrorType<GetApiSseCheckPaymentStatus400 | void>


export function useGetApiSseCheckPaymentStatus<TData = Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>,
          TError,
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseCheckPaymentStatus<TData = Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>,
          TError,
          Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSseCheckPaymentStatus<TData = Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Kiểm tra trạng thái thanh toán
 */

export function useGetApiSseCheckPaymentStatus<TData = Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError = ErrorType<GetApiSseCheckPaymentStatus400 | void>>(
 params: GetApiSseCheckPaymentStatusParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSseCheckPaymentStatus>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSseCheckPaymentStatusQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




