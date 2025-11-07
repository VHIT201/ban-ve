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
  CreatePaymentInput,
  GetApiPaymentsHistory200,
  GetApiPaymentsHistoryParams,
  GetApiPaymentsPaymentId200,
  PostApiPayments201
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Tạo yêu cầu thanh toán mới
 */
export const postApiPayments = (
    createPaymentInput: BodyType<CreatePaymentInput>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiPayments201>(
      {url: `/api/payments`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createPaymentInput, signal
    },
      );
    }
  


export const getPostApiPaymentsMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiPayments>>, TError,{data: BodyType<CreatePaymentInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiPayments>>, TError,{data: BodyType<CreatePaymentInput>}, TContext> => {

const mutationKey = ['postApiPayments'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiPayments>>, {data: BodyType<CreatePaymentInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiPayments(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiPaymentsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiPayments>>>
    export type PostApiPaymentsMutationBody = BodyType<CreatePaymentInput>
    export type PostApiPaymentsMutationError = ErrorType<unknown>

    /**
 * @summary Tạo yêu cầu thanh toán mới
 */
export const usePostApiPayments = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiPayments>>, TError,{data: BodyType<CreatePaymentInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiPayments>>,
        TError,
        {data: BodyType<CreatePaymentInput>},
        TContext
      > => {

      const mutationOptions = getPostApiPaymentsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy thông tin chi tiết thanh toán
 */
export const getApiPaymentsPaymentId = (
    paymentId: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiPaymentsPaymentId200>(
      {url: `/api/payments/${paymentId}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiPaymentsPaymentIdInfiniteQueryKey = (paymentId?: string,) => {
    return [
    'infinite', `/api/payments/${paymentId}`
    ] as const;
    }

export const getGetApiPaymentsPaymentIdQueryKey = (paymentId?: string,) => {
    return [
    `/api/payments/${paymentId}`
    ] as const;
    }

    
export const getGetApiPaymentsPaymentIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>, TError = ErrorType<unknown>>(paymentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiPaymentsPaymentIdInfiniteQueryKey(paymentId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>> = ({ signal }) => getApiPaymentsPaymentId(paymentId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(paymentId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiPaymentsPaymentIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>
export type GetApiPaymentsPaymentIdInfiniteQueryError = ErrorType<unknown>


export function useGetApiPaymentsPaymentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>, TError = ErrorType<unknown>>(
 paymentId: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsPaymentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>, TError = ErrorType<unknown>>(
 paymentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsPaymentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>, TError = ErrorType<unknown>>(
 paymentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết thanh toán
 */

export function useGetApiPaymentsPaymentIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>, TError = ErrorType<unknown>>(
 paymentId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiPaymentsPaymentIdInfiniteQueryOptions(paymentId,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiPaymentsPaymentIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError = ErrorType<unknown>>(paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiPaymentsPaymentIdQueryKey(paymentId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>> = ({ signal }) => getApiPaymentsPaymentId(paymentId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(paymentId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiPaymentsPaymentIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>>
export type GetApiPaymentsPaymentIdQueryError = ErrorType<unknown>


export function useGetApiPaymentsPaymentId<TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError = ErrorType<unknown>>(
 paymentId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsPaymentId<TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError = ErrorType<unknown>>(
 paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsPaymentId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsPaymentId<TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError = ErrorType<unknown>>(
 paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết thanh toán
 */

export function useGetApiPaymentsPaymentId<TData = Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError = ErrorType<unknown>>(
 paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsPaymentId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiPaymentsPaymentIdQueryOptions(paymentId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy lịch sử thanh toán của người dùng
 */
export const getApiPaymentsHistory = (
    params?: GetApiPaymentsHistoryParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiPaymentsHistory200>(
      {url: `/api/payments/history`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiPaymentsHistoryInfiniteQueryKey = (params?: GetApiPaymentsHistoryParams,) => {
    return [
    'infinite', `/api/payments/history`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiPaymentsHistoryQueryKey = (params?: GetApiPaymentsHistoryParams,) => {
    return [
    `/api/payments/history`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiPaymentsHistoryInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsHistory>>, GetApiPaymentsHistoryParams['page']>, TError = ErrorType<unknown>>(params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData, QueryKey, GetApiPaymentsHistoryParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiPaymentsHistoryInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiPaymentsHistory>>, QueryKey, GetApiPaymentsHistoryParams['page']> = ({ signal, pageParam }) => getApiPaymentsHistory({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData, QueryKey, GetApiPaymentsHistoryParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiPaymentsHistoryInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiPaymentsHistory>>>
export type GetApiPaymentsHistoryInfiniteQueryError = ErrorType<unknown>


export function useGetApiPaymentsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsHistory>>, GetApiPaymentsHistoryParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiPaymentsHistoryParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData, QueryKey, GetApiPaymentsHistoryParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsHistory>>, GetApiPaymentsHistoryParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData, QueryKey, GetApiPaymentsHistoryParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsHistory>>, GetApiPaymentsHistoryParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData, QueryKey, GetApiPaymentsHistoryParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy lịch sử thanh toán của người dùng
 */

export function useGetApiPaymentsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiPaymentsHistory>>, GetApiPaymentsHistoryParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData, QueryKey, GetApiPaymentsHistoryParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiPaymentsHistoryInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiPaymentsHistoryQueryOptions = <TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError = ErrorType<unknown>>(params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiPaymentsHistoryQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiPaymentsHistory>>> = ({ signal }) => getApiPaymentsHistory(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiPaymentsHistoryQueryResult = NonNullable<Awaited<ReturnType<typeof getApiPaymentsHistory>>>
export type GetApiPaymentsHistoryQueryError = ErrorType<unknown>


export function useGetApiPaymentsHistory<TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiPaymentsHistoryParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsHistory<TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError = ErrorType<unknown>>(
 params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiPaymentsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiPaymentsHistory>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiPaymentsHistory<TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError = ErrorType<unknown>>(
 params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy lịch sử thanh toán của người dùng
 */

export function useGetApiPaymentsHistory<TData = Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError = ErrorType<unknown>>(
 params?: GetApiPaymentsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiPaymentsHistory>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiPaymentsHistoryQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




