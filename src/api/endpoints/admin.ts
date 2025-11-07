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
  GetApiAdminContentsPending200,
  GetApiAdminContentsPendingParams,
  GetApiAdminStats200,
  PutApiAdminContentsContentIdReview200,
  PutApiAdminContentsContentIdReviewBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Lấy thống kê tổng quan
 */
export const getApiAdminStats = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiAdminStats200>(
      {url: `/api/admin/stats`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiAdminStatsInfiniteQueryKey = () => {
    return [
    'infinite', `/api/admin/stats`
    ] as const;
    }

export const getGetApiAdminStatsQueryKey = () => {
    return [
    `/api/admin/stats`
    ] as const;
    }

    
export const getGetApiAdminStatsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAdminStatsInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminStats>>> = ({ signal }) => getApiAdminStats(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAdminStatsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAdminStats>>>
export type GetApiAdminStatsInfiniteQueryError = ErrorType<unknown>


export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê tổng quan
 */

export function useGetApiAdminStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminStats>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAdminStatsInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiAdminStatsQueryOptions = <TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAdminStatsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminStats>>> = ({ signal }) => getApiAdminStats(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAdminStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAdminStats>>>
export type GetApiAdminStatsQueryError = ErrorType<unknown>


export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminStats>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê tổng quan
 */

export function useGetApiAdminStats<TData = Awaited<ReturnType<typeof getApiAdminStats>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminStats>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAdminStatsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy danh sách nội dung chờ duyệt
 */
export const getApiAdminContentsPending = (
    params?: GetApiAdminContentsPendingParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiAdminContentsPending200>(
      {url: `/api/admin/contents/pending`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiAdminContentsPendingInfiniteQueryKey = (params?: GetApiAdminContentsPendingParams,) => {
    return [
    'infinite', `/api/admin/contents/pending`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiAdminContentsPendingQueryKey = (params?: GetApiAdminContentsPendingParams,) => {
    return [
    `/api/admin/contents/pending`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiAdminContentsPendingInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminContentsPending>>, GetApiAdminContentsPendingParams['page']>, TError = ErrorType<unknown>>(params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData, QueryKey, GetApiAdminContentsPendingParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAdminContentsPendingInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminContentsPending>>, QueryKey, GetApiAdminContentsPendingParams['page']> = ({ signal, pageParam }) => getApiAdminContentsPending({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData, QueryKey, GetApiAdminContentsPendingParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAdminContentsPendingInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAdminContentsPending>>>
export type GetApiAdminContentsPendingInfiniteQueryError = ErrorType<unknown>


export function useGetApiAdminContentsPendingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminContentsPending>>, GetApiAdminContentsPendingParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiAdminContentsPendingParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData, QueryKey, GetApiAdminContentsPendingParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminContentsPending>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminContentsPending>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminContentsPendingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminContentsPending>>, GetApiAdminContentsPendingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData, QueryKey, GetApiAdminContentsPendingParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminContentsPending>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminContentsPending>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminContentsPendingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminContentsPending>>, GetApiAdminContentsPendingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData, QueryKey, GetApiAdminContentsPendingParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung chờ duyệt
 */

export function useGetApiAdminContentsPendingInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAdminContentsPending>>, GetApiAdminContentsPendingParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData, QueryKey, GetApiAdminContentsPendingParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAdminContentsPendingInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiAdminContentsPendingQueryOptions = <TData = Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError = ErrorType<unknown>>(params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAdminContentsPendingQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAdminContentsPending>>> = ({ signal }) => getApiAdminContentsPending(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAdminContentsPendingQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAdminContentsPending>>>
export type GetApiAdminContentsPendingQueryError = ErrorType<unknown>


export function useGetApiAdminContentsPending<TData = Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiAdminContentsPendingParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminContentsPending>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminContentsPending>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminContentsPending<TData = Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError = ErrorType<unknown>>(
 params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAdminContentsPending>>,
          TError,
          Awaited<ReturnType<typeof getApiAdminContentsPending>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAdminContentsPending<TData = Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError = ErrorType<unknown>>(
 params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung chờ duyệt
 */

export function useGetApiAdminContentsPending<TData = Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError = ErrorType<unknown>>(
 params?: GetApiAdminContentsPendingParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAdminContentsPending>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAdminContentsPendingQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Duyệt hoặc từ chối nội dung
 */
export const putApiAdminContentsContentIdReview = (
    contentId: string,
    putApiAdminContentsContentIdReviewBody: BodyType<PutApiAdminContentsContentIdReviewBody>,
 ) => {
      
      
      return mainInstance<PutApiAdminContentsContentIdReview200>(
      {url: `/api/admin/contents/${contentId}/review`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiAdminContentsContentIdReviewBody
    },
      );
    }
  


export const getPutApiAdminContentsContentIdReviewMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiAdminContentsContentIdReview>>, TError,{contentId: string;data: BodyType<PutApiAdminContentsContentIdReviewBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiAdminContentsContentIdReview>>, TError,{contentId: string;data: BodyType<PutApiAdminContentsContentIdReviewBody>}, TContext> => {

const mutationKey = ['putApiAdminContentsContentIdReview'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiAdminContentsContentIdReview>>, {contentId: string;data: BodyType<PutApiAdminContentsContentIdReviewBody>}> = (props) => {
          const {contentId,data} = props ?? {};

          return  putApiAdminContentsContentIdReview(contentId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiAdminContentsContentIdReviewMutationResult = NonNullable<Awaited<ReturnType<typeof putApiAdminContentsContentIdReview>>>
    export type PutApiAdminContentsContentIdReviewMutationBody = BodyType<PutApiAdminContentsContentIdReviewBody>
    export type PutApiAdminContentsContentIdReviewMutationError = ErrorType<unknown>

    /**
 * @summary Duyệt hoặc từ chối nội dung
 */
export const usePutApiAdminContentsContentIdReview = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiAdminContentsContentIdReview>>, TError,{contentId: string;data: BodyType<PutApiAdminContentsContentIdReviewBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiAdminContentsContentIdReview>>,
        TError,
        {contentId: string;data: BodyType<PutApiAdminContentsContentIdReviewBody>},
        TContext
      > => {

      const mutationOptions = getPutApiAdminContentsContentIdReviewMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    