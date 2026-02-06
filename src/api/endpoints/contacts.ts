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
  GetApiContactsParams,
  PatchApiContactsIdReadBody,
  PostApiContactsBody,
  PostApiContactsExportSelectedBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Gửi thông tin liên hệ (Công khai)
 */
export const postApiContacts = (
    postApiContactsBody: BodyType<PostApiContactsBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiContactsBody, signal
    },
      );
    }
  


export const getPostApiContactsMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContacts>>, TError,{data: BodyType<PostApiContactsBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiContacts>>, TError,{data: BodyType<PostApiContactsBody>}, TContext> => {

const mutationKey = ['postApiContacts'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiContacts>>, {data: BodyType<PostApiContactsBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiContacts(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiContactsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiContacts>>>
    export type PostApiContactsMutationBody = BodyType<PostApiContactsBody>
    export type PostApiContactsMutationError = ErrorType<void>

    /**
 * @summary Gửi thông tin liên hệ (Công khai)
 */
export const usePostApiContacts = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContacts>>, TError,{data: BodyType<PostApiContactsBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiContacts>>,
        TError,
        {data: BodyType<PostApiContactsBody>},
        TContext
      > => {

      const mutationOptions = getPostApiContactsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách liên hệ (Admin)
 */
export const getApiContacts = (
    params?: GetApiContactsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiContactsInfiniteQueryKey = (params?: GetApiContactsParams,) => {
    return [
    'infinite', `/api/contacts`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiContactsQueryKey = (params?: GetApiContactsParams,) => {
    return [
    `/api/contacts`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiContactsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContacts>>, GetApiContactsParams['page']>, TError = ErrorType<unknown>>(params?: GetApiContactsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData, QueryKey, GetApiContactsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContactsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContacts>>, QueryKey, GetApiContactsParams['page']> = ({ signal, pageParam }) => getApiContacts({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData, QueryKey, GetApiContactsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContactsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContacts>>>
export type GetApiContactsInfiniteQueryError = ErrorType<unknown>


export function useGetApiContactsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContacts>>, GetApiContactsParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContactsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData, QueryKey, GetApiContactsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContacts>>,
          TError,
          Awaited<ReturnType<typeof getApiContacts>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContacts>>, GetApiContactsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContactsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData, QueryKey, GetApiContactsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContacts>>,
          TError,
          Awaited<ReturnType<typeof getApiContacts>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContacts>>, GetApiContactsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContactsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData, QueryKey, GetApiContactsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách liên hệ (Admin)
 */

export function useGetApiContactsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContacts>>, GetApiContactsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiContactsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData, QueryKey, GetApiContactsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContactsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContactsQueryOptions = <TData = Awaited<ReturnType<typeof getApiContacts>>, TError = ErrorType<unknown>>(params?: GetApiContactsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContactsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContacts>>> = ({ signal }) => getApiContacts(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContactsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContacts>>>
export type GetApiContactsQueryError = ErrorType<unknown>


export function useGetApiContacts<TData = Awaited<ReturnType<typeof getApiContacts>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiContactsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContacts>>,
          TError,
          Awaited<ReturnType<typeof getApiContacts>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContacts<TData = Awaited<ReturnType<typeof getApiContacts>>, TError = ErrorType<unknown>>(
 params?: GetApiContactsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContacts>>,
          TError,
          Awaited<ReturnType<typeof getApiContacts>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContacts<TData = Awaited<ReturnType<typeof getApiContacts>>, TError = ErrorType<unknown>>(
 params?: GetApiContactsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách liên hệ (Admin)
 */

export function useGetApiContacts<TData = Awaited<ReturnType<typeof getApiContacts>>, TError = ErrorType<unknown>>(
 params?: GetApiContactsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContacts>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContactsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Xuất Excel theo bộ lọc (Admin)
 */
export const getApiContactsExport = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts/export`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiContactsExportInfiniteQueryKey = () => {
    return [
    'infinite', `/api/contacts/export`
    ] as const;
    }

export const getGetApiContactsExportQueryKey = () => {
    return [
    `/api/contacts/export`
    ] as const;
    }

    
export const getGetApiContactsExportInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsExport>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContactsExportInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContactsExport>>> = ({ signal }) => getApiContactsExport(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContactsExportInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContactsExport>>>
export type GetApiContactsExportInfiniteQueryError = ErrorType<unknown>


export function useGetApiContactsExportInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsExport>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsExport>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsExport>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsExportInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsExport>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsExport>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsExport>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsExportInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsExport>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xuất Excel theo bộ lọc (Admin)
 */

export function useGetApiContactsExportInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsExport>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContactsExportInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContactsExportQueryOptions = <TData = Awaited<ReturnType<typeof getApiContactsExport>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContactsExportQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContactsExport>>> = ({ signal }) => getApiContactsExport(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContactsExportQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContactsExport>>>
export type GetApiContactsExportQueryError = ErrorType<unknown>


export function useGetApiContactsExport<TData = Awaited<ReturnType<typeof getApiContactsExport>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsExport>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsExport>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsExport<TData = Awaited<ReturnType<typeof getApiContactsExport>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsExport>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsExport>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsExport<TData = Awaited<ReturnType<typeof getApiContactsExport>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xuất Excel theo bộ lọc (Admin)
 */

export function useGetApiContactsExport<TData = Awaited<ReturnType<typeof getApiContactsExport>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsExport>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContactsExportQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Xuất Excel theo danh sách IDs chọn lọc (Admin)
 */
export const postApiContactsExportSelected = (
    postApiContactsExportSelectedBody: BodyType<PostApiContactsExportSelectedBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts/export/selected`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiContactsExportSelectedBody, signal
    },
      );
    }
  


export const getPostApiContactsExportSelectedMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContactsExportSelected>>, TError,{data: BodyType<PostApiContactsExportSelectedBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiContactsExportSelected>>, TError,{data: BodyType<PostApiContactsExportSelectedBody>}, TContext> => {

const mutationKey = ['postApiContactsExportSelected'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiContactsExportSelected>>, {data: BodyType<PostApiContactsExportSelectedBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiContactsExportSelected(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiContactsExportSelectedMutationResult = NonNullable<Awaited<ReturnType<typeof postApiContactsExportSelected>>>
    export type PostApiContactsExportSelectedMutationBody = BodyType<PostApiContactsExportSelectedBody>
    export type PostApiContactsExportSelectedMutationError = ErrorType<unknown>

    /**
 * @summary Xuất Excel theo danh sách IDs chọn lọc (Admin)
 */
export const usePostApiContactsExportSelected = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiContactsExportSelected>>, TError,{data: BodyType<PostApiContactsExportSelectedBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiContactsExportSelected>>,
        TError,
        {data: BodyType<PostApiContactsExportSelectedBody>},
        TContext
      > => {

      const mutationOptions = getPostApiContactsExportSelectedMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy chi tiết liên hệ và đánh dấu đã đọc (Admin)
 */
export const getApiContactsId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiContactsIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/contacts/${id}`
    ] as const;
    }

export const getGetApiContactsIdQueryKey = (id?: string,) => {
    return [
    `/api/contacts/${id}`
    ] as const;
    }

    
export const getGetApiContactsIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsId>>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContactsIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContactsId>>> = ({ signal }) => getApiContactsId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContactsIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContactsId>>>
export type GetApiContactsIdInfiniteQueryError = ErrorType<unknown>


export function useGetApiContactsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsId>>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsId>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsId>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy chi tiết liên hệ và đánh dấu đã đọc (Admin)
 */

export function useGetApiContactsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiContactsId>>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContactsIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiContactsIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiContactsId>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiContactsIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiContactsId>>> = ({ signal }) => getApiContactsId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiContactsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiContactsId>>>
export type GetApiContactsIdQueryError = ErrorType<unknown>


export function useGetApiContactsId<TData = Awaited<ReturnType<typeof getApiContactsId>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsId>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsId<TData = Awaited<ReturnType<typeof getApiContactsId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiContactsId>>,
          TError,
          Awaited<ReturnType<typeof getApiContactsId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiContactsId<TData = Awaited<ReturnType<typeof getApiContactsId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy chi tiết liên hệ và đánh dấu đã đọc (Admin)
 */

export function useGetApiContactsId<TData = Awaited<ReturnType<typeof getApiContactsId>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiContactsId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiContactsIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Xóa liên hệ (Admin)
 */
export const deleteApiContactsId = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiContactsIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiContactsId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiContactsId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiContactsId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiContactsId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiContactsId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiContactsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiContactsId>>>
    
    export type DeleteApiContactsIdMutationError = ErrorType<unknown>

    /**
 * @summary Xóa liên hệ (Admin)
 */
export const useDeleteApiContactsId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiContactsId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiContactsId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiContactsIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Cập nhật trạng thái đã đọc thủ công (Admin)
 */
export const patchApiContactsIdRead = (
    id: string,
    patchApiContactsIdReadBody: BodyType<PatchApiContactsIdReadBody>,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/contacts/${id}/read`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: patchApiContactsIdReadBody
    },
      );
    }
  


export const getPatchApiContactsIdReadMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiContactsIdRead>>, TError,{id: string;data: BodyType<PatchApiContactsIdReadBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof patchApiContactsIdRead>>, TError,{id: string;data: BodyType<PatchApiContactsIdReadBody>}, TContext> => {

const mutationKey = ['patchApiContactsIdRead'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiContactsIdRead>>, {id: string;data: BodyType<PatchApiContactsIdReadBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  patchApiContactsIdRead(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PatchApiContactsIdReadMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiContactsIdRead>>>
    export type PatchApiContactsIdReadMutationBody = BodyType<PatchApiContactsIdReadBody>
    export type PatchApiContactsIdReadMutationError = ErrorType<unknown>

    /**
 * @summary Cập nhật trạng thái đã đọc thủ công (Admin)
 */
export const usePatchApiContactsIdRead = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiContactsIdRead>>, TError,{id: string;data: BodyType<PatchApiContactsIdReadBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiContactsIdRead>>,
        TError,
        {id: string;data: BodyType<PatchApiContactsIdReadBody>},
        TContext
      > => {

      const mutationOptions = getPatchApiContactsIdReadMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    