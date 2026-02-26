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
  GetApiNotificationsParams
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType } from '../mutator/custom-instance';





/**
 * @summary Lấy danh sách thông báo của người dùng hiện tại
 */
export const getApiNotifications = (
    params?: GetApiNotificationsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/notifications`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiNotificationsInfiniteQueryKey = (params?: GetApiNotificationsParams,) => {
    return [
    'infinite', `/api/notifications`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiNotificationsQueryKey = (params?: GetApiNotificationsParams,) => {
    return [
    `/api/notifications`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiNotificationsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiNotifications>>, GetApiNotificationsParams['page']>, TError = ErrorType<unknown>>(params?: GetApiNotificationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData, QueryKey, GetApiNotificationsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiNotificationsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiNotifications>>, QueryKey, GetApiNotificationsParams['page']> = ({ signal, pageParam }) => getApiNotifications({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData, QueryKey, GetApiNotificationsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiNotificationsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiNotifications>>>
export type GetApiNotificationsInfiniteQueryError = ErrorType<unknown>


export function useGetApiNotificationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotifications>>, GetApiNotificationsParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiNotificationsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData, QueryKey, GetApiNotificationsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotifications>>,
          TError,
          Awaited<ReturnType<typeof getApiNotifications>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotificationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotifications>>, GetApiNotificationsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiNotificationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData, QueryKey, GetApiNotificationsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotifications>>,
          TError,
          Awaited<ReturnType<typeof getApiNotifications>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotificationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotifications>>, GetApiNotificationsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiNotificationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData, QueryKey, GetApiNotificationsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách thông báo của người dùng hiện tại
 */

export function useGetApiNotificationsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotifications>>, GetApiNotificationsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiNotificationsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData, QueryKey, GetApiNotificationsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiNotificationsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiNotificationsQueryOptions = <TData = Awaited<ReturnType<typeof getApiNotifications>>, TError = ErrorType<unknown>>(params?: GetApiNotificationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiNotificationsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiNotifications>>> = ({ signal }) => getApiNotifications(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiNotificationsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiNotifications>>>
export type GetApiNotificationsQueryError = ErrorType<unknown>


export function useGetApiNotifications<TData = Awaited<ReturnType<typeof getApiNotifications>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiNotificationsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotifications>>,
          TError,
          Awaited<ReturnType<typeof getApiNotifications>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotifications<TData = Awaited<ReturnType<typeof getApiNotifications>>, TError = ErrorType<unknown>>(
 params?: GetApiNotificationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotifications>>,
          TError,
          Awaited<ReturnType<typeof getApiNotifications>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotifications<TData = Awaited<ReturnType<typeof getApiNotifications>>, TError = ErrorType<unknown>>(
 params?: GetApiNotificationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách thông báo của người dùng hiện tại
 */

export function useGetApiNotifications<TData = Awaited<ReturnType<typeof getApiNotifications>>, TError = ErrorType<unknown>>(
 params?: GetApiNotificationsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotifications>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiNotificationsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy số lượng thông báo chưa đọc
 */
export const getApiNotificationsUnreadCount = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/notifications/unread-count`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiNotificationsUnreadCountInfiniteQueryKey = () => {
    return [
    'infinite', `/api/notifications/unread-count`
    ] as const;
    }

export const getGetApiNotificationsUnreadCountQueryKey = () => {
    return [
    `/api/notifications/unread-count`
    ] as const;
    }

    
export const getGetApiNotificationsUnreadCountInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiNotificationsUnreadCountInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>> = ({ signal }) => getApiNotificationsUnreadCount(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiNotificationsUnreadCountInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>
export type GetApiNotificationsUnreadCountInfiniteQueryError = ErrorType<unknown>


export function useGetApiNotificationsUnreadCountInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotificationsUnreadCountInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotificationsUnreadCountInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy số lượng thông báo chưa đọc
 */

export function useGetApiNotificationsUnreadCountInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiNotificationsUnreadCountInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiNotificationsUnreadCountQueryOptions = <TData = Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiNotificationsUnreadCountQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>> = ({ signal }) => getApiNotificationsUnreadCount(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiNotificationsUnreadCountQueryResult = NonNullable<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>>
export type GetApiNotificationsUnreadCountQueryError = ErrorType<unknown>


export function useGetApiNotificationsUnreadCount<TData = Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotificationsUnreadCount<TData = Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiNotificationsUnreadCount<TData = Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy số lượng thông báo chưa đọc
 */

export function useGetApiNotificationsUnreadCount<TData = Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiNotificationsUnreadCount>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiNotificationsUnreadCountQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Đánh dấu tất cả thông báo là đã đọc
 */
export const patchApiNotificationsReadAll = (
    
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/notifications/read-all`, method: 'PATCH'
    },
      );
    }
  


export const getPatchApiNotificationsReadAllMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiNotificationsReadAll>>, TError,void, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof patchApiNotificationsReadAll>>, TError,void, TContext> => {

const mutationKey = ['patchApiNotificationsReadAll'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiNotificationsReadAll>>, void> = () => {
          

          return  patchApiNotificationsReadAll()
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PatchApiNotificationsReadAllMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiNotificationsReadAll>>>
    
    export type PatchApiNotificationsReadAllMutationError = ErrorType<unknown>

    /**
 * @summary Đánh dấu tất cả thông báo là đã đọc
 */
export const usePatchApiNotificationsReadAll = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiNotificationsReadAll>>, TError,void, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiNotificationsReadAll>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPatchApiNotificationsReadAllMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Đánh dấu một thông báo là đã đọc
 */
export const patchApiNotificationsIdRead = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/notifications/${id}/read`, method: 'PATCH'
    },
      );
    }
  


export const getPatchApiNotificationsIdReadMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiNotificationsIdRead>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof patchApiNotificationsIdRead>>, TError,{id: string}, TContext> => {

const mutationKey = ['patchApiNotificationsIdRead'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiNotificationsIdRead>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  patchApiNotificationsIdRead(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PatchApiNotificationsIdReadMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiNotificationsIdRead>>>
    
    export type PatchApiNotificationsIdReadMutationError = ErrorType<unknown>

    /**
 * @summary Đánh dấu một thông báo là đã đọc
 */
export const usePatchApiNotificationsIdRead = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiNotificationsIdRead>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiNotificationsIdRead>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getPatchApiNotificationsIdReadMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xóa một thông báo
 */
export const deleteApiNotificationsId = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/notifications/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiNotificationsIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiNotificationsId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiNotificationsId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiNotificationsId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiNotificationsId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiNotificationsId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiNotificationsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiNotificationsId>>>
    
    export type DeleteApiNotificationsIdMutationError = ErrorType<unknown>

    /**
 * @summary Xóa một thông báo
 */
export const useDeleteApiNotificationsId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiNotificationsId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiNotificationsId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiNotificationsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    