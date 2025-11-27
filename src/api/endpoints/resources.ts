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
  CreateResourceInput,
  DeleteApiResourcesId200,
  GetApiResources200,
  GetApiResourcesSuggest200,
  GetApiResourcesSuggestParams,
  PostApiResources201,
  PutApiResourcesId200
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Lấy danh sách tất cả tài nguyên phần mềm
 */
export const getApiResources = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiResources200>(
      {url: `/api/resources`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiResourcesInfiniteQueryKey = () => {
    return [
    'infinite', `/api/resources`
    ] as const;
    }

export const getGetApiResourcesQueryKey = () => {
    return [
    `/api/resources`
    ] as const;
    }

    
export const getGetApiResourcesInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiResources>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiResourcesInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiResources>>> = ({ signal }) => getApiResources(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiResourcesInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiResources>>>
export type GetApiResourcesInfiniteQueryError = ErrorType<unknown>


export function useGetApiResourcesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResources>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResources>>,
          TError,
          Awaited<ReturnType<typeof getApiResources>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResourcesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResources>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResources>>,
          TError,
          Awaited<ReturnType<typeof getApiResources>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResourcesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResources>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả tài nguyên phần mềm
 */

export function useGetApiResourcesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResources>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiResourcesInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiResourcesQueryOptions = <TData = Awaited<ReturnType<typeof getApiResources>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiResourcesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiResources>>> = ({ signal }) => getApiResources(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiResourcesQueryResult = NonNullable<Awaited<ReturnType<typeof getApiResources>>>
export type GetApiResourcesQueryError = ErrorType<unknown>


export function useGetApiResources<TData = Awaited<ReturnType<typeof getApiResources>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResources>>,
          TError,
          Awaited<ReturnType<typeof getApiResources>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResources<TData = Awaited<ReturnType<typeof getApiResources>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResources>>,
          TError,
          Awaited<ReturnType<typeof getApiResources>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResources<TData = Awaited<ReturnType<typeof getApiResources>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả tài nguyên phần mềm
 */

export function useGetApiResources<TData = Awaited<ReturnType<typeof getApiResources>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResources>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiResourcesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Thêm mới tài nguyên phần mềm (Admin)
 */
export const postApiResources = (
    createResourceInput: BodyType<CreateResourceInput>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiResources201>(
      {url: `/api/resources`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createResourceInput, signal
    },
      );
    }
  


export const getPostApiResourcesMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiResources>>, TError,{data: BodyType<CreateResourceInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiResources>>, TError,{data: BodyType<CreateResourceInput>}, TContext> => {

const mutationKey = ['postApiResources'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiResources>>, {data: BodyType<CreateResourceInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiResources(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiResourcesMutationResult = NonNullable<Awaited<ReturnType<typeof postApiResources>>>
    export type PostApiResourcesMutationBody = BodyType<CreateResourceInput>
    export type PostApiResourcesMutationError = ErrorType<unknown>

    /**
 * @summary Thêm mới tài nguyên phần mềm (Admin)
 */
export const usePostApiResources = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiResources>>, TError,{data: BodyType<CreateResourceInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiResources>>,
        TError,
        {data: BodyType<CreateResourceInput>},
        TContext
      > => {

      const mutationOptions = getPostApiResourcesMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Gợi ý phần mềm dựa trên phần mở rộng file
 */
export const getApiResourcesSuggest = (
    params: GetApiResourcesSuggestParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiResourcesSuggest200>(
      {url: `/api/resources/suggest`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiResourcesSuggestInfiniteQueryKey = (params?: GetApiResourcesSuggestParams,) => {
    return [
    'infinite', `/api/resources/suggest`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiResourcesSuggestQueryKey = (params?: GetApiResourcesSuggestParams,) => {
    return [
    `/api/resources/suggest`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiResourcesSuggestInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiResourcesSuggest>>, GetApiResourcesSuggestParams['page']>, TError = ErrorType<unknown>>(params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData, QueryKey, GetApiResourcesSuggestParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiResourcesSuggestInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiResourcesSuggest>>, QueryKey, GetApiResourcesSuggestParams['page']> = ({ signal, pageParam }) => getApiResourcesSuggest({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData, QueryKey, GetApiResourcesSuggestParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiResourcesSuggestInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiResourcesSuggest>>>
export type GetApiResourcesSuggestInfiniteQueryError = ErrorType<unknown>


export function useGetApiResourcesSuggestInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResourcesSuggest>>, GetApiResourcesSuggestParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData, QueryKey, GetApiResourcesSuggestParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResourcesSuggest>>,
          TError,
          Awaited<ReturnType<typeof getApiResourcesSuggest>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResourcesSuggestInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResourcesSuggest>>, GetApiResourcesSuggestParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData, QueryKey, GetApiResourcesSuggestParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResourcesSuggest>>,
          TError,
          Awaited<ReturnType<typeof getApiResourcesSuggest>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResourcesSuggestInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResourcesSuggest>>, GetApiResourcesSuggestParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData, QueryKey, GetApiResourcesSuggestParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Gợi ý phần mềm dựa trên phần mở rộng file
 */

export function useGetApiResourcesSuggestInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiResourcesSuggest>>, GetApiResourcesSuggestParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData, QueryKey, GetApiResourcesSuggestParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiResourcesSuggestInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiResourcesSuggestQueryOptions = <TData = Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError = ErrorType<unknown>>(params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiResourcesSuggestQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiResourcesSuggest>>> = ({ signal }) => getApiResourcesSuggest(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiResourcesSuggestQueryResult = NonNullable<Awaited<ReturnType<typeof getApiResourcesSuggest>>>
export type GetApiResourcesSuggestQueryError = ErrorType<unknown>


export function useGetApiResourcesSuggest<TData = Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResourcesSuggest>>,
          TError,
          Awaited<ReturnType<typeof getApiResourcesSuggest>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResourcesSuggest<TData = Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiResourcesSuggest>>,
          TError,
          Awaited<ReturnType<typeof getApiResourcesSuggest>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiResourcesSuggest<TData = Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Gợi ý phần mềm dựa trên phần mở rộng file
 */

export function useGetApiResourcesSuggest<TData = Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError = ErrorType<unknown>>(
 params: GetApiResourcesSuggestParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiResourcesSuggest>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiResourcesSuggestQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Cập nhật tài nguyên (Admin)
 */
export const putApiResourcesId = (
    id: string,
    createResourceInput: BodyType<CreateResourceInput>,
 ) => {
      
      
      return mainInstance<PutApiResourcesId200>(
      {url: `/api/resources/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: createResourceInput
    },
      );
    }
  


export const getPutApiResourcesIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiResourcesId>>, TError,{id: string;data: BodyType<CreateResourceInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiResourcesId>>, TError,{id: string;data: BodyType<CreateResourceInput>}, TContext> => {

const mutationKey = ['putApiResourcesId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiResourcesId>>, {id: string;data: BodyType<CreateResourceInput>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiResourcesId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiResourcesIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiResourcesId>>>
    export type PutApiResourcesIdMutationBody = BodyType<CreateResourceInput>
    export type PutApiResourcesIdMutationError = ErrorType<unknown>

    /**
 * @summary Cập nhật tài nguyên (Admin)
 */
export const usePutApiResourcesId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiResourcesId>>, TError,{id: string;data: BodyType<CreateResourceInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiResourcesId>>,
        TError,
        {id: string;data: BodyType<CreateResourceInput>},
        TContext
      > => {

      const mutationOptions = getPutApiResourcesIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xóa tài nguyên (Admin)
 */
export const deleteApiResourcesId = (
    id: string,
 ) => {
      
      
      return mainInstance<DeleteApiResourcesId200>(
      {url: `/api/resources/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiResourcesIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiResourcesId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiResourcesId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiResourcesId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiResourcesId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiResourcesId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiResourcesIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiResourcesId>>>
    
    export type DeleteApiResourcesIdMutationError = ErrorType<unknown>

    /**
 * @summary Xóa tài nguyên (Admin)
 */
export const useDeleteApiResourcesId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiResourcesId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiResourcesId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiResourcesIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    