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
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Category[]>(
      {url: `/api/categories`, method: 'GET', signal
    },
      );
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

    
export const getGetApiCategoriesInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategories>>> = ({ signal }) => getApiCategories(signal);

      

      

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
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả danh mục gốc (không có parentId)
 */

export function useGetApiCategoriesInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategories>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategories>>> = ({ signal }) => getApiCategories(signal);

      

      

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
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategories>>,
          TError,
          Awaited<ReturnType<typeof getApiCategories>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả danh mục gốc (không có parentId)
 */

export function useGetApiCategories<TData = Awaited<ReturnType<typeof getApiCategories>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategories>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy tất cả danh mục (dạng danh sách phẳng, bao gồm danh mục con)
 */
export const getApiCategoriesAllFlat = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Category[]>(
      {url: `/api/categories/all/flat`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCategoriesAllFlatInfiniteQueryKey = () => {
    return [
    'infinite', `/api/categories/all/flat`
    ] as const;
    }

export const getGetApiCategoriesAllFlatQueryKey = () => {
    return [
    `/api/categories/all/flat`
    ] as const;
    }

    
export const getGetApiCategoriesAllFlatInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllFlatInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>> = ({ signal }) => getApiCategoriesAllFlat(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllFlatInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>
export type GetApiCategoriesAllFlatInfiniteQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả danh mục (dạng danh sách phẳng, bao gồm danh mục con)
 */

export function useGetApiCategoriesAllFlatInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllFlatInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesAllFlatQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllFlatQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>> = ({ signal }) => getApiCategoriesAllFlat(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllFlatQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>>
export type GetApiCategoriesAllFlatQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllFlat>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy tất cả danh mục (dạng danh sách phẳng, bao gồm danh mục con)
 */

export function useGetApiCategoriesAllFlat<TData = Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllFlat>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllFlatQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy cây danh mục (dạng phân cấp, hierarchical)
 */
export const getApiCategoriesAllTree = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/categories/all/tree`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCategoriesAllTreeInfiniteQueryKey = () => {
    return [
    'infinite', `/api/categories/all/tree`
    ] as const;
    }

export const getGetApiCategoriesAllTreeQueryKey = () => {
    return [
    `/api/categories/all/tree`
    ] as const;
    }

    
export const getGetApiCategoriesAllTreeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllTreeInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllTree>>> = ({ signal }) => getApiCategoriesAllTree(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllTreeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>
export type GetApiCategoriesAllTreeInfiniteQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy cây danh mục (dạng phân cấp, hierarchical)
 */

export function useGetApiCategoriesAllTreeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllTreeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesAllTreeQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesAllTreeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesAllTree>>> = ({ signal }) => getApiCategoriesAllTree(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesAllTreeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesAllTree>>>
export type GetApiCategoriesAllTreeQueryError = ErrorType<unknown>


export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesAllTree>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy cây danh mục (dạng phân cấp, hierarchical)
 */

export function useGetApiCategoriesAllTree<TData = Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesAllTree>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesAllTreeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy danh mục con của một danh mục cụ thể
 */
export const getApiCategoriesIdChildren = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/categories/${id}/children`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCategoriesIdChildrenInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/categories/${id}/children`
    ] as const;
    }

export const getGetApiCategoriesIdChildrenQueryKey = (id?: string,) => {
    return [
    `/api/categories/${id}/children`
    ] as const;
    }

    
export const getGetApiCategoriesIdChildrenInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdChildrenInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>> = ({ signal }) => getApiCategoriesIdChildren(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdChildrenInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>
export type GetApiCategoriesIdChildrenInfiniteQueryError = ErrorType<void>


export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh mục con của một danh mục cụ thể
 */

export function useGetApiCategoriesIdChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdChildrenInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesIdChildrenQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdChildrenQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>> = ({ signal }) => getApiCategoriesIdChildren(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdChildrenQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>>
export type GetApiCategoriesIdChildrenQueryError = ErrorType<void>


export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh mục con của một danh mục cụ thể
 */

export function useGetApiCategoriesIdChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdChildren>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdChildrenQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy thông tin chi tiết một danh mục kèm danh mục con
 */
export const getApiCategoriesIdWithChildren = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/categories/${id}/with-children`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCategoriesIdWithChildrenInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/categories/${id}/with-children`
    ] as const;
    }

export const getGetApiCategoriesIdWithChildrenQueryKey = (id?: string,) => {
    return [
    `/api/categories/${id}/with-children`
    ] as const;
    }

    
export const getGetApiCategoriesIdWithChildrenInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdWithChildrenInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>> = ({ signal }) => getApiCategoriesIdWithChildren(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdWithChildrenInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>
export type GetApiCategoriesIdWithChildrenInfiniteQueryError = ErrorType<void>


export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục kèm danh mục con
 */

export function useGetApiCategoriesIdWithChildrenInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdWithChildrenInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCategoriesIdWithChildrenQueryOptions = <TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCategoriesIdWithChildrenQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>> = ({ signal }) => getApiCategoriesIdWithChildren(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCategoriesIdWithChildrenQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>>
export type GetApiCategoriesIdWithChildrenQueryError = ErrorType<void>


export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>,
          TError,
          Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết một danh mục kèm danh mục con
 */

export function useGetApiCategoriesIdWithChildren<TData = Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCategoriesIdWithChildren>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCategoriesIdWithChildrenQueryOptions(id,options)

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
      
      
      return mainInstance<void>(
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
 * @summary Xóa một danh mục (cũng xóa tất cả danh mục con)
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
 * @summary Xóa một danh mục (cũng xóa tất cả danh mục con)
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
    