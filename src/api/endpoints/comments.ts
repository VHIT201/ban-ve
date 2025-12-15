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
  Comment,
  CreateCommentInput,
  DeleteApiCommentsId200,
  GetApiCommentsByContentContentId200,
  GetApiCommentsByContentContentIdParams,
  GetApiCommentsContentsContentId200,
  GetApiCommentsContentsContentIdParams,
  GetApiCommentsMe200,
  GetApiCommentsMeParams,
  PostApiCommentsContentsContentIdBody,
  PostApiCommentsCreate201,
  PutApiCommentsId200,
  UpdateCommentInput
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * Cho phép người dùng đăng nhập hoặc khách để lại bình luận
 * @summary Tạo bình luận mới
 */
export const postApiCommentsContentsContentId = (
    contentId: string,
    postApiCommentsContentsContentIdBody: BodyType<PostApiCommentsContentsContentIdBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Comment>(
      {url: `/api/comments/contents/${contentId}`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiCommentsContentsContentIdBody, signal
    },
      );
    }
  


export const getPostApiCommentsContentsContentIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCommentsContentsContentId>>, TError,{contentId: string;data: BodyType<PostApiCommentsContentsContentIdBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiCommentsContentsContentId>>, TError,{contentId: string;data: BodyType<PostApiCommentsContentsContentIdBody>}, TContext> => {

const mutationKey = ['postApiCommentsContentsContentId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiCommentsContentsContentId>>, {contentId: string;data: BodyType<PostApiCommentsContentsContentIdBody>}> = (props) => {
          const {contentId,data} = props ?? {};

          return  postApiCommentsContentsContentId(contentId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCommentsContentsContentIdMutationResult = NonNullable<Awaited<ReturnType<typeof postApiCommentsContentsContentId>>>
    export type PostApiCommentsContentsContentIdMutationBody = BodyType<PostApiCommentsContentsContentIdBody>
    export type PostApiCommentsContentsContentIdMutationError = ErrorType<void>

    /**
 * @summary Tạo bình luận mới
 */
export const usePostApiCommentsContentsContentId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCommentsContentsContentId>>, TError,{contentId: string;data: BodyType<PostApiCommentsContentsContentIdBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiCommentsContentsContentId>>,
        TError,
        {contentId: string;data: BodyType<PostApiCommentsContentsContentIdBody>},
        TContext
      > => {

      const mutationOptions = getPostApiCommentsContentsContentIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách bình luận của một nội dung
 */
export const getApiCommentsContentsContentId = (
    contentId: string,
    params?: GetApiCommentsContentsContentIdParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCommentsContentsContentId200>(
      {url: `/api/comments/contents/${contentId}`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCommentsContentsContentIdInfiniteQueryKey = (contentId?: string,
    params?: GetApiCommentsContentsContentIdParams,) => {
    return [
    'infinite', `/api/comments/contents/${contentId}`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCommentsContentsContentIdQueryKey = (contentId?: string,
    params?: GetApiCommentsContentsContentIdParams,) => {
    return [
    `/api/comments/contents/${contentId}`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCommentsContentsContentIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, GetApiCommentsContentsContentIdParams['page']>, TError = ErrorType<unknown>>(contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData, QueryKey, GetApiCommentsContentsContentIdParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCommentsContentsContentIdInfiniteQueryKey(contentId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, QueryKey, GetApiCommentsContentsContentIdParams['page']> = ({ signal, pageParam }) => getApiCommentsContentsContentId(contentId,{...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData, QueryKey, GetApiCommentsContentsContentIdParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCommentsContentsContentIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>>
export type GetApiCommentsContentsContentIdInfiniteQueryError = ErrorType<unknown>


export function useGetApiCommentsContentsContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, GetApiCommentsContentsContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params: undefined |  GetApiCommentsContentsContentIdParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData, QueryKey, GetApiCommentsContentsContentIdParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsContentsContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, GetApiCommentsContentsContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData, QueryKey, GetApiCommentsContentsContentIdParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsContentsContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, GetApiCommentsContentsContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData, QueryKey, GetApiCommentsContentsContentIdParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bình luận của một nội dung
 */

export function useGetApiCommentsContentsContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, GetApiCommentsContentsContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData, QueryKey, GetApiCommentsContentsContentIdParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCommentsContentsContentIdInfiniteQueryOptions(contentId,params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCommentsContentsContentIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError = ErrorType<unknown>>(contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCommentsContentsContentIdQueryKey(contentId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>> = ({ signal }) => getApiCommentsContentsContentId(contentId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCommentsContentsContentIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>>
export type GetApiCommentsContentsContentIdQueryError = ErrorType<unknown>


export function useGetApiCommentsContentsContentId<TData = Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params: undefined |  GetApiCommentsContentsContentIdParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsContentsContentId<TData = Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsContentsContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsContentsContentId<TData = Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bình luận của một nội dung
 */

export function useGetApiCommentsContentsContentId<TData = Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsContentsContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsContentsContentId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCommentsContentsContentIdQueryOptions(contentId,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Cho phép người dùng đăng nhập hoặc khách để lại bình luận
 * @summary Tạo bình luận mới
 */
export const postApiCommentsCreate = (
    createCommentInput: BodyType<CreateCommentInput>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiCommentsCreate201>(
      {url: `/api/comments/create`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createCommentInput, signal
    },
      );
    }
  


export const getPostApiCommentsCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCommentsCreate>>, TError,{data: BodyType<CreateCommentInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiCommentsCreate>>, TError,{data: BodyType<CreateCommentInput>}, TContext> => {

const mutationKey = ['postApiCommentsCreate'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiCommentsCreate>>, {data: BodyType<CreateCommentInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiCommentsCreate(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCommentsCreateMutationResult = NonNullable<Awaited<ReturnType<typeof postApiCommentsCreate>>>
    export type PostApiCommentsCreateMutationBody = BodyType<CreateCommentInput>
    export type PostApiCommentsCreateMutationError = ErrorType<unknown>

    /**
 * @summary Tạo bình luận mới
 */
export const usePostApiCommentsCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCommentsCreate>>, TError,{data: BodyType<CreateCommentInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiCommentsCreate>>,
        TError,
        {data: BodyType<CreateCommentInput>},
        TContext
      > => {

      const mutationOptions = getPostApiCommentsCreateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách bình luận của một nội dung
 */
export const getApiCommentsByContentContentId = (
    contentId: string,
    params?: GetApiCommentsByContentContentIdParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCommentsByContentContentId200>(
      {url: `/api/comments/by-content/${contentId}`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCommentsByContentContentIdInfiniteQueryKey = (contentId?: string,
    params?: GetApiCommentsByContentContentIdParams,) => {
    return [
    'infinite', `/api/comments/by-content/${contentId}`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCommentsByContentContentIdQueryKey = (contentId?: string,
    params?: GetApiCommentsByContentContentIdParams,) => {
    return [
    `/api/comments/by-content/${contentId}`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCommentsByContentContentIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, GetApiCommentsByContentContentIdParams['page']>, TError = ErrorType<unknown>>(contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData, QueryKey, GetApiCommentsByContentContentIdParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCommentsByContentContentIdInfiniteQueryKey(contentId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, QueryKey, GetApiCommentsByContentContentIdParams['page']> = ({ signal, pageParam }) => getApiCommentsByContentContentId(contentId,{...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData, QueryKey, GetApiCommentsByContentContentIdParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCommentsByContentContentIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>>
export type GetApiCommentsByContentContentIdInfiniteQueryError = ErrorType<unknown>


export function useGetApiCommentsByContentContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, GetApiCommentsByContentContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params: undefined |  GetApiCommentsByContentContentIdParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData, QueryKey, GetApiCommentsByContentContentIdParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsByContentContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, GetApiCommentsByContentContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData, QueryKey, GetApiCommentsByContentContentIdParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsByContentContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, GetApiCommentsByContentContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData, QueryKey, GetApiCommentsByContentContentIdParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bình luận của một nội dung
 */

export function useGetApiCommentsByContentContentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, GetApiCommentsByContentContentIdParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData, QueryKey, GetApiCommentsByContentContentIdParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCommentsByContentContentIdInfiniteQueryOptions(contentId,params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCommentsByContentContentIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError = ErrorType<unknown>>(contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCommentsByContentContentIdQueryKey(contentId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>> = ({ signal }) => getApiCommentsByContentContentId(contentId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCommentsByContentContentIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>>
export type GetApiCommentsByContentContentIdQueryError = ErrorType<unknown>


export function useGetApiCommentsByContentContentId<TData = Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params: undefined |  GetApiCommentsByContentContentIdParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsByContentContentId<TData = Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsByContentContentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsByContentContentId<TData = Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bình luận của một nội dung
 */

export function useGetApiCommentsByContentContentId<TData = Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiCommentsByContentContentIdParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsByContentContentId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCommentsByContentContentIdQueryOptions(contentId,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Cập nhật bình luận
 */
export const putApiCommentsId = (
    id: string,
    updateCommentInput: BodyType<UpdateCommentInput>,
 ) => {
      
      
      return mainInstance<PutApiCommentsId200>(
      {url: `/api/comments/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateCommentInput
    },
      );
    }
  


export const getPutApiCommentsIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCommentsId>>, TError,{id: string;data: BodyType<UpdateCommentInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiCommentsId>>, TError,{id: string;data: BodyType<UpdateCommentInput>}, TContext> => {

const mutationKey = ['putApiCommentsId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCommentsId>>, {id: string;data: BodyType<UpdateCommentInput>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiCommentsId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCommentsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCommentsId>>>
    export type PutApiCommentsIdMutationBody = BodyType<UpdateCommentInput>
    export type PutApiCommentsIdMutationError = ErrorType<unknown>

    /**
 * @summary Cập nhật bình luận
 */
export const usePutApiCommentsId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCommentsId>>, TError,{id: string;data: BodyType<UpdateCommentInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiCommentsId>>,
        TError,
        {id: string;data: BodyType<UpdateCommentInput>},
        TContext
      > => {

      const mutationOptions = getPutApiCommentsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xóa bình luận
 */
export const deleteApiCommentsId = (
    id: string,
 ) => {
      
      
      return mainInstance<DeleteApiCommentsId200>(
      {url: `/api/comments/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiCommentsIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCommentsId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiCommentsId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiCommentsId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiCommentsId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiCommentsId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiCommentsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiCommentsId>>>
    
    export type DeleteApiCommentsIdMutationError = ErrorType<unknown>

    /**
 * @summary Xóa bình luận
 */
export const useDeleteApiCommentsId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCommentsId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiCommentsId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiCommentsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy tất cả bình luận của người dùng đang đăng nhập
 */
export const getApiCommentsMe = (
    params?: GetApiCommentsMeParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCommentsMe200>(
      {url: `/api/comments/me`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCommentsMeInfiniteQueryKey = (params?: GetApiCommentsMeParams,) => {
    return [
    'infinite', `/api/comments/me`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCommentsMeQueryKey = (params?: GetApiCommentsMeParams,) => {
    return [
    `/api/comments/me`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCommentsMeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsMe>>, GetApiCommentsMeParams['page']>, TError = ErrorType<unknown>>(params?: GetApiCommentsMeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData, QueryKey, GetApiCommentsMeParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCommentsMeInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCommentsMe>>, QueryKey, GetApiCommentsMeParams['page']> = ({ signal, pageParam }) => getApiCommentsMe({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData, QueryKey, GetApiCommentsMeParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCommentsMeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCommentsMe>>>
export type GetApiCommentsMeInfiniteQueryError = ErrorType<unknown>


export function useGetApiCommentsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsMe>>, GetApiCommentsMeParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCommentsMeParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData, QueryKey, GetApiCommentsMeParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsMe>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsMe>>, GetApiCommentsMeParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCommentsMeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData, QueryKey, GetApiCommentsMeParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsMe>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsMe>>, GetApiCommentsMeParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCommentsMeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData, QueryKey, GetApiCommentsMeParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả bình luận của người dùng đang đăng nhập
 */

export function useGetApiCommentsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCommentsMe>>, GetApiCommentsMeParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCommentsMeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData, QueryKey, GetApiCommentsMeParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCommentsMeInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCommentsMeQueryOptions = <TData = Awaited<ReturnType<typeof getApiCommentsMe>>, TError = ErrorType<unknown>>(params?: GetApiCommentsMeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCommentsMeQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCommentsMe>>> = ({ signal }) => getApiCommentsMe(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCommentsMeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCommentsMe>>>
export type GetApiCommentsMeQueryError = ErrorType<unknown>


export function useGetApiCommentsMe<TData = Awaited<ReturnType<typeof getApiCommentsMe>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCommentsMeParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsMe<TData = Awaited<ReturnType<typeof getApiCommentsMe>>, TError = ErrorType<unknown>>(
 params?: GetApiCommentsMeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCommentsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCommentsMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCommentsMe<TData = Awaited<ReturnType<typeof getApiCommentsMe>>, TError = ErrorType<unknown>>(
 params?: GetApiCommentsMeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả bình luận của người dùng đang đăng nhập
 */

export function useGetApiCommentsMe<TData = Awaited<ReturnType<typeof getApiCommentsMe>>, TError = ErrorType<unknown>>(
 params?: GetApiCommentsMeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCommentsMe>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCommentsMeQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




