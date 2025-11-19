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
  CollaboratorApplyInput,
  CollaboratorResponse,
  CollaboratorStats,
  GetApiCollaboratorsRequestsParams,
  PutApiCollaboratorsRequestsRequestIdRejectBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Nộp đơn trở thành cộng tác viên
 */
export const postApiCollaboratorsApply = (
    collaboratorApplyInput: BodyType<CollaboratorApplyInput>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<CollaboratorResponse>(
      {url: `/api/collaborators/apply`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: collaboratorApplyInput, signal
    },
      );
    }
  


export const getPostApiCollaboratorsApplyMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCollaboratorsApply>>, TError,{data: BodyType<CollaboratorApplyInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiCollaboratorsApply>>, TError,{data: BodyType<CollaboratorApplyInput>}, TContext> => {

const mutationKey = ['postApiCollaboratorsApply'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiCollaboratorsApply>>, {data: BodyType<CollaboratorApplyInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiCollaboratorsApply(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiCollaboratorsApplyMutationResult = NonNullable<Awaited<ReturnType<typeof postApiCollaboratorsApply>>>
    export type PostApiCollaboratorsApplyMutationBody = BodyType<CollaboratorApplyInput>
    export type PostApiCollaboratorsApplyMutationError = ErrorType<void>

    /**
 * @summary Nộp đơn trở thành cộng tác viên
 */
export const usePostApiCollaboratorsApply = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiCollaboratorsApply>>, TError,{data: BodyType<CollaboratorApplyInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiCollaboratorsApply>>,
        TError,
        {data: BodyType<CollaboratorApplyInput>},
        TContext
      > => {

      const mutationOptions = getPostApiCollaboratorsApplyMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xem thông tin cộng tác viên của tôi
 */
export const getApiCollaboratorsMe = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<CollaboratorResponse>(
      {url: `/api/collaborators/me`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCollaboratorsMeInfiniteQueryKey = () => {
    return [
    'infinite', `/api/collaborators/me`
    ] as const;
    }

export const getGetApiCollaboratorsMeQueryKey = () => {
    return [
    `/api/collaborators/me`
    ] as const;
    }

    
export const getGetApiCollaboratorsMeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>, TError = ErrorType<void>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCollaboratorsMeInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCollaboratorsMe>>> = ({ signal }) => getApiCollaboratorsMe(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCollaboratorsMeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>
export type GetApiCollaboratorsMeInfiniteQueryError = ErrorType<void>


export function useGetApiCollaboratorsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>, TError = ErrorType<void>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xem thông tin cộng tác viên của tôi
 */

export function useGetApiCollaboratorsMeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCollaboratorsMeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCollaboratorsMeQueryOptions = <TData = Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError = ErrorType<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCollaboratorsMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCollaboratorsMe>>> = ({ signal }) => getApiCollaboratorsMe(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCollaboratorsMeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCollaboratorsMe>>>
export type GetApiCollaboratorsMeQueryError = ErrorType<void>


export function useGetApiCollaboratorsMe<TData = Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError = ErrorType<void>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsMe<TData = Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsMe>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsMe<TData = Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xem thông tin cộng tác viên của tôi
 */

export function useGetApiCollaboratorsMe<TData = Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsMe>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCollaboratorsMeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Xem danh sách yêu cầu trở thành cộng tác viên (Admin)
 */
export const getApiCollaboratorsRequests = (
    params?: GetApiCollaboratorsRequestsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<CollaboratorResponse[]>(
      {url: `/api/collaborators/requests`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiCollaboratorsRequestsInfiniteQueryKey = (params?: GetApiCollaboratorsRequestsParams,) => {
    return [
    'infinite', `/api/collaborators/requests`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiCollaboratorsRequestsQueryKey = (params?: GetApiCollaboratorsRequestsParams,) => {
    return [
    `/api/collaborators/requests`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiCollaboratorsRequestsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, GetApiCollaboratorsRequestsParams['page']>, TError = ErrorType<void>>(params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData, QueryKey, GetApiCollaboratorsRequestsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCollaboratorsRequestsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, QueryKey, GetApiCollaboratorsRequestsParams['page']> = ({ signal, pageParam }) => getApiCollaboratorsRequests({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData, QueryKey, GetApiCollaboratorsRequestsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCollaboratorsRequestsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>>
export type GetApiCollaboratorsRequestsInfiniteQueryError = ErrorType<void>


export function useGetApiCollaboratorsRequestsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, GetApiCollaboratorsRequestsParams['page']>, TError = ErrorType<void>>(
 params: undefined |  GetApiCollaboratorsRequestsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData, QueryKey, GetApiCollaboratorsRequestsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsRequestsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, GetApiCollaboratorsRequestsParams['page']>, TError = ErrorType<void>>(
 params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData, QueryKey, GetApiCollaboratorsRequestsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsRequestsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, GetApiCollaboratorsRequestsParams['page']>, TError = ErrorType<void>>(
 params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData, QueryKey, GetApiCollaboratorsRequestsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xem danh sách yêu cầu trở thành cộng tác viên (Admin)
 */

export function useGetApiCollaboratorsRequestsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, GetApiCollaboratorsRequestsParams['page']>, TError = ErrorType<void>>(
 params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData, QueryKey, GetApiCollaboratorsRequestsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCollaboratorsRequestsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCollaboratorsRequestsQueryOptions = <TData = Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError = ErrorType<void>>(params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCollaboratorsRequestsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>> = ({ signal }) => getApiCollaboratorsRequests(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCollaboratorsRequestsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>>
export type GetApiCollaboratorsRequestsQueryError = ErrorType<void>


export function useGetApiCollaboratorsRequests<TData = Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError = ErrorType<void>>(
 params: undefined |  GetApiCollaboratorsRequestsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsRequests<TData = Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError = ErrorType<void>>(
 params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsRequests>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsRequests<TData = Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError = ErrorType<void>>(
 params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xem danh sách yêu cầu trở thành cộng tác viên (Admin)
 */

export function useGetApiCollaboratorsRequests<TData = Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError = ErrorType<void>>(
 params?: GetApiCollaboratorsRequestsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsRequests>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCollaboratorsRequestsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Duyệt yêu cầu trở thành cộng tác viên (Admin)
 */
export const putApiCollaboratorsRequestsRequestIdApprove = (
    requestId: string,
 ) => {
      
      
      return mainInstance<CollaboratorResponse>(
      {url: `/api/collaborators/requests/${requestId}/approve`, method: 'PUT'
    },
      );
    }
  


export const getPutApiCollaboratorsRequestsRequestIdApproveMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdApprove>>, TError,{requestId: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdApprove>>, TError,{requestId: string}, TContext> => {

const mutationKey = ['putApiCollaboratorsRequestsRequestIdApprove'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdApprove>>, {requestId: string}> = (props) => {
          const {requestId} = props ?? {};

          return  putApiCollaboratorsRequestsRequestIdApprove(requestId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCollaboratorsRequestsRequestIdApproveMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdApprove>>>
    
    export type PutApiCollaboratorsRequestsRequestIdApproveMutationError = ErrorType<void>

    /**
 * @summary Duyệt yêu cầu trở thành cộng tác viên (Admin)
 */
export const usePutApiCollaboratorsRequestsRequestIdApprove = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdApprove>>, TError,{requestId: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdApprove>>,
        TError,
        {requestId: string},
        TContext
      > => {

      const mutationOptions = getPutApiCollaboratorsRequestsRequestIdApproveMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Từ chối yêu cầu trở thành cộng tác viên (Admin)
 */
export const putApiCollaboratorsRequestsRequestIdReject = (
    requestId: string,
    putApiCollaboratorsRequestsRequestIdRejectBody: BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>,
 ) => {
      
      
      return mainInstance<CollaboratorResponse>(
      {url: `/api/collaborators/requests/${requestId}/reject`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: putApiCollaboratorsRequestsRequestIdRejectBody
    },
      );
    }
  


export const getPutApiCollaboratorsRequestsRequestIdRejectMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdReject>>, TError,{requestId: string;data: BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdReject>>, TError,{requestId: string;data: BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>}, TContext> => {

const mutationKey = ['putApiCollaboratorsRequestsRequestIdReject'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdReject>>, {requestId: string;data: BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>}> = (props) => {
          const {requestId,data} = props ?? {};

          return  putApiCollaboratorsRequestsRequestIdReject(requestId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiCollaboratorsRequestsRequestIdRejectMutationResult = NonNullable<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdReject>>>
    export type PutApiCollaboratorsRequestsRequestIdRejectMutationBody = BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>
    export type PutApiCollaboratorsRequestsRequestIdRejectMutationError = ErrorType<void>

    /**
 * @summary Từ chối yêu cầu trở thành cộng tác viên (Admin)
 */
export const usePutApiCollaboratorsRequestsRequestIdReject = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdReject>>, TError,{requestId: string;data: BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiCollaboratorsRequestsRequestIdReject>>,
        TError,
        {requestId: string;data: BodyType<PutApiCollaboratorsRequestsRequestIdRejectBody>},
        TContext
      > => {

      const mutationOptions = getPutApiCollaboratorsRequestsRequestIdRejectMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Xem thống kê cộng tác viên (Admin)
 */
export const getApiCollaboratorsStats = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<CollaboratorStats[]>(
      {url: `/api/collaborators/stats`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiCollaboratorsStatsInfiniteQueryKey = () => {
    return [
    'infinite', `/api/collaborators/stats`
    ] as const;
    }

export const getGetApiCollaboratorsStatsQueryKey = () => {
    return [
    `/api/collaborators/stats`
    ] as const;
    }

    
export const getGetApiCollaboratorsStatsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>, TError = ErrorType<void>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCollaboratorsStatsInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCollaboratorsStats>>> = ({ signal }) => getApiCollaboratorsStats(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCollaboratorsStatsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>
export type GetApiCollaboratorsStatsInfiniteQueryError = ErrorType<void>


export function useGetApiCollaboratorsStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>, TError = ErrorType<void>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xem thống kê cộng tác viên (Admin)
 */

export function useGetApiCollaboratorsStatsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCollaboratorsStatsInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiCollaboratorsStatsQueryOptions = <TData = Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError = ErrorType<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiCollaboratorsStatsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiCollaboratorsStats>>> = ({ signal }) => getApiCollaboratorsStats(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiCollaboratorsStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiCollaboratorsStats>>>
export type GetApiCollaboratorsStatsQueryError = ErrorType<void>


export function useGetApiCollaboratorsStats<TData = Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError = ErrorType<void>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsStats<TData = Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>,
          TError,
          Awaited<ReturnType<typeof getApiCollaboratorsStats>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiCollaboratorsStats<TData = Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Xem thống kê cộng tác viên (Admin)
 */

export function useGetApiCollaboratorsStats<TData = Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiCollaboratorsStats>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiCollaboratorsStatsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




