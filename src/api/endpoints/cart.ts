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
  Cart,
  DeleteApiCartBody,
  PostApiCartBody,
  PutApiCartBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Lấy thông tin giỏ hàng của người dùng
 */
export const getApiCart = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Cart>(
      {url: `/api/cart`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCartInfiniteQueryKey = () => {
    return [
    'infinite', `/api/cart`
    ] as const;
    }

export const getGetApiCartQueryKey = () => {
    return [
    `/api/cart`
    ] as const;
    }

    
export const getGetApiCartInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCart>>>, TError = ErrorType<void>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCartInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCart>>> = ({ signal }) => getApiCart(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCartInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCart>>>
export type GetApiCartInfiniteQueryError = ErrorType<void>


export function useGetApiCartInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCart>>>, TError = ErrorType<void>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCart>>,
          TError,
          Awaited<ReturnType<typeof getApiCart>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCartInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCart>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCart>>,
          TError,
          Awaited<ReturnType<typeof getApiCart>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCartInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCart>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin giỏ hàng của người dùng
 */

export function useGetApiCartInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCart>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCartInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCartQueryOptions = <TData = Awaited<ReturnType<typeof getApiCart>>, TError = ErrorType<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCartQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCart>>> = ({ signal }) => getApiCart(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCartQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCart>>>
export type GetApiCartQueryError = ErrorType<void>


export function useGetApiCart<TData = Awaited<ReturnType<typeof getApiCart>>, TError = ErrorType<void>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCart>>,
          TError,
          Awaited<ReturnType<typeof getApiCart>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCart<TData = Awaited<ReturnType<typeof getApiCart>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCart>>,
          TError,
          Awaited<ReturnType<typeof getApiCart>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCart<TData = Awaited<ReturnType<typeof getApiCart>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin giỏ hàng của người dùng
 */

export function useGetApiCart<TData = Awaited<ReturnType<typeof getApiCart>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCart>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCartQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Thêm sản phẩm vào giỏ hàng
 */
export const postApiCart = (
    postApiCartBody: BodyType<PostApiCartBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Cart>(
      {url: `/api/cart`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiCartBody, signal
    },
      );
    }
  


export const getPostApiCartMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCart>>, TError,{data: BodyType<PostApiCartBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiCart>>, TError,{data: BodyType<PostApiCartBody>}, TContext> => {

const mutationKey = ['postApiCart'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiCart>>, {data: BodyType<PostApiCartBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiCart(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCartMutationResult = NonNullable<Awaited<ReturnType<typeof postApiCart>>>
    export type PostApiCartMutationBody = BodyType<PostApiCartBody>
    export type PostApiCartMutationError = ErrorType<void>

    /**
 * @summary Thêm sản phẩm vào giỏ hàng
 */
export const usePostApiCart = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCart>>, TError,{data: BodyType<PostApiCartBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiCart>>,
        TError,
        {data: BodyType<PostApiCartBody>},
        TContext
      > => {

      const mutationOptions = getPostApiCartMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Cập nhật số lượng sản phẩm trong giỏ hàng
 */
export const putApiCart = (
    putApiCartBody: BodyType<PutApiCartBody>,
 ) => {
      
      
      return mainInstance<Cart>(
      {url: `/api/cart`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiCartBody
    },
      );
    }
  


export const getPutApiCartMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCart>>, TError,{data: BodyType<PutApiCartBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiCart>>, TError,{data: BodyType<PutApiCartBody>}, TContext> => {

const mutationKey = ['putApiCart'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCart>>, {data: BodyType<PutApiCartBody>}> = (props) => {
          const {data} = props ?? {};

          return  putApiCart(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCartMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCart>>>
    export type PutApiCartMutationBody = BodyType<PutApiCartBody>
    export type PutApiCartMutationError = ErrorType<void>

    /**
 * @summary Cập nhật số lượng sản phẩm trong giỏ hàng
 */
export const usePutApiCart = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCart>>, TError,{data: BodyType<PutApiCartBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiCart>>,
        TError,
        {data: BodyType<PutApiCartBody>},
        TContext
      > => {

      const mutationOptions = getPutApiCartMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xóa sản phẩm khỏi giỏ hàng
 */
export const deleteApiCart = (
    deleteApiCartBody: BodyType<DeleteApiCartBody>,
 ) => {
      
      
      return mainInstance<Cart>(
      {url: `/api/cart`, method: 'DELETE',
      headers: {'Content-Type': 'application/json', },
      data: deleteApiCartBody
    },
      );
    }
  


export const getDeleteApiCartMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCart>>, TError,{data: BodyType<DeleteApiCartBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiCart>>, TError,{data: BodyType<DeleteApiCartBody>}, TContext> => {

const mutationKey = ['deleteApiCart'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiCart>>, {data: BodyType<DeleteApiCartBody>}> = (props) => {
          const {data} = props ?? {};

          return  deleteApiCart(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiCartMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiCart>>>
    export type DeleteApiCartMutationBody = BodyType<DeleteApiCartBody>
    export type DeleteApiCartMutationError = ErrorType<void>

    /**
 * @summary Xóa sản phẩm khỏi giỏ hàng
 */
export const useDeleteApiCart = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiCart>>, TError,{data: BodyType<DeleteApiCartBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiCart>>,
        TError,
        {data: BodyType<DeleteApiCartBody>},
        TContext
      > => {

      const mutationOptions = getDeleteApiCartMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    