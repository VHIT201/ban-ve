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
  ContentInput,
  GetApiContent200,
  GetApiContentParams
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Lấy danh sách nội dung đã được duyệt
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
 * @summary Lấy danh sách nội dung đã được duyệt
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
 * @summary Lấy danh sách nội dung đã được duyệt
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
 * @summary Cập nhật nội dung (chỉ người tạo hoặc admin)
 */
export const putApiContentId = (
    id: string,
    contentInput: BodyType<ContentInput>,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/content/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: contentInput
    },
      );
    }
  


export const getPutApiContentIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiContentId>>, TError,{id: string;data: BodyType<ContentInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiContentId>>, TError,{id: string;data: BodyType<ContentInput>}, TContext> => {

const mutationKey = ['putApiContentId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiContentId>>, {id: string;data: BodyType<ContentInput>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiContentId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiContentIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiContentId>>>
    export type PutApiContentIdMutationBody = BodyType<ContentInput>
    export type PutApiContentIdMutationError = ErrorType<void>

    /**
 * @summary Cập nhật nội dung (chỉ người tạo hoặc admin)
 */
export const usePutApiContentId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiContentId>>, TError,{id: string;data: BodyType<ContentInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiContentId>>,
        TError,
        {id: string;data: BodyType<ContentInput>},
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
    contentInput: BodyType<ContentInput>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Content>(
      {url: `/api/content/upload`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: contentInput, signal
    },
      );
    }
  


export const getPostApiContentUploadMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContentUpload>>, TError,{data: BodyType<ContentInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiContentUpload>>, TError,{data: BodyType<ContentInput>}, TContext> => {

const mutationKey = ['postApiContentUpload'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiContentUpload>>, {data: BodyType<ContentInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiContentUpload(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiContentUploadMutationResult = NonNullable<Awaited<ReturnType<typeof postApiContentUpload>>>
    export type PostApiContentUploadMutationBody = BodyType<ContentInput>
    export type PostApiContentUploadMutationError = ErrorType<void>

    /**
 * @summary Tải lên nội dung mới
 */
export const usePostApiContentUpload = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContentUpload>>, TError,{data: BodyType<ContentInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiContentUpload>>,
        TError,
        {data: BodyType<ContentInput>},
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
    