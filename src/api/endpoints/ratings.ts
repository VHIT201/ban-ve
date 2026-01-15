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
  DeleteApiRatingsBody,
  GetApiRatings200,
  GetApiRatingsParams,
  PostApiRatings201,
  PostApiRatingsBody,
  PutApiRatings200,
  PutApiRatingsBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * Không cần đăng nhập, có thể lọc theo contentId
 * @summary Lấy danh sách tất cả đánh giá
 */
export const getApiRatings = (
    params?: GetApiRatingsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiRatings200>(
      {url: `/api/ratings`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiRatingsInfiniteQueryKey = (params?: GetApiRatingsParams,) => {
    return [
    'infinite', `/api/ratings`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiRatingsQueryKey = (params?: GetApiRatingsParams,) => {
    return [
    `/api/ratings`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiRatingsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiRatings>>, GetApiRatingsParams['page']>, TError = ErrorType<unknown>>(params?: GetApiRatingsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData, QueryKey, GetApiRatingsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiRatingsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiRatings>>, QueryKey, GetApiRatingsParams['page']> = ({ signal, pageParam }) => getApiRatings({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData, QueryKey, GetApiRatingsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiRatingsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiRatings>>>
export type GetApiRatingsInfiniteQueryError = ErrorType<unknown>


export function useGetApiRatingsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiRatings>>, GetApiRatingsParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiRatingsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData, QueryKey, GetApiRatingsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiRatings>>,
          TError,
          Awaited<ReturnType<typeof getApiRatings>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiRatingsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiRatings>>, GetApiRatingsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiRatingsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData, QueryKey, GetApiRatingsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiRatings>>,
          TError,
          Awaited<ReturnType<typeof getApiRatings>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiRatingsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiRatings>>, GetApiRatingsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiRatingsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData, QueryKey, GetApiRatingsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả đánh giá
 */

export function useGetApiRatingsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiRatings>>, GetApiRatingsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiRatingsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData, QueryKey, GetApiRatingsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiRatingsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiRatingsQueryOptions = <TData = Awaited<ReturnType<typeof getApiRatings>>, TError = ErrorType<unknown>>(params?: GetApiRatingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiRatingsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiRatings>>> = ({ signal }) => getApiRatings(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiRatingsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiRatings>>>
export type GetApiRatingsQueryError = ErrorType<unknown>


export function useGetApiRatings<TData = Awaited<ReturnType<typeof getApiRatings>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiRatingsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiRatings>>,
          TError,
          Awaited<ReturnType<typeof getApiRatings>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiRatings<TData = Awaited<ReturnType<typeof getApiRatings>>, TError = ErrorType<unknown>>(
 params?: GetApiRatingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiRatings>>,
          TError,
          Awaited<ReturnType<typeof getApiRatings>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiRatings<TData = Awaited<ReturnType<typeof getApiRatings>>, TError = ErrorType<unknown>>(
 params?: GetApiRatingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả đánh giá
 */

export function useGetApiRatings<TData = Awaited<ReturnType<typeof getApiRatings>>, TError = ErrorType<unknown>>(
 params?: GetApiRatingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiRatings>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiRatingsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Tạo đánh giá mới cho một nội dung. Mỗi email chỉ được đánh giá một nội dung một lần
 * @summary Tạo đánh giá mới
 */
export const postApiRatings = (
    postApiRatingsBody: BodyType<PostApiRatingsBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiRatings201>(
      {url: `/api/ratings`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiRatingsBody, signal
    },
      );
    }
  


export const getPostApiRatingsMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiRatings>>, TError,{data: BodyType<PostApiRatingsBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiRatings>>, TError,{data: BodyType<PostApiRatingsBody>}, TContext> => {

const mutationKey = ['postApiRatings'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiRatings>>, {data: BodyType<PostApiRatingsBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiRatings(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiRatingsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiRatings>>>
    export type PostApiRatingsMutationBody = BodyType<PostApiRatingsBody>
    export type PostApiRatingsMutationError = ErrorType<void>

    /**
 * @summary Tạo đánh giá mới
 */
export const usePostApiRatings = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiRatings>>, TError,{data: BodyType<PostApiRatingsBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiRatings>>,
        TError,
        {data: BodyType<PostApiRatingsBody>},
        TContext
      > => {

      const mutationOptions = getPostApiRatingsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Cập nhật số sao của một đánh giá. Chỉ được cập nhật nếu email khớp
 * @summary Cập nhật đánh giá
 */
export const putApiRatings = (
    putApiRatingsBody: BodyType<PutApiRatingsBody>,
 ) => {
      
      
      return mainInstance<PutApiRatings200>(
      {url: `/api/ratings`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiRatingsBody
    },
      );
    }
  


export const getPutApiRatingsMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiRatings>>, TError,{data: BodyType<PutApiRatingsBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiRatings>>, TError,{data: BodyType<PutApiRatingsBody>}, TContext> => {

const mutationKey = ['putApiRatings'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiRatings>>, {data: BodyType<PutApiRatingsBody>}> = (props) => {
          const {data} = props ?? {};

          return  putApiRatings(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiRatingsMutationResult = NonNullable<Awaited<ReturnType<typeof putApiRatings>>>
    export type PutApiRatingsMutationBody = BodyType<PutApiRatingsBody>
    export type PutApiRatingsMutationError = ErrorType<void>

    /**
 * @summary Cập nhật đánh giá
 */
export const usePutApiRatings = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiRatings>>, TError,{data: BodyType<PutApiRatingsBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiRatings>>,
        TError,
        {data: BodyType<PutApiRatingsBody>},
        TContext
      > => {

      const mutationOptions = getPutApiRatingsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Xoá một đánh giá. Chỉ được xoá nếu email khớp
 * @summary Xoá đánh giá
 */
export const deleteApiRatings = (
    deleteApiRatingsBody: BodyType<DeleteApiRatingsBody>,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/ratings`, method: 'DELETE',
      headers: {'Content-Type': 'application/json', },
      data: deleteApiRatingsBody
    },
      );
    }
  


export const getDeleteApiRatingsMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiRatings>>, TError,{data: BodyType<DeleteApiRatingsBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiRatings>>, TError,{data: BodyType<DeleteApiRatingsBody>}, TContext> => {

const mutationKey = ['deleteApiRatings'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiRatings>>, {data: BodyType<DeleteApiRatingsBody>}> = (props) => {
          const {data} = props ?? {};

          return  deleteApiRatings(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiRatingsMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiRatings>>>
    export type DeleteApiRatingsMutationBody = BodyType<DeleteApiRatingsBody>
    export type DeleteApiRatingsMutationError = ErrorType<void>

    /**
 * @summary Xoá đánh giá
 */
export const useDeleteApiRatings = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiRatings>>, TError,{data: BodyType<DeleteApiRatingsBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiRatings>>,
        TError,
        {data: BodyType<DeleteApiRatingsBody>},
        TContext
      > => {

      const mutationOptions = getDeleteApiRatingsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    