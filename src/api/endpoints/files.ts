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
  File
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Tạo mới file
 */
export const postApiFile = (
    file: BodyType<File>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<File>(
      {url: `/api/file`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: file, signal
    },
      );
    }
  


export const getPostApiFileMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiFile>>, TError,{data: BodyType<File>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiFile>>, TError,{data: BodyType<File>}, TContext> => {

const mutationKey = ['postApiFile'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiFile>>, {data: BodyType<File>}> = (props) => {
          const {data} = props ?? {};

          return  postApiFile(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiFileMutationResult = NonNullable<Awaited<ReturnType<typeof postApiFile>>>
    export type PostApiFileMutationBody = BodyType<File>
    export type PostApiFileMutationError = ErrorType<unknown>

    /**
 * @summary Tạo mới file
 */
export const usePostApiFile = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiFile>>, TError,{data: BodyType<File>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiFile>>,
        TError,
        {data: BodyType<File>},
        TContext
      > => {

      const mutationOptions = getPostApiFileMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách tất cả file
 */
export const getApiFile = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<File[]>(
      {url: `/api/file`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiFileInfiniteQueryKey = () => {
    return [
    'infinite', `/api/file`
    ] as const;
    }

export const getGetApiFileQueryKey = () => {
    return [
    `/api/file`
    ] as const;
    }

    
export const getGetApiFileInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFile>>> = ({ signal }) => getApiFile(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFile>>>
export type GetApiFileInfiniteQueryError = ErrorType<unknown>


export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả file
 */

export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileQueryOptions = <TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFile>>> = ({ signal }) => getApiFile(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFile>>>
export type GetApiFileQueryError = ErrorType<unknown>


export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả file
 */

export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy thông tin chi tiết file
 */
export const getApiFileId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<File>(
      {url: `/api/file/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiFileIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/file/${id}`
    ] as const;
    }

export const getGetApiFileIdQueryKey = (id?: string,) => {
    return [
    `/api/file/${id}`
    ] as const;
    }

    
export const getGetApiFileIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileId>>> = ({ signal }) => getApiFileId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileId>>>
export type GetApiFileIdInfiniteQueryError = ErrorType<void>


export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết file
 */

export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileId>>> = ({ signal }) => getApiFileId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileId>>>
export type GetApiFileIdQueryError = ErrorType<void>


export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết file
 */

export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Xóa file
 */
export const deleteApiFileId = (
    id: string,
 ) => {
      
      
      return mainInstance<File>(
      {url: `/api/file/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiFileIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiFileId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiFileId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiFileId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiFileId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiFileId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiFileIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiFileId>>>
    
    export type DeleteApiFileIdMutationError = ErrorType<void>

    /**
 * @summary Xóa file
 */
export const useDeleteApiFileId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiFileId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiFileId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiFileIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    