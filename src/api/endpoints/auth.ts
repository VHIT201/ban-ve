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
  PostApiAuthLoginBody,
  PostApiAuthRegisterBody,
  User
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Đăng ký tài khoản mới
 */
export const postApiAuthRegister = (
    postApiAuthRegisterBody: BodyType<PostApiAuthRegisterBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/auth/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthRegisterBody, signal
    },
      options);
    }
  


export const getPostApiAuthRegisterMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRegister>>, TError,{data: BodyType<PostApiAuthRegisterBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRegister>>, TError,{data: BodyType<PostApiAuthRegisterBody>}, TContext> => {

const mutationKey = ['postApiAuthRegister'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthRegister>>, {data: BodyType<PostApiAuthRegisterBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthRegister(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthRegister>>>
    export type PostApiAuthRegisterMutationBody = BodyType<PostApiAuthRegisterBody>
    export type PostApiAuthRegisterMutationError = ErrorType<void>

    /**
 * @summary Đăng ký tài khoản mới
 */
export const usePostApiAuthRegister = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRegister>>, TError,{data: BodyType<PostApiAuthRegisterBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthRegister>>,
        TError,
        {data: BodyType<PostApiAuthRegisterBody>},
        TContext
      > => {

      const mutationOptions = getPostApiAuthRegisterMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Đăng nhập
 */
export const postApiAuthLogin = (
    postApiAuthLoginBody: BodyType<PostApiAuthLoginBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/auth/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthLoginBody, signal
    },
      options);
    }
  


export const getPostApiAuthLoginMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: BodyType<PostApiAuthLoginBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: BodyType<PostApiAuthLoginBody>}, TContext> => {

const mutationKey = ['postApiAuthLogin'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogin>>, {data: BodyType<PostApiAuthLoginBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthLogin(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogin>>>
    export type PostApiAuthLoginMutationBody = BodyType<PostApiAuthLoginBody>
    export type PostApiAuthLoginMutationError = ErrorType<void>

    /**
 * @summary Đăng nhập
 */
export const usePostApiAuthLogin = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: BodyType<PostApiAuthLoginBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogin>>,
        TError,
        {data: BodyType<PostApiAuthLoginBody>},
        TContext
      > => {

      const mutationOptions = getPostApiAuthLoginMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy thông tin người dùng hiện tại
 */
export const getApiAuthMe = (
    
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<User>(
      {url: `/api/auth/me`, method: 'GET', signal
    },
      options);
    }
  



export const getGetApiAuthMeInfiniteQueryKey = () => {
    return [
    'infinite', `/api/auth/me`
    ] as const;
    }

export const getGetApiAuthMeQueryKey = () => {
    return [
    `/api/auth/me`
    ] as const;
    }

    
export const getGetApiAuthMeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAuthMeInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAuthMe>>> = ({ signal }) => getApiAuthMe(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAuthMeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAuthMe>>>
export type GetApiAuthMeInfiniteQueryError = ErrorType<void>


export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          Awaited<ReturnType<typeof getApiAuthMe>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          Awaited<ReturnType<typeof getApiAuthMe>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin người dùng hiện tại
 */

export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAuthMeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiAuthMeQueryOptions = <TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAuthMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAuthMe>>> = ({ signal }) => getApiAuthMe(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiAuthMeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiAuthMe>>>
export type GetApiAuthMeQueryError = ErrorType<void>


export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          Awaited<ReturnType<typeof getApiAuthMe>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          Awaited<ReturnType<typeof getApiAuthMe>>
        > , 'initialData'
      >, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin người dùng hiện tại
 */

export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAuthMeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




