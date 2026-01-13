// @ts-nocheck
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query';
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
  UseQueryResult
} from '@tanstack/react-query';

import type {
  Content,
  GetApiContent200,
  GetApiContentAll200,
  GetApiContentAllParams,
  GetApiContentCategoriesIdContents200,
  GetApiContentMyContents200,
  GetApiContentMyContentsParams,
  GetApiContentParams,
  GetApiContentStatisticsDownloadRanking200,
  GetApiContentStatisticsDownloadRankingParams,
  GetApiContentStatisticsPurchaseRanking200,
  GetApiContentStatisticsPurchaseRankingParams,
  PostApiContentUploadBody,
  PutApiContentIdBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * Lấy danh sách nội dung với các bộ lọc tùy chọn. Mặc định chỉ lấy nội dung đã được duyệt.
 * @summary Lấy danh sách nội dung
 */
export const getApiContent = (
    params?: GetApiContentParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContent200>(
      {url: `/api/content`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiContentInfiniteQueryKey = (params?: GetApiContentParams,) => {
    return [
    'infinite', `/api/content`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContentQueryKey = (params?: GetApiContentParams,) => {
    return [
    `/api/content`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContentInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContent>>, GetApiContentParams['page']>, TError = ErrorType<unknown>>(params?: GetApiContentParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData, QueryKey, GetApiContentParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContent>>, QueryKey, GetApiContentParams['page']> = ({ signal, pageParam }) => getApiContent({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData, QueryKey, GetApiContentParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContent>>>
export type GetApiContentInfiniteQueryError = ErrorType<unknown>


export function useGetApiContentInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContent>>, GetApiContentParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContentParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData, QueryKey, GetApiContentParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContent>>,
          TError,
          Awaited<ReturnType<typeof getApiContent>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContent>>, GetApiContentParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData, QueryKey, GetApiContentParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContent>>,
          TError,
          Awaited<ReturnType<typeof getApiContent>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContent>>, GetApiContentParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData, QueryKey, GetApiContentParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung
 */

export function useGetApiContentInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContent>>, GetApiContentParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData, QueryKey, GetApiContentParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentQueryOptions = <TData = Awaited<ReturnType<typeof getApiContent>>, TError = ErrorType<unknown>>(params?: GetApiContentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContent>>> = ({ signal }) => getApiContent(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContent>>>
export type GetApiContentQueryError = ErrorType<unknown>


export function useGetApiContent<TData = Awaited<ReturnType<typeof getApiContent>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContentParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContent>>,
          TError,
          Awaited<ReturnType<typeof getApiContent>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContent<TData = Awaited<ReturnType<typeof getApiContent>>, TError = ErrorType<unknown>>(
 params?: GetApiContentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContent>>,
          TError,
          Awaited<ReturnType<typeof getApiContent>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContent<TData = Awaited<ReturnType<typeof getApiContent>>, TError = ErrorType<unknown>>(
 params?: GetApiContentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung
 */

export function useGetApiContent<TData = Awaited<ReturnType<typeof getApiContent>>, TError = ErrorType<unknown>>(
 params?: GetApiContentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContent>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Lấy danh sách nội dung thuộc về một danh mục cụ thể
 * @summary Lấy danh sách nội dung theo danh mục
 */
export const getApiContentCategoriesIdContents = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContentCategoriesIdContents200>(
      {url: `/api/content/categories/${id}/contents`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiContentCategoriesIdContentsInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/content/categories/${id}/contents`
    ] as const;
    }

export const getGetApiContentCategoriesIdContentsQueryKey = (id?: string,) => {
    return [
    `/api/content/categories/${id}/contents`
    ] as const;
    }

    
export const getGetApiContentCategoriesIdContentsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentCategoriesIdContentsInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>> = ({ signal }) => getApiContentCategoriesIdContents(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentCategoriesIdContentsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>
export type GetApiContentCategoriesIdContentsInfiniteQueryError = ErrorType<unknown>


export function useGetApiContentCategoriesIdContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentCategoriesIdContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentCategoriesIdContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung theo danh mục
 */

export function useGetApiContentCategoriesIdContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentCategoriesIdContentsInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentCategoriesIdContentsQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentCategoriesIdContentsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>> = ({ signal }) => getApiContentCategoriesIdContents(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentCategoriesIdContentsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>>
export type GetApiContentCategoriesIdContentsQueryError = ErrorType<unknown>


export function useGetApiContentCategoriesIdContents<TData = Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentCategoriesIdContents<TData = Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentCategoriesIdContents<TData = Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung theo danh mục
 */

export function useGetApiContentCategoriesIdContents<TData = Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentCategoriesIdContents>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentCategoriesIdContentsQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Thống kê và xếp hạng các content theo số lượt mua (số người mua)
 * @summary Lấy thống kê xếp hạng lượt mua
 */
export const getApiContentStatisticsPurchaseRanking = (
    params?: GetApiContentStatisticsPurchaseRankingParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContentStatisticsPurchaseRanking200>(
      {url: `/api/content/statistics/purchase-ranking`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiContentStatisticsPurchaseRankingInfiniteQueryKey = (params?: GetApiContentStatisticsPurchaseRankingParams,) => {
    return [
    'infinite', `/api/content/statistics/purchase-ranking`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContentStatisticsPurchaseRankingQueryKey = (params?: GetApiContentStatisticsPurchaseRankingParams,) => {
    return [
    `/api/content/statistics/purchase-ranking`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContentStatisticsPurchaseRankingInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, GetApiContentStatisticsPurchaseRankingParams['page']>, TError = ErrorType<unknown>>(params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentStatisticsPurchaseRankingInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']> = ({ signal, pageParam }) => getApiContentStatisticsPurchaseRanking({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentStatisticsPurchaseRankingInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>>
export type GetApiContentStatisticsPurchaseRankingInfiniteQueryError = ErrorType<unknown>


export function useGetApiContentStatisticsPurchaseRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, GetApiContentStatisticsPurchaseRankingParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContentStatisticsPurchaseRankingParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsPurchaseRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, GetApiContentStatisticsPurchaseRankingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsPurchaseRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, GetApiContentStatisticsPurchaseRankingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê xếp hạng lượt mua
 */

export function useGetApiContentStatisticsPurchaseRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, GetApiContentStatisticsPurchaseRankingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData, QueryKey, GetApiContentStatisticsPurchaseRankingParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentStatisticsPurchaseRankingInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentStatisticsPurchaseRankingQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError = ErrorType<unknown>>(params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentStatisticsPurchaseRankingQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>> = ({ signal }) => getApiContentStatisticsPurchaseRanking(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentStatisticsPurchaseRankingQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>>
export type GetApiContentStatisticsPurchaseRankingQueryError = ErrorType<unknown>


export function useGetApiContentStatisticsPurchaseRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContentStatisticsPurchaseRankingParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsPurchaseRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsPurchaseRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê xếp hạng lượt mua
 */

export function useGetApiContentStatisticsPurchaseRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsPurchaseRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsPurchaseRanking>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentStatisticsPurchaseRankingQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Thống kê và xếp hạng các content theo tổng số lượt tải
 * @summary Lấy thống kê xếp hạng lượt tải
 */
export const getApiContentStatisticsDownloadRanking = (
    params?: GetApiContentStatisticsDownloadRankingParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContentStatisticsDownloadRanking200>(
      {url: `/api/content/statistics/download-ranking`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiContentStatisticsDownloadRankingInfiniteQueryKey = (params?: GetApiContentStatisticsDownloadRankingParams,) => {
    return [
    'infinite', `/api/content/statistics/download-ranking`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContentStatisticsDownloadRankingQueryKey = (params?: GetApiContentStatisticsDownloadRankingParams,) => {
    return [
    `/api/content/statistics/download-ranking`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContentStatisticsDownloadRankingInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, GetApiContentStatisticsDownloadRankingParams['page']>, TError = ErrorType<unknown>>(params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentStatisticsDownloadRankingInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']> = ({ signal, pageParam }) => getApiContentStatisticsDownloadRanking({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentStatisticsDownloadRankingInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>>
export type GetApiContentStatisticsDownloadRankingInfiniteQueryError = ErrorType<unknown>


export function useGetApiContentStatisticsDownloadRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, GetApiContentStatisticsDownloadRankingParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContentStatisticsDownloadRankingParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsDownloadRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, GetApiContentStatisticsDownloadRankingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsDownloadRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, GetApiContentStatisticsDownloadRankingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê xếp hạng lượt tải
 */

export function useGetApiContentStatisticsDownloadRankingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, GetApiContentStatisticsDownloadRankingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData, QueryKey, GetApiContentStatisticsDownloadRankingParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentStatisticsDownloadRankingInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentStatisticsDownloadRankingQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError = ErrorType<unknown>>(params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentStatisticsDownloadRankingQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>> = ({ signal }) => getApiContentStatisticsDownloadRanking(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentStatisticsDownloadRankingQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>>
export type GetApiContentStatisticsDownloadRankingQueryError = ErrorType<unknown>


export function useGetApiContentStatisticsDownloadRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContentStatisticsDownloadRankingParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsDownloadRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>,
          TError,
          Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentStatisticsDownloadRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê xếp hạng lượt tải
 */

export function useGetApiContentStatisticsDownloadRanking<TData = Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError = ErrorType<unknown>>(
 params?: GetApiContentStatisticsDownloadRankingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentStatisticsDownloadRanking>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentStatisticsDownloadRankingQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Lấy danh sách tất cả nội dung kể cả chưa được duyệt. Chỉ có quản trị viên mới có quyền truy cập.
 * @summary Lấy tất cả nội dung (kể cả chưa duyệt) - Chỉ dành cho admin
 */
export const getApiContentAll = (
    params?: GetApiContentAllParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContentAll200>(
      {url: `/api/content/all`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiContentAllInfiniteQueryKey = (params?: GetApiContentAllParams,) => {
    return [
    'infinite', `/api/content/all`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContentAllQueryKey = (params?: GetApiContentAllParams,) => {
    return [
    `/api/content/all`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContentAllInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentAll>>, GetApiContentAllParams['page']>, TError = ErrorType<void>>(params?: GetApiContentAllParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData, QueryKey, GetApiContentAllParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentAllInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentAll>>, QueryKey, GetApiContentAllParams['page']> = ({ signal, pageParam }) => getApiContentAll({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData, QueryKey, GetApiContentAllParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentAllInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentAll>>>
export type GetApiContentAllInfiniteQueryError = ErrorType<void>


export function useGetApiContentAllInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentAll>>, GetApiContentAllParams['page']>, TError = ErrorType<void>>(
 params: undefined |  GetApiContentAllParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData, QueryKey, GetApiContentAllParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentAll>>,
          TError,
          Awaited<ReturnType<typeof getApiContentAll>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentAllInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentAll>>, GetApiContentAllParams['page']>, TError = ErrorType<void>>(
 params?: GetApiContentAllParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData, QueryKey, GetApiContentAllParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentAll>>,
          TError,
          Awaited<ReturnType<typeof getApiContentAll>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentAllInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentAll>>, GetApiContentAllParams['page']>, TError = ErrorType<void>>(
 params?: GetApiContentAllParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData, QueryKey, GetApiContentAllParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả nội dung (kể cả chưa duyệt) - Chỉ dành cho admin
 */

export function useGetApiContentAllInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentAll>>, GetApiContentAllParams['page']>, TError = ErrorType<void>>(
 params?: GetApiContentAllParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData, QueryKey, GetApiContentAllParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentAllInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentAllQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentAll>>, TError = ErrorType<void>>(params?: GetApiContentAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentAll>>> = ({ signal }) => getApiContentAll(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentAllQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentAll>>>
export type GetApiContentAllQueryError = ErrorType<void>


export function useGetApiContentAll<TData = Awaited<ReturnType<typeof getApiContentAll>>, TError = ErrorType<void>>(
 params: undefined |  GetApiContentAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentAll>>,
          TError,
          Awaited<ReturnType<typeof getApiContentAll>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentAll<TData = Awaited<ReturnType<typeof getApiContentAll>>, TError = ErrorType<void>>(
 params?: GetApiContentAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentAll>>,
          TError,
          Awaited<ReturnType<typeof getApiContentAll>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentAll<TData = Awaited<ReturnType<typeof getApiContentAll>>, TError = ErrorType<void>>(
 params?: GetApiContentAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả nội dung (kể cả chưa duyệt) - Chỉ dành cho admin
 */

export function useGetApiContentAll<TData = Awaited<ReturnType<typeof getApiContentAll>>, TError = ErrorType<void>>(
 params?: GetApiContentAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentAll>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentAllQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Lấy danh sách các bài viết do chính người dùng hiện tại tạo ra
 * @summary Lấy danh sách bài viết của tôi (cho cộng tác viên)
 */
export const getApiContentMyContents = (
    params?: GetApiContentMyContentsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContentMyContents200>(
      {url: `/api/content/my-contents`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiContentMyContentsInfiniteQueryKey = (params?: GetApiContentMyContentsParams,) => {
    return [
    'infinite', `/api/content/my-contents`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContentMyContentsQueryKey = (params?: GetApiContentMyContentsParams,) => {
    return [
    `/api/content/my-contents`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContentMyContentsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentMyContents>>, GetApiContentMyContentsParams['page']>, TError = ErrorType<void>>(params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData, QueryKey, GetApiContentMyContentsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentMyContentsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentMyContents>>, QueryKey, GetApiContentMyContentsParams['page']> = ({ signal, pageParam }) => getApiContentMyContents({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData, QueryKey, GetApiContentMyContentsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentMyContentsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentMyContents>>>
export type GetApiContentMyContentsInfiniteQueryError = ErrorType<void>


export function useGetApiContentMyContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentMyContents>>, GetApiContentMyContentsParams['page']>, TError = ErrorType<void>>(
 params: undefined |  GetApiContentMyContentsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData, QueryKey, GetApiContentMyContentsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentMyContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentMyContents>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentMyContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentMyContents>>, GetApiContentMyContentsParams['page']>, TError = ErrorType<void>>(
 params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData, QueryKey, GetApiContentMyContentsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentMyContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentMyContents>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentMyContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentMyContents>>, GetApiContentMyContentsParams['page']>, TError = ErrorType<void>>(
 params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData, QueryKey, GetApiContentMyContentsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bài viết của tôi (cho cộng tác viên)
 */

export function useGetApiContentMyContentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentMyContents>>, GetApiContentMyContentsParams['page']>, TError = ErrorType<void>>(
 params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData, QueryKey, GetApiContentMyContentsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentMyContentsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentMyContentsQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentMyContents>>, TError = ErrorType<void>>(params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentMyContentsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentMyContents>>> = ({ signal }) => getApiContentMyContents(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentMyContentsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentMyContents>>>
export type GetApiContentMyContentsQueryError = ErrorType<void>


export function useGetApiContentMyContents<TData = Awaited<ReturnType<typeof getApiContentMyContents>>, TError = ErrorType<void>>(
 params: undefined |  GetApiContentMyContentsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentMyContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentMyContents>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentMyContents<TData = Awaited<ReturnType<typeof getApiContentMyContents>>, TError = ErrorType<void>>(
 params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentMyContents>>,
          TError,
          Awaited<ReturnType<typeof getApiContentMyContents>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentMyContents<TData = Awaited<ReturnType<typeof getApiContentMyContents>>, TError = ErrorType<void>>(
 params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bài viết của tôi (cho cộng tác viên)
 */

export function useGetApiContentMyContents<TData = Awaited<ReturnType<typeof getApiContentMyContents>>, TError = ErrorType<void>>(
 params?: GetApiContentMyContentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentMyContents>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentMyContentsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy chi tiết một nội dung
 */
export const getApiContentId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Content>(
      {url: `/api/content/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiContentIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/content/${id}`
    ] as const;
    }

export const getGetApiContentIdQueryKey = (id?: string,) => {
    return [
    `/api/content/${id}`
    ] as const;
    }

    
export const getGetApiContentIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentId>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentId>>> = ({ signal }) => getApiContentId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentId>>>
export type GetApiContentIdInfiniteQueryError = ErrorType<void>


export function useGetApiContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentId>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy chi tiết một nội dung
 */

export function useGetApiContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentId>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentId>>> = ({ signal }) => getApiContentId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentId>>>
export type GetApiContentIdQueryError = ErrorType<void>


export function useGetApiContentId<TData = Awaited<ReturnType<typeof getApiContentId>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentId<TData = Awaited<ReturnType<typeof getApiContentId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentId<TData = Awaited<ReturnType<typeof getApiContentId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy chi tiết một nội dung
 */

export function useGetApiContentId<TData = Awaited<ReturnType<typeof getApiContentId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Cập nhật thông tin nội dung
 */
export const putApiContentId = (
    id: string,
    putApiContentIdBody: BodyType<PutApiContentIdBody>,
 ) => {
      
      
      return mainInstance<Content>(
      {url: `/api/content/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiContentIdBody
    },
      );
    }
  


export const getPutApiContentIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiContentId>>, TError,{id: string;data: BodyType<PutApiContentIdBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiContentId>>, TError,{id: string;data: BodyType<PutApiContentIdBody>}, TContext> => {

const mutationKey = ['putApiContentId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiContentId>>, {id: string;data: BodyType<PutApiContentIdBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiContentId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiContentIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiContentId>>>
    export type PutApiContentIdMutationBody = BodyType<PutApiContentIdBody>
    export type PutApiContentIdMutationError = ErrorType<void>

    /**
 * @summary Cập nhật thông tin nội dung
 */
export const usePutApiContentId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiContentId>>, TError,{id: string;data: BodyType<PutApiContentIdBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiContentId>>,
        TError,
        {id: string;data: BodyType<PutApiContentIdBody>},
        TContext
      > => {

      const mutationOptions = getPutApiContentIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xóa nội dung
 */
export const deleteApiContentId = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/content/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiContentIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiContentId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiContentId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiContentId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiContentId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiContentId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiContentIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiContentId>>>
    
    export type DeleteApiContentIdMutationError = ErrorType<void>

    /**
 * @summary Xóa nội dung
 */
export const useDeleteApiContentId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiContentId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiContentId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiContentIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Tải lên nội dung mới
 */
export const postApiContentUpload = (
    postApiContentUploadBody: BodyType<PostApiContentUploadBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Content>(
      {url: `/api/content/upload`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiContentUploadBody, signal
    },
      );
    }
  


export const getPostApiContentUploadMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContentUpload>>, TError,{data: BodyType<PostApiContentUploadBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiContentUpload>>, TError,{data: BodyType<PostApiContentUploadBody>}, TContext> => {

const mutationKey = ['postApiContentUpload'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiContentUpload>>, {data: BodyType<PostApiContentUploadBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiContentUpload(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiContentUploadMutationResult = NonNullable<Awaited<ReturnType<typeof postApiContentUpload>>>
    export type PostApiContentUploadMutationBody = BodyType<PostApiContentUploadBody>
    export type PostApiContentUploadMutationError = ErrorType<void>

    /**
 * @summary Tải lên nội dung mới
 */
export const usePostApiContentUpload = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContentUpload>>, TError,{data: BodyType<PostApiContentUploadBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiContentUpload>>,
        TError,
        {data: BodyType<PostApiContentUploadBody>},
        TContext
      > => {

      const mutationOptions = getPostApiContentUploadMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Duyệt nội dung (chỉ admin)
 */
export const putApiContentIdApprove = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/content/${id}/approve`, method: 'PUT'
    },
      );
    }
  


export const getPutApiContentIdApproveMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiContentIdApprove>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiContentIdApprove>>, TError,{id: string}, TContext> => {

const mutationKey = ['putApiContentIdApprove'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiContentIdApprove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  putApiContentIdApprove(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiContentIdApproveMutationResult = NonNullable<Awaited<ReturnType<typeof putApiContentIdApprove>>>
    
    export type PutApiContentIdApproveMutationError = ErrorType<void>

    /**
 * @summary Duyệt nội dung (chỉ admin)
 */
export const usePutApiContentIdApprove = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiContentIdApprove>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiContentIdApprove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getPutApiContentIdApproveMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    