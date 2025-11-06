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
  GetApiAuthMe200,
  PostApiAuthLogin200,
  PostApiAuthLoginBody,
  PostApiAuthRefreshToken200,
  PostApiAuthRefreshTokenBody,
  PostApiAuthRegister200,
  PostApiAuthRegisterBody,
  PostApiAuthResendOtp200,
  PostApiAuthResendOtpBody,
  PostApiAuthVerifyRegistration200,
  PostApiAuthVerifyRegistrationBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Bắt đầu quá trình đăng ký tài khoản mới (gửi OTP)
 */
export const postApiAuthRegister = (
    postApiAuthRegisterBody: BodyType<PostApiAuthRegisterBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthRegister200>(
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
 * @summary Bắt đầu quá trình đăng ký tài khoản mới (gửi OTP)
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
 * Sử dụng mã OTP đã gửi đến email để kích hoạt tài khoản
 * @summary Xác thực OTP để kích hoạt tài khoản
 */
export const postApiAuthVerifyRegistration = (
    postApiAuthVerifyRegistrationBody: BodyType<PostApiAuthVerifyRegistrationBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthVerifyRegistration200>(
      {url: `/api/auth/verify-registration`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthVerifyRegistrationBody, signal
    },
      options);
    }
  


export const getPostApiAuthVerifyRegistrationMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, TError,{data: BodyType<PostApiAuthVerifyRegistrationBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, TError,{data: BodyType<PostApiAuthVerifyRegistrationBody>}, TContext> => {

const mutationKey = ['postApiAuthVerifyRegistration'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, {data: BodyType<PostApiAuthVerifyRegistrationBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthVerifyRegistration(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthVerifyRegistrationMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>>
    export type PostApiAuthVerifyRegistrationMutationBody = BodyType<PostApiAuthVerifyRegistrationBody>
    export type PostApiAuthVerifyRegistrationMutationError = ErrorType<void>

    /**
 * @summary Xác thực OTP để kích hoạt tài khoản
 */
export const usePostApiAuthVerifyRegistration = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, TError,{data: BodyType<PostApiAuthVerifyRegistrationBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>,
        TError,
        {data: BodyType<PostApiAuthVerifyRegistrationBody>},
        TContext
      > => {

      const mutationOptions = getPostApiAuthVerifyRegistrationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Gửi lại mã OTP
 */
export const postApiAuthResendOtp = (
    postApiAuthResendOtpBody: BodyType<PostApiAuthResendOtpBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthResendOtp200>(
      {url: `/api/auth/resend-otp`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthResendOtpBody, signal
    },
      options);
    }
  


export const getPostApiAuthResendOtpMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthResendOtp>>, TError,{data: BodyType<PostApiAuthResendOtpBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthResendOtp>>, TError,{data: BodyType<PostApiAuthResendOtpBody>}, TContext> => {

const mutationKey = ['postApiAuthResendOtp'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthResendOtp>>, {data: BodyType<PostApiAuthResendOtpBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthResendOtp(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthResendOtpMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthResendOtp>>>
    export type PostApiAuthResendOtpMutationBody = BodyType<PostApiAuthResendOtpBody>
    export type PostApiAuthResendOtpMutationError = ErrorType<void>

    /**
 * @summary Gửi lại mã OTP
 */
export const usePostApiAuthResendOtp = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthResendOtp>>, TError,{data: BodyType<PostApiAuthResendOtpBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthResendOtp>>,
        TError,
        {data: BodyType<PostApiAuthResendOtpBody>},
        TContext
      > => {

      const mutationOptions = getPostApiAuthResendOtpMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Đăng nhập
 */
export const postApiAuthLogin = (
    postApiAuthLoginBody: BodyType<PostApiAuthLoginBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthLogin200>(
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
 * @summary Làm mới access token
 */
export const postApiAuthRefreshToken = (
    postApiAuthRefreshTokenBody: BodyType<PostApiAuthRefreshTokenBody>,
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthRefreshToken200>(
      {url: `/api/auth/refresh-token`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthRefreshTokenBody, signal
    },
      options);
    }
  


export const getPostApiAuthRefreshTokenMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, TError,{data: BodyType<PostApiAuthRefreshTokenBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, TError,{data: BodyType<PostApiAuthRefreshTokenBody>}, TContext> => {

const mutationKey = ['postApiAuthRefreshToken'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, {data: BodyType<PostApiAuthRefreshTokenBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthRefreshToken(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthRefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthRefreshToken>>>
    export type PostApiAuthRefreshTokenMutationBody = BodyType<PostApiAuthRefreshTokenBody>
    export type PostApiAuthRefreshTokenMutationError = ErrorType<void>

    /**
 * @summary Làm mới access token
 */
export const usePostApiAuthRefreshToken = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, TError,{data: BodyType<PostApiAuthRefreshTokenBody>}, TContext>, request?: SecondParameter<typeof mainInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthRefreshToken>>,
        TError,
        {data: BodyType<PostApiAuthRefreshTokenBody>},
        TContext
      > => {

      const mutationOptions = getPostApiAuthRefreshTokenMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy thông tin người dùng hiện tại
 */
export const getApiAuthMe = (
    
 options?: SecondParameter<typeof mainInstance>,signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiAuthMe200>(
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




