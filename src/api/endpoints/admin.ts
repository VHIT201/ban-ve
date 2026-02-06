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
  GetApiAdminStats200,
  GetApiAdminStatsParams
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType } from '../mutator/custom-instance';





/**
 * @summary Lấy thống kê tổng quan
 */
export const getApiAdminStats = (
    params?: GetApiAdminStatsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiAdminStats200>(
      {url: `/api/admin/stats`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiAdminStatsInfiniteQueryKey = (params?: GetApiAdminStatsParams,) => {
    return [
    'infinite', `/api/admin/stats`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiAdminStatsQueryKey = (params?: GetApiAdminStatsParams,) => {
    return [
    `/api/admin/stats`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiAdminStatsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>, GetApiAdminStatsParams['page']>, TError = ErrorType<unknown>>(params?: GetApiAdminStatsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData, QueryKey, GetApiAdminStatsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAdminStatsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminStats>>, QueryKey, GetApiAdminStatsParams['page']> = ({ signal, pageParam }) => getApiAdminStats({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData, QueryKey, GetApiAdminStatsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAdminStatsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAdminStats>>>
export type GetApiAdminStatsInfiniteQueryError = ErrorType<unknown>


export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>, GetApiAdminStatsParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiAdminStatsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData, QueryKey, GetApiAdminStatsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>, GetApiAdminStatsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiAdminStatsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData, QueryKey, GetApiAdminStatsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>, GetApiAdminStatsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiAdminStatsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData, QueryKey, GetApiAdminStatsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê tổng quan
 */

export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>, GetApiAdminStatsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiAdminStatsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData, QueryKey, GetApiAdminStatsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAdminStatsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiAdminStatsQueryOptions = <TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(params?: GetApiAdminStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAdminStatsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminStats>>> = ({ signal }) => getApiAdminStats(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAdminStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAdminStats>>>
export type GetApiAdminStatsQueryError = ErrorType<unknown>


export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiAdminStatsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
 params?: GetApiAdminStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
 params?: GetApiAdminStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê tổng quan
 */

export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
 params?: GetApiAdminStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAdminStatsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




