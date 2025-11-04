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
  Category,
  DeleteApiCategoriesId200,
  PostApiCategoriesBody,
  PutApiCategoriesIdBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Tạo mới danh mục
 */
export const postApiCategories = (
    postApiCategoriesBody: BodyType<PostApiCategoriesBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<Category>(
      {url: `/api/categories`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiCategoriesBody, signal
    },
      options);
    }
  


export const getPostApiCategoriesMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCategories>>, TError,{data: BodyType<PostApiCategoriesBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiCategories>>, TError,{data: BodyType<PostApiCategoriesBody>}, TContext> => {

const mutationKey = ['postApiCategories'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiCategories>>, {data: BodyType<PostApiCategoriesBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiCategories(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCategoriesMutationResult = NonNullable<Awaited<ReturnType<typeof postApiCategories>>>
    export type PostApiCategoriesMutationBody = BodyType<PostApiCategoriesBody>
    export type PostApiCategoriesMutationError = ErrorType<void>

    /**
 * @summary Tạo mới danh mục
 */
export const usePostApiCategories = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCategories>>, TError,{data: BodyType<PostApiCategoriesBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiCategories>>,
        TError,
        {data: BodyType<PostApiCategoriesBody>},
        TContext
      > => {

      const mutationOptions = getPostApiCategoriesMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách tất cả danh mục
 */
export const getApiCategories = (
    
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<Category[]>(
      {url: `/api/categories`, method: 'GET', signal
    },
      options);
    }
  



export const getGetApiCategoriesInfiniteQueryKey = () => {
    return [
    'infinite', `/api/categories`
    ] as const;
    }

export const getGetApiCategoriesQueryKey = () => {
    return [
    `/api/categories`
    ] as const;
    }

    
export const getGetApiCategoriesInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategories>>> = ({ signal }) => getApiCategories(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategories>>>
export type GetApiCategoriesInfiniteQueryError = ErrorType<unknown>


export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả danh mục
 */

export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategories>>> = ({ signal }) => getApiCategories(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategories>>>
export type GetApiCategoriesQueryError = ErrorType<unknown>


export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả danh mục
 */

export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy thông tin chi tiết một danh mục
 */
export const getApiCategoriesId = (
    id: string,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<Category>(
      {url: `/api/categories/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getGetApiCategoriesIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/categories/${id}`
    ] as const;
    }

export const getGetApiCategoriesIdQueryKey = (id?: string,) => {
    return [
    `/api/categories/${id}`
    ] as const;
    }

    
export const getGetApiCategoriesIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesId>>> = ({ signal }) => getApiCategoriesId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesId>>>
export type GetApiCategoriesIdInfiniteQueryError = ErrorType<void>


export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesId>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesId>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục
 */

export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesId>>> = ({ signal }) => getApiCategoriesId(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesId>>>
export type GetApiCategoriesIdQueryError = ErrorType<void>


export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesId>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesId>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesId>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục
 */

export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Cập nhật thông tin danh mục
 */
export const putApiCategoriesId = (
    id: string,
    putApiCategoriesIdBody: BodyType<PutApiCategoriesIdBody>,
 options?: SecondParameter<typeof mainInstance>,) => {
      
      
      return mainInstance<Category>(
      {url: `/api/categories/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiCategoriesIdBody
    },
      options);
    }
  


export const getPutApiCategoriesIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCategoriesId>>, TError,{id: string;data: BodyType<PutApiCategoriesIdBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof putApiCategoriesId>>, TError,{id: string;data: BodyType<PutApiCategoriesIdBody>}, TContext> => {

const mutationKey = ['putApiCategoriesId'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCategoriesId>>, {id: string;data: BodyType<PutApiCategoriesIdBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiCategoriesId(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCategoriesIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCategoriesId>>>
    export type PutApiCategoriesIdMutationBody = BodyType<PutApiCategoriesIdBody>
    export type PutApiCategoriesIdMutationError = ErrorType<void>

    /**
 * @summary Cập nhật thông tin danh mục
 */
export const usePutApiCategoriesId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCategoriesId>>, TError,{id: string;data: BodyType<PutApiCategoriesIdBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiCategoriesId>>,
        TError,
        {id: string;data: BodyType<PutApiCategoriesIdBody>},
        TContext
      > => {

      const mutationOptions = getPutApiCategoriesIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xóa một danh mục
 */
export const deleteApiCategoriesId = (
    id: string,
 options?: SecondParameter<typeof mainInstance>,) => {
      
      
      return mainInstance<DeleteApiCategoriesId200>(
      {url: `/api/categories/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteApiCategoriesIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCategoriesId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiCategoriesId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiCategoriesId'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiCategoriesId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiCategoriesId(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiCategoriesIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiCategoriesId>>>
    
    export type DeleteApiCategoriesIdMutationError = ErrorType<void>

    /**
 * @summary Xóa một danh mục
 */
export const useDeleteApiCategoriesId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCategoriesId>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiCategoriesId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiCategoriesIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    