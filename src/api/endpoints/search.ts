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
  GetApiSearch200,
  GetApiSearchParams,
  PostApiSearchSemantic200,
  PostApiSearchSemanticBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Tìm kiếm nội dung theo từ khóa
 */
export const getApiSearch = (
    params: GetApiSearchParams,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiSearch200>(
      {url: `/api/search`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getGetApiSearchInfiniteQueryKey = (params?: GetApiSearchParams,) => {
    return [
    'infinite', `/api/search`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiSearchQueryKey = (params?: GetApiSearchParams,) => {
    return [
    `/api/search`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiSearchInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiSearch>>, GetApiSearchParams['page']>, TError = ErrorType<unknown>>(params: GetApiSearchParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData, QueryKey, GetApiSearchParams['page']>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSearchInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSearch>>, QueryKey, GetApiSearchParams['page']> = ({ signal, pageParam }) => getApiSearch({...params, 'page': pageParam || params?.['page']}, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData, QueryKey, GetApiSearchParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSearchInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSearch>>>
export type GetApiSearchInfiniteQueryError = ErrorType<unknown>


export function useGetApiSearchInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSearch>>, GetApiSearchParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData, QueryKey, GetApiSearchParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSearch>>,
          TError,
          Awaited<ReturnType<typeof getApiSearch>>, QueryKey
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSearchInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSearch>>, GetApiSearchParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData, QueryKey, GetApiSearchParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSearch>>,
          TError,
          Awaited<ReturnType<typeof getApiSearch>>, QueryKey
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSearchInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSearch>>, GetApiSearchParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData, QueryKey, GetApiSearchParams['page']>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Tìm kiếm nội dung theo từ khóa
 */

export function useGetApiSearchInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiSearch>>, GetApiSearchParams['page']>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData, QueryKey, GetApiSearchParams['page']>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSearchInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiSearchQueryOptions = <TData = Awaited<ReturnType<typeof getApiSearch>>, TError = ErrorType<unknown>>(params: GetApiSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiSearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSearch>>> = ({ signal }) => getApiSearch(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiSearchQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSearch>>>
export type GetApiSearchQueryError = ErrorType<unknown>


export function useGetApiSearch<TData = Awaited<ReturnType<typeof getApiSearch>>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSearch>>,
          TError,
          Awaited<ReturnType<typeof getApiSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSearch<TData = Awaited<ReturnType<typeof getApiSearch>>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiSearch>>,
          TError,
          Awaited<ReturnType<typeof getApiSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiSearch<TData = Awaited<ReturnType<typeof getApiSearch>>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Tìm kiếm nội dung theo từ khóa
 */

export function useGetApiSearch<TData = Awaited<ReturnType<typeof getApiSearch>>, TError = ErrorType<unknown>>(
 params: GetApiSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiSearch>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiSearchQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Tìm kiếm nội dung bằng mô tả (AI sau này)
 */
export const postApiSearchSemantic = (
    postApiSearchSemanticBody: BodyType<PostApiSearchSemanticBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiSearchSemantic200>(
      {url: `/api/search/semantic`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiSearchSemanticBody, signal
    },
      options);
    }
  


export const getPostApiSearchSemanticMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiSearchSemantic>>, TError,{data: BodyType<PostApiSearchSemanticBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiSearchSemantic>>, TError,{data: BodyType<PostApiSearchSemanticBody>}, TContext> => {

const mutationKey = ['postApiSearchSemantic'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiSearchSemantic>>, {data: BodyType<PostApiSearchSemanticBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiSearchSemantic(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiSearchSemanticMutationResult = NonNullable<Awaited<ReturnType<typeof postApiSearchSemantic>>>
    export type PostApiSearchSemanticMutationBody = BodyType<PostApiSearchSemanticBody>
    export type PostApiSearchSemanticMutationError = ErrorType<unknown>

    /**
 * @summary Tìm kiếm nội dung bằng mô tả (AI sau này)
 */
export const usePostApiSearchSemantic = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiSearchSemantic>>, TError,{data: BodyType<PostApiSearchSemanticBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiSearchSemantic>>,
        TError,
        {data: BodyType<PostApiSearchSemanticBody>},
        TContext
      > => {

      const mutationOptions = getPostApiSearchSemanticMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    