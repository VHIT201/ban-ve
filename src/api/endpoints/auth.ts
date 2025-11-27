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





/**
 * @summary Bắt đầu quá trình đăng ký tài khoản mới (gửi OTP)
 */
export const postApiAuthRegister = (
    postApiAuthRegisterBody: BodyType<PostApiAuthRegisterBody>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthRegister200>(
      {url: `/api/auth/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthRegisterBody, signal
    },
      );
    }
  


export const getPostApiAuthRegisterMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRegister>>, TError,{data: BodyType<PostApiAuthRegisterBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRegister>>, TError,{data: BodyType<PostApiAuthRegisterBody>}, TContext> => {

const mutationKey = ['postApiAuthRegister'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthRegister>>, {data: BodyType<PostApiAuthRegisterBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthRegister(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthRegister>>>
    export type PostApiAuthRegisterMutationBody = BodyType<PostApiAuthRegisterBody>
    export type PostApiAuthRegisterMutationError = ErrorType<void>

    /**
 * @summary Bắt đầu quá trình đăng ký tài khoản mới (gửi OTP)
 */
export const usePostApiAuthRegister = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRegister>>, TError,{data: BodyType<PostApiAuthRegisterBody>}, TContext>, }
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
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthVerifyRegistration200>(
      {url: `/api/auth/verify-registration`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthVerifyRegistrationBody, signal
    },
      );
    }
  


export const getPostApiAuthVerifyRegistrationMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, TError,{data: BodyType<PostApiAuthVerifyRegistrationBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, TError,{data: BodyType<PostApiAuthVerifyRegistrationBody>}, TContext> => {

const mutationKey = ['postApiAuthVerifyRegistration'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, {data: BodyType<PostApiAuthVerifyRegistrationBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthVerifyRegistration(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthVerifyRegistrationMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>>
    export type PostApiAuthVerifyRegistrationMutationBody = BodyType<PostApiAuthVerifyRegistrationBody>
    export type PostApiAuthVerifyRegistrationMutationError = ErrorType<void>

    /**
 * @summary Xác thực OTP để kích hoạt tài khoản
 */
export const usePostApiAuthVerifyRegistration = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthVerifyRegistration>>, TError,{data: BodyType<PostApiAuthVerifyRegistrationBody>}, TContext>, }
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
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthResendOtp200>(
      {url: `/api/auth/resend-otp`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthResendOtpBody, signal
    },
      );
    }
  


export const getPostApiAuthResendOtpMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthResendOtp>>, TError,{data: BodyType<PostApiAuthResendOtpBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthResendOtp>>, TError,{data: BodyType<PostApiAuthResendOtpBody>}, TContext> => {

const mutationKey = ['postApiAuthResendOtp'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthResendOtp>>, {data: BodyType<PostApiAuthResendOtpBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthResendOtp(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthResendOtpMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthResendOtp>>>
    export type PostApiAuthResendOtpMutationBody = BodyType<PostApiAuthResendOtpBody>
    export type PostApiAuthResendOtpMutationError = ErrorType<void>

    /**
 * @summary Gửi lại mã OTP
 */
export const usePostApiAuthResendOtp = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthResendOtp>>, TError,{data: BodyType<PostApiAuthResendOtpBody>}, TContext>, }
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
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthLogin200>(
      {url: `/api/auth/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthLoginBody, signal
    },
      );
    }
  


export const getPostApiAuthLoginMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: BodyType<PostApiAuthLoginBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: BodyType<PostApiAuthLoginBody>}, TContext> => {

const mutationKey = ['postApiAuthLogin'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogin>>, {data: BodyType<PostApiAuthLoginBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthLogin(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogin>>>
    export type PostApiAuthLoginMutationBody = BodyType<PostApiAuthLoginBody>
    export type PostApiAuthLoginMutationError = ErrorType<void>

    /**
 * @summary Đăng nhập
 */
export const usePostApiAuthLogin = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: BodyType<PostApiAuthLoginBody>}, TContext>, }
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
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiAuthRefreshToken200>(
      {url: `/api/auth/refresh-token`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthRefreshTokenBody, signal
    },
      );
    }
  


export const getPostApiAuthRefreshTokenMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, TError,{data: BodyType<PostApiAuthRefreshTokenBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, TError,{data: BodyType<PostApiAuthRefreshTokenBody>}, TContext> => {

const mutationKey = ['postApiAuthRefreshToken'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, {data: BodyType<PostApiAuthRefreshTokenBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthRefreshToken(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthRefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthRefreshToken>>>
    export type PostApiAuthRefreshTokenMutationBody = BodyType<PostApiAuthRefreshTokenBody>
    export type PostApiAuthRefreshTokenMutationError = ErrorType<void>

    /**
 * @summary Làm mới access token
 */
export const usePostApiAuthRefreshToken = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthRefreshToken>>, TError,{data: BodyType<PostApiAuthRefreshTokenBody>}, TContext>, }
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
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiAuthMe200>(
      {url: `/api/auth/me`, method: 'GET', signal
    },
      );
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

    
export const getGetApiAuthMeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAuthMeInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAuthMe>>> = ({ signal }) => getApiAuthMe(signal);

      

      

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
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          Awaited<ReturnType<typeof getApiAuthMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin người dùng hiện tại
 */

export function useGetApiAuthMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiAuthMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAuthMeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiAuthMeQueryOptions = <TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiAuthMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiAuthMe>>> = ({ signal }) => getApiAuthMe(signal);

      

      

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
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiAuthMe>>,
          TError,
          Awaited<ReturnType<typeof getApiAuthMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin người dùng hiện tại
 */

export function useGetApiAuthMe<TData = Awaited<ReturnType<typeof getApiAuthMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiAuthMe>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiAuthMeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




