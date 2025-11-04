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
  GetApiSocialContentContentIdStats200,
  GetApiSocialPopular200,
  GetApiSocialPopularParams,
  PostApiSocialContentContentIdShare201,
  PostApiSocialContentContentIdShareBody,
  PostApiSocialContentContentIdView201,
  PostApiSocialContentContentIdViewBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Ghi nhận lượt xem nội dung
 */
export const postApiSocialContentContentIdView = (
    contentId: string,
    postApiSocialContentContentIdViewBody: BodyType<PostApiSocialContentContentIdViewBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiSocialContentContentIdView201>(
      {url: `/api/social/content/${contentId}/view`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiSocialContentContentIdViewBody, signal
    },
      options);
    }
  


export const getPostApiSocialContentContentIdViewMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiSocialContentContentIdView>>, TError,{contentId: string;data: BodyType<PostApiSocialContentContentIdViewBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiSocialContentContentIdView>>, TError,{contentId: string;data: BodyType<PostApiSocialContentContentIdViewBody>}, TContext> => {

const mutationKey = ['postApiSocialContentContentIdView'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiSocialContentContentIdView>>, {contentId: string;data: BodyType<PostApiSocialContentContentIdViewBody>}> = (props) => {
          const {contentId,data} = props ?? {};

          return  postApiSocialContentContentIdView(contentId,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiSocialContentContentIdViewMutationResult = NonNullable<Awaited<ReturnType<typeof postApiSocialContentContentIdView>>>
    export type PostApiSocialContentContentIdViewMutationBody = BodyType<PostApiSocialContentContentIdViewBody>
    export type PostApiSocialContentContentIdViewMutationError = ErrorType<unknown>

    /**
 * @summary Ghi nhận lượt xem nội dung
 */
export const usePostApiSocialContentContentIdView = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiSocialContentContentIdView>>, TError,{contentId: string;data: BodyType<PostApiSocialContentContentIdViewBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiSocialContentContentIdView>>,
        TError,
        {contentId: string;data: BodyType<PostApiSocialContentContentIdViewBody>},
        TContext
      > => {

      const mutationOptions = getPostApiSocialContentContentIdViewMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Ghi nhận lượt chia sẻ nội dung
 */
export const postApiSocialContentContentIdShare = (
    contentId: string,
    postApiSocialContentContentIdShareBody: BodyType<PostApiSocialContentContentIdShareBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiSocialContentContentIdShare201>(
      {url: `/api/social/content/${contentId}/share`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiSocialContentContentIdShareBody, signal
    },
      options);
    }
  


export const getPostApiSocialContentContentIdShareMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiSocialContentContentIdShare>>, TError,{contentId: string;data: BodyType<PostApiSocialContentContentIdShareBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiSocialContentContentIdShare>>, TError,{contentId: string;data: BodyType<PostApiSocialContentContentIdShareBody>}, TContext> => {

const mutationKey = ['postApiSocialContentContentIdShare'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiSocialContentContentIdShare>>, {contentId: string;data: BodyType<PostApiSocialContentContentIdShareBody>}> = (props) => {
          const {contentId,data} = props ?? {};

          return  postApiSocialContentContentIdShare(contentId,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiSocialContentContentIdShareMutationResult = NonNullable<Awaited<ReturnType<typeof postApiSocialContentContentIdShare>>>
    export type PostApiSocialContentContentIdShareMutationBody = BodyType<PostApiSocialContentContentIdShareBody>
    export type PostApiSocialContentContentIdShareMutationError = ErrorType<unknown>

    /**
 * @summary Ghi nhận lượt chia sẻ nội dung
 */
export const usePostApiSocialContentContentIdShare = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiSocialContentContentIdShare>>, TError,{contentId: string;data: BodyType<PostApiSocialContentContentIdShareBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiSocialContentContentIdShare>>,
        TError,
        {contentId: string;data: BodyType<PostApiSocialContentContentIdShareBody>},
        TContext
      > => {

      const mutationOptions = getPostApiSocialContentContentIdShareMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy thống kê tương tác của nội dung
 */
export const getApiSocialContentContentIdStats = (
    contentId: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiSocialContentContentIdStats200>(
      {url: `/api/social/content/${contentId}/stats`, method: 'GET', signal
    },
      options);
    }
  



export const getGetApiSocialContentContentIdStatsInfiniteQueryKey = (contentId?: string,) => {
    return [
    'infinite', `/api/social/content/${contentId}/stats`
    ] as const;
    }

export const getGetApiSocialContentContentIdStatsQueryKey = (contentId?: string,) => {
    return [
    `/api/social/content/${contentId}/stats`
    ] as const;
    }

    
export const getGetApiSocialContentContentIdStatsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>, TError = ErrorType<unknown>>(contentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSocialContentContentIdStatsInfiniteQueryKey(contentId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>> = ({ signal }) => getApiSocialContentContentIdStats(contentId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSocialContentContentIdStatsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>
export type GetApiSocialContentContentIdStatsInfiniteQueryError = ErrorType<unknown>


export function useGetApiSocialContentContentIdStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>, TError = ErrorType<unknown>>(
 contentId: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialContentContentIdStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>, TError = ErrorType<unknown>>(
 contentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialContentContentIdStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>, TError = ErrorType<unknown>>(
 contentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê tương tác của nội dung
 */

export function useGetApiSocialContentContentIdStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>, TError = ErrorType<unknown>>(
 contentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSocialContentContentIdStatsInfiniteQueryOptions(contentId,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiSocialContentContentIdStatsQueryOptions = <TData = Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError = ErrorType<unknown>>(contentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSocialContentContentIdStatsQueryKey(contentId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>> = ({ signal }) => getApiSocialContentContentIdStats(contentId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSocialContentContentIdStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>>
export type GetApiSocialContentContentIdStatsQueryError = ErrorType<unknown>


export function useGetApiSocialContentContentIdStats<TData = Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError = ErrorType<unknown>>(
 contentId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialContentContentIdStats<TData = Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError = ErrorType<unknown>>(
 contentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialContentContentIdStats<TData = Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError = ErrorType<unknown>>(
 contentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thống kê tương tác của nội dung
 */

export function useGetApiSocialContentContentIdStats<TData = Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError = ErrorType<unknown>>(
 contentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialContentContentIdStats>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSocialContentContentIdStatsQueryOptions(contentId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy danh sách nội dung phổ biến
 */
export const getApiSocialPopular = (
    params?: GetApiSocialPopularParams,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiSocialPopular200>(
      {url: `/api/social/popular`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getGetApiSocialPopularInfiniteQueryKey = (params?: GetApiSocialPopularParams,) => {
    return [
    'infinite', `/api/social/popular`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiSocialPopularQueryKey = (params?: GetApiSocialPopularParams,) => {
    return [
    `/api/social/popular`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiSocialPopularInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialPopular>>, GetApiSocialPopularParams['page']>, TError = ErrorType<unknown>>(params?: GetApiSocialPopularParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData, QueryKey, GetApiSocialPopularParams['page']>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSocialPopularInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSocialPopular>>, QueryKey, GetApiSocialPopularParams['page']> = ({ signal, pageParam }) => getApiSocialPopular({...params, 'page': pageParam || params?.['page']}, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData, QueryKey, GetApiSocialPopularParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSocialPopularInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSocialPopular>>>
export type GetApiSocialPopularInfiniteQueryError = ErrorType<unknown>


export function useGetApiSocialPopularInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialPopular>>, GetApiSocialPopularParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiSocialPopularParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData, QueryKey, GetApiSocialPopularParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialPopular>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialPopular>>, QueryKey
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialPopularInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialPopular>>, GetApiSocialPopularParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiSocialPopularParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData, QueryKey, GetApiSocialPopularParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialPopular>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialPopular>>, QueryKey
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialPopularInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialPopular>>, GetApiSocialPopularParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiSocialPopularParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData, QueryKey, GetApiSocialPopularParams['page']>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung phổ biến
 */

export function useGetApiSocialPopularInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSocialPopular>>, GetApiSocialPopularParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiSocialPopularParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData, QueryKey, GetApiSocialPopularParams['page']>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSocialPopularInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiSocialPopularQueryOptions = <TData = Awaited<ReturnType<typeof getApiSocialPopular>>, TError = ErrorType<unknown>>(params?: GetApiSocialPopularParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSocialPopularQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSocialPopular>>> = ({ signal }) => getApiSocialPopular(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSocialPopularQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSocialPopular>>>
export type GetApiSocialPopularQueryError = ErrorType<unknown>


export function useGetApiSocialPopular<TData = Awaited<ReturnType<typeof getApiSocialPopular>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiSocialPopularParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialPopular>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialPopular>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialPopular<TData = Awaited<ReturnType<typeof getApiSocialPopular>>, TError = ErrorType<unknown>>(
 params?: GetApiSocialPopularParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSocialPopular>>,
          TError,
          Awaited<ReturnType<typeof getApiSocialPopular>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSocialPopular<TData = Awaited<ReturnType<typeof getApiSocialPopular>>, TError = ErrorType<unknown>>(
 params?: GetApiSocialPopularParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách nội dung phổ biến
 */

export function useGetApiSocialPopular<TData = Awaited<ReturnType<typeof getApiSocialPopular>>, TError = ErrorType<unknown>>(
 params?: GetApiSocialPopularParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSocialPopular>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSocialPopularQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




