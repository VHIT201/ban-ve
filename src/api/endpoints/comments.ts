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
  GetApiContentsContentIdComments200,
  GetApiContentsContentIdCommentsParams,
  PostApiComments201,
  PostApiContentsContentIdCommentsBody,
  PutApiCommentsId200,
  UpdateCommentInput
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * Cho phép người dùng đăng nhập hoặc khách để lại bình luận
 * @summary Tạo bình luận mới
 */
export const postApiContentsContentIdComments = (
    contentId: string,
    postApiContentsContentIdCommentsBody: BodyType<PostApiContentsContentIdCommentsBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<Comment>(
      {url: `/api/contents/${contentId}/comments`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiContentsContentIdCommentsBody, signal
    },
      options);
    }
  


export const getPostApiContentsContentIdCommentsMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContentsContentIdComments>>, TError,{contentId: string;data: BodyType<PostApiContentsContentIdCommentsBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiContentsContentIdComments>>, TError,{contentId: string;data: BodyType<PostApiContentsContentIdCommentsBody>}, TContext> => {

const mutationKey = ['postApiContentsContentIdComments'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiContentsContentIdComments>>, {contentId: string;data: BodyType<PostApiContentsContentIdCommentsBody>}> = (props) => {
          const {contentId,data} = props ?? {};

          return  postApiContentsContentIdComments(contentId,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiContentsContentIdCommentsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiContentsContentIdComments>>>
    export type PostApiContentsContentIdCommentsMutationBody = BodyType<PostApiContentsContentIdCommentsBody>
    export type PostApiContentsContentIdCommentsMutationError = ErrorType<void>

    /**
 * @summary Tạo bình luận mới
 */
export const usePostApiContentsContentIdComments = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContentsContentIdComments>>, TError,{contentId: string;data: BodyType<PostApiContentsContentIdCommentsBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiContentsContentIdComments>>,
        TError,
        {contentId: string;data: BodyType<PostApiContentsContentIdCommentsBody>},
        TContext
      > => {

      const mutationOptions = getPostApiContentsContentIdCommentsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách bình luận của một nội dung
 */
export const getApiContentsContentIdComments = (
    contentId: string,
    params?: GetApiContentsContentIdCommentsParams,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiContentsContentIdComments200>(
      {url: `/api/contents/${contentId}/comments`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getGetApiContentsContentIdCommentsInfiniteQueryKey = (contentId?: string,
    params?: GetApiContentsContentIdCommentsParams,) => {
    return [
    'infinite', `/api/contents/${contentId}/comments`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContentsContentIdCommentsQueryKey = (contentId?: string,
    params?: GetApiContentsContentIdCommentsParams,) => {
    return [
    `/api/contents/${contentId}/comments`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContentsContentIdCommentsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, GetApiContentsContentIdCommentsParams['page']>, TError = ErrorType<unknown>>(contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData, QueryKey, GetApiContentsContentIdCommentsParams['page']>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentsContentIdCommentsInfiniteQueryKey(contentId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, QueryKey, GetApiContentsContentIdCommentsParams['page']> = ({ signal, pageParam }) => getApiContentsContentIdComments(contentId,{...params, 'page': pageParam || params?.['page']}, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData, QueryKey, GetApiContentsContentIdCommentsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentsContentIdCommentsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentsContentIdComments>>>
export type GetApiContentsContentIdCommentsInfiniteQueryError = ErrorType<unknown>


export function useGetApiContentsContentIdCommentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, GetApiContentsContentIdCommentsParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params: undefined |  GetApiContentsContentIdCommentsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData, QueryKey, GetApiContentsContentIdCommentsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>,
          TError,
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>, QueryKey
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentsContentIdCommentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, GetApiContentsContentIdCommentsParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData, QueryKey, GetApiContentsContentIdCommentsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>,
          TError,
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>, QueryKey
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentsContentIdCommentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, GetApiContentsContentIdCommentsParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData, QueryKey, GetApiContentsContentIdCommentsParams['page']>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bình luận của một nội dung
 */

export function useGetApiContentsContentIdCommentsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, GetApiContentsContentIdCommentsParams['page']>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData, QueryKey, GetApiContentsContentIdCommentsParams['page']>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentsContentIdCommentsInfiniteQueryOptions(contentId,params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContentsContentIdCommentsQueryOptions = <TData = Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError = ErrorType<unknown>>(contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContentsContentIdCommentsQueryKey(contentId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContentsContentIdComments>>> = ({ signal }) => getApiContentsContentIdComments(contentId,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(contentId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContentsContentIdCommentsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContentsContentIdComments>>>
export type GetApiContentsContentIdCommentsQueryError = ErrorType<unknown>


export function useGetApiContentsContentIdComments<TData = Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError = ErrorType<unknown>>(
 contentId: string,
    params: undefined |  GetApiContentsContentIdCommentsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>,
          TError,
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentsContentIdComments<TData = Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>,
          TError,
          Awaited<ReturnType<typeof getApiContentsContentIdComments>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContentsContentIdComments<TData = Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách bình luận của một nội dung
 */

export function useGetApiContentsContentIdComments<TData = Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError = ErrorType<unknown>>(
 contentId: string,
    params?: GetApiContentsContentIdCommentsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContentsContentIdComments>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContentsContentIdCommentsQueryOptions(contentId,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Cho phép người dùng đăng nhập hoặc khách để lại bình luận
 * @summary Tạo bình luận mới
 */
export const postApiComments = (
    createCommentInput: BodyType<CreateCommentInput>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiComments201>(
      {url: `/api/comments`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createCommentInput, signal
    },
      options);
    }
  


export const getPostApiCommentsMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiComments>>, TError,{data: BodyType<CreateCommentInput>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiComments>>, TError,{data: BodyType<CreateCommentInput>}, TContext> => {

const mutationKey = ['postApiComments'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiComments>>, {data: BodyType<CreateCommentInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiComments(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCommentsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiComments>>>
    export type PostApiCommentsMutationBody = BodyType<CreateCommentInput>
    export type PostApiCommentsMutationError = ErrorType<unknown>

    /**
 * @summary Tạo bình luận mới
 */
export const usePostApiComments = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiComments>>, TError,{data: BodyType<CreateCommentInput>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiComments>>,
        TError,
        {data: BodyType<CreateCommentInput>},
        TContext
      > => {

      const mutationOptions = getPostApiCommentsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Cập nhật bình luận
 */
export const putApiCommentsId = (
    id: string,
    updateCommentInput: BodyType<UpdateCommentInput>,
 options?: SecondParameter<typeof mainInstance>,) => {
      
      
      return mainInstance<PutApiCommentsId200>(
      {url: `/api/comments/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateCommentInput
    },
      options);
    }
  


export const getPutApiCommentsIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCommentsId>>, TError,{id: string;data: BodyType<UpdateCommentInput>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof putApiCommentsId>>, TError,{id: string;data: BodyType<UpdateCommentInput>}, TContext> => {

const mutationKey = ['putApiCommentsId'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCommentsId>>, {id: string;data: BodyType<UpdateCommentInput>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiCommentsId(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCommentsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCommentsId>>>
    export type PutApiCommentsIdMutationBody = BodyType<UpdateCommentInput>
    export type PutApiCommentsIdMutationError = ErrorType<unknown>

    /**
 * @summary Cập nhật bình luận
 */
export const usePutApiCommentsId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCommentsId>>, TError,{id: string;data: BodyType<UpdateCommentInput>}, TContext>, request?: SecondParameter<typeof mainInstance>}
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
 options?: SecondParameter<typeof mainInstance>,) => {
      
      
      return mainInstance<DeleteApiCommentsId200>(
      {url: `/api/comments/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteApiCommentsIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCommentsId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiCommentsId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiCommentsId'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiCommentsId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiCommentsId(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiCommentsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiCommentsId>>>
    
    export type DeleteApiCommentsIdMutationError = ErrorType<unknown>

    /**
 * @summary Xóa bình luận
 */
export const useDeleteApiCommentsId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCommentsId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiCommentsId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiCommentsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    