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
  GetApiCategories200,
  GetApiCategoriesAllFlat200,
  GetApiCategoriesAllFlatParams,
  GetApiCategoriesAllTree200,
  GetApiCategoriesAllTreeParams,
  GetApiCategoriesId200,
  GetApiCategoriesIdChildren200,
  GetApiCategoriesIdChildrenParams,
  GetApiCategoriesIdWithChildren200,
  GetApiCategoriesIdWithChildrenParams,
  GetApiCategoriesParams,
  PostApiCategoriesBody,
  PutApiCategoriesIdBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Tạo mới danh mục
 */
export const postApiCategories = (
    postApiCategoriesBody: BodyType<PostApiCategoriesBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Category>(
      {url: `/api/categories`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiCategoriesBody, signal
    },
      );
    }
  


export const getPostApiCategoriesMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCategories>>, TError,{data: BodyType<PostApiCategoriesBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiCategories>>, TError,{data: BodyType<PostApiCategoriesBody>}, TContext> => {

const mutationKey = ['postApiCategories'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiCategories>>, {data: BodyType<PostApiCategoriesBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiCategories(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCategoriesMutationResult = NonNullable<Awaited<ReturnType<typeof postApiCategories>>>
    export type PostApiCategoriesMutationBody = BodyType<PostApiCategoriesBody>
    export type PostApiCategoriesMutationError = ErrorType<void>

    /**
 * @summary Tạo mới danh mục
 */
export const usePostApiCategories = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCategories>>, TError,{data: BodyType<PostApiCategoriesBody>}, TContext>, }
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
 * @summary Lấy danh sách tất cả danh mục gốc (không có parentId)
 */
export const getApiCategories = (
    params?: GetApiCategoriesParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCategories200>(
      {url: `/api/categories`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCategoriesInfiniteQueryKey = (params?: GetApiCategoriesParams,) => {
    return [
    'infinite', `/api/categories`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCategoriesQueryKey = (params?: GetApiCategoriesParams,) => {
    return [
    `/api/categories`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCategoriesInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>, GetApiCategoriesParams['page']>, TError = ErrorType<unknown>>(params?: GetApiCategoriesParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData, QueryKey, GetApiCategoriesParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategories>>, QueryKey, GetApiCategoriesParams['page']> = ({ signal, pageParam }) => getApiCategories({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData, QueryKey, GetApiCategoriesParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategories>>>
export type GetApiCategoriesInfiniteQueryError = ErrorType<unknown>


export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>, GetApiCategoriesParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCategoriesParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData, QueryKey, GetApiCategoriesParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>, GetApiCategoriesParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData, QueryKey, GetApiCategoriesParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>, GetApiCategoriesParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData, QueryKey, GetApiCategoriesParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả danh mục gốc (không có parentId)
 */

export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>, GetApiCategoriesParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData, QueryKey, GetApiCategoriesParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(params?: GetApiCategoriesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategories>>> = ({ signal }) => getApiCategories(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategories>>>
export type GetApiCategoriesQueryError = ErrorType<unknown>


export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCategoriesParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả danh mục gốc (không có parentId)
 */

export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy tất cả danh mục (dạng danh sách phẳng, bao gồm danh mục con)
 */
export const getApiCategoriesAllFlat = (
    params?: GetApiCategoriesAllFlatParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCategoriesAllFlat200>(
      {url: `/api/categories/all/flat`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCategoriesAllFlatInfiniteQueryKey = (params?: GetApiCategoriesAllFlatParams,) => {
    return [
    'infinite', `/api/categories/all/flat`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCategoriesAllFlatQueryKey = (params?: GetApiCategoriesAllFlatParams,) => {
    return [
    `/api/categories/all/flat`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCategoriesAllFlatInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, GetApiCategoriesAllFlatParams['page']>, TError = ErrorType<unknown>>(params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData, QueryKey, GetApiCategoriesAllFlatParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllFlatInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, QueryKey, GetApiCategoriesAllFlatParams['page']> = ({ signal, pageParam }) => getApiCategoriesAllFlat({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData, QueryKey, GetApiCategoriesAllFlatParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllFlatInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>
export type GetApiCategoriesAllFlatInfiniteQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, GetApiCategoriesAllFlatParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCategoriesAllFlatParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData, QueryKey, GetApiCategoriesAllFlatParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, GetApiCategoriesAllFlatParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData, QueryKey, GetApiCategoriesAllFlatParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, GetApiCategoriesAllFlatParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData, QueryKey, GetApiCategoriesAllFlatParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả danh mục (dạng danh sách phẳng, bao gồm danh mục con)
 */

export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, GetApiCategoriesAllFlatParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData, QueryKey, GetApiCategoriesAllFlatParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllFlatInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesAllFlatQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllFlatQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>> = ({ signal }) => getApiCategoriesAllFlat(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllFlatQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>
export type GetApiCategoriesAllFlatQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCategoriesAllFlatParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả danh mục (dạng danh sách phẳng, bao gồm danh mục con)
 */

export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllFlatParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllFlatQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy cây danh mục (dạng phân cấp, hierarchical)
 */
export const getApiCategoriesAllTree = (
    params?: GetApiCategoriesAllTreeParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCategoriesAllTree200>(
      {url: `/api/categories/all/tree`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCategoriesAllTreeInfiniteQueryKey = (params?: GetApiCategoriesAllTreeParams,) => {
    return [
    'infinite', `/api/categories/all/tree`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCategoriesAllTreeQueryKey = (params?: GetApiCategoriesAllTreeParams,) => {
    return [
    `/api/categories/all/tree`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCategoriesAllTreeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, GetApiCategoriesAllTreeParams['page']>, TError = ErrorType<unknown>>(params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData, QueryKey, GetApiCategoriesAllTreeParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllTreeInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, QueryKey, GetApiCategoriesAllTreeParams['page']> = ({ signal, pageParam }) => getApiCategoriesAllTree({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData, QueryKey, GetApiCategoriesAllTreeParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllTreeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>
export type GetApiCategoriesAllTreeInfiniteQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, GetApiCategoriesAllTreeParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCategoriesAllTreeParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData, QueryKey, GetApiCategoriesAllTreeParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, GetApiCategoriesAllTreeParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData, QueryKey, GetApiCategoriesAllTreeParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, GetApiCategoriesAllTreeParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData, QueryKey, GetApiCategoriesAllTreeParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy cây danh mục (dạng phân cấp, hierarchical)
 */

export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, GetApiCategoriesAllTreeParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData, QueryKey, GetApiCategoriesAllTreeParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllTreeInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesAllTreeQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllTreeQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllTree>>> = ({ signal }) => getApiCategoriesAllTree(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllTreeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>
export type GetApiCategoriesAllTreeQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiCategoriesAllTreeParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy cây danh mục (dạng phân cấp, hierarchical)
 */

export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
 params?: GetApiCategoriesAllTreeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllTreeQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy danh mục con của một danh mục cụ thể
 */
export const getApiCategoriesIdChildren = (
    id: string,
    params?: GetApiCategoriesIdChildrenParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCategoriesIdChildren200>(
      {url: `/api/categories/${id}/children`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCategoriesIdChildrenInfiniteQueryKey = (id?: string,
    params?: GetApiCategoriesIdChildrenParams,) => {
    return [
    'infinite', `/api/categories/${id}/children`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCategoriesIdChildrenQueryKey = (id?: string,
    params?: GetApiCategoriesIdChildrenParams,) => {
    return [
    `/api/categories/${id}/children`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCategoriesIdChildrenInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, GetApiCategoriesIdChildrenParams['page']>, TError = ErrorType<void>>(id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData, QueryKey, GetApiCategoriesIdChildrenParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdChildrenInfiniteQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, QueryKey, GetApiCategoriesIdChildrenParams['page']> = ({ signal, pageParam }) => getApiCategoriesIdChildren(id,{...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData, QueryKey, GetApiCategoriesIdChildrenParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdChildrenInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>
export type GetApiCategoriesIdChildrenInfiniteQueryError = ErrorType<void>


export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, GetApiCategoriesIdChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params: undefined |  GetApiCategoriesIdChildrenParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData, QueryKey, GetApiCategoriesIdChildrenParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, GetApiCategoriesIdChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData, QueryKey, GetApiCategoriesIdChildrenParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, GetApiCategoriesIdChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData, QueryKey, GetApiCategoriesIdChildrenParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh mục con của một danh mục cụ thể
 */

export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, GetApiCategoriesIdChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData, QueryKey, GetApiCategoriesIdChildrenParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdChildrenInfiniteQueryOptions(id,params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesIdChildrenQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdChildrenQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>> = ({ signal }) => getApiCategoriesIdChildren(id,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdChildrenQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>
export type GetApiCategoriesIdChildrenQueryError = ErrorType<void>


export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string,
    params: undefined |  GetApiCategoriesIdChildrenParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh mục con của một danh mục cụ thể
 */

export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdChildrenQueryOptions(id,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy thông tin chi tiết một danh mục kèm danh mục con
 */
export const getApiCategoriesIdWithChildren = (
    id: string,
    params?: GetApiCategoriesIdWithChildrenParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCategoriesIdWithChildren200>(
      {url: `/api/categories/${id}/with-children`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCategoriesIdWithChildrenInfiniteQueryKey = (id?: string,
    params?: GetApiCategoriesIdWithChildrenParams,) => {
    return [
    'infinite', `/api/categories/${id}/with-children`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCategoriesIdWithChildrenQueryKey = (id?: string,
    params?: GetApiCategoriesIdWithChildrenParams,) => {
    return [
    `/api/categories/${id}/with-children`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCategoriesIdWithChildrenInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, GetApiCategoriesIdWithChildrenParams['page']>, TError = ErrorType<void>>(id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData, QueryKey, GetApiCategoriesIdWithChildrenParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdWithChildrenInfiniteQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, QueryKey, GetApiCategoriesIdWithChildrenParams['page']> = ({ signal, pageParam }) => getApiCategoriesIdWithChildren(id,{...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData, QueryKey, GetApiCategoriesIdWithChildrenParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdWithChildrenInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>
export type GetApiCategoriesIdWithChildrenInfiniteQueryError = ErrorType<void>


export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, GetApiCategoriesIdWithChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params: undefined |  GetApiCategoriesIdWithChildrenParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData, QueryKey, GetApiCategoriesIdWithChildrenParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, GetApiCategoriesIdWithChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData, QueryKey, GetApiCategoriesIdWithChildrenParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, GetApiCategoriesIdWithChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData, QueryKey, GetApiCategoriesIdWithChildrenParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục kèm danh mục con
 */

export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, GetApiCategoriesIdWithChildrenParams['page']>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData, QueryKey, GetApiCategoriesIdWithChildrenParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdWithChildrenInfiniteQueryOptions(id,params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesIdWithChildrenQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdWithChildrenQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>> = ({ signal }) => getApiCategoriesIdWithChildren(id,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdWithChildrenQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>
export type GetApiCategoriesIdWithChildrenQueryError = ErrorType<void>


export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string,
    params: undefined |  GetApiCategoriesIdWithChildrenParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục kèm danh mục con
 */

export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string,
    params?: GetApiCategoriesIdWithChildrenParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdWithChildrenQueryOptions(id,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy thông tin chi tiết một danh mục
 */
export const getApiCategoriesId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiCategoriesId200>(
      {url: `/api/categories/${id}`, method: 'GET', signal
    },
      );
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

    
export const getGetApiCategoriesIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesId>>> = ({ signal }) => getApiCategoriesId(id, signal);

      

      

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
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesId>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục
 */

export function useGetApiCategoriesIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesId>>> = ({ signal }) => getApiCategoriesId(id, signal);

      

      

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
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesId>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục
 */

export function useGetApiCategoriesId<TData = Awaited<ReturnType<typeof getApiCategoriesId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesId>>, TError, TData>>, }
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
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/categories/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiCategoriesIdBody
    },
      );
    }
  


export const getPutApiCategoriesIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCategoriesId>>, TError,{id: string;data: BodyType<PutApiCategoriesIdBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiCategoriesId>>, TError,{id: string;data: BodyType<PutApiCategoriesIdBody>}, TContext> => {

const mutationKey = ['putApiCategoriesId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCategoriesId>>, {id: string;data: BodyType<PutApiCategoriesIdBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  putApiCategoriesId(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCategoriesIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCategoriesId>>>
    export type PutApiCategoriesIdMutationBody = BodyType<PutApiCategoriesIdBody>
    export type PutApiCategoriesIdMutationError = ErrorType<void>

    /**
 * @summary Cập nhật thông tin danh mục
 */
export const usePutApiCategoriesId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCategoriesId>>, TError,{id: string;data: BodyType<PutApiCategoriesIdBody>}, TContext>, }
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
 * Xóa các danh mục theo danh sách ID cách nhau bởi dấu phẩy. Các bài viết liên quan sẽ được đưa về trạng thái không có danh mục (null).
 * @summary Xóa một hoặc nhiều danh mục (cũng xóa tất cả danh mục con)
 */
export const deleteApiCategoriesId = (
    id: string,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/categories/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiCategoriesIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCategoriesId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiCategoriesId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiCategoriesId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiCategoriesId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiCategoriesId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiCategoriesIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiCategoriesId>>>
    
    export type DeleteApiCategoriesIdMutationError = ErrorType<void>

    /**
 * @summary Xóa một hoặc nhiều danh mục (cũng xóa tất cả danh mục con)
 */
export const useDeleteApiCategoriesId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCategoriesId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiCategoriesId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiCategoriesIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    