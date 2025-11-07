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
  CreateReportInput,
  GetApiReports200,
  GetApiReportsParams,
  GetApiReportsReportId200,
  PostApiReports201,
  PutApiReportsReportIdStatus200,
  UpdateReportStatusInput
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * @summary Gửi báo cáo vi phạm bản quyền
 */
export const postApiReports = (
    createReportInput: BodyType<CreateReportInput>,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<PostApiReports201>(
      {url: `/api/reports`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createReportInput, signal
    },
      );
    }
  


export const getPostApiReportsMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiReports>>, TError,{data: BodyType<CreateReportInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiReports>>, TError,{data: BodyType<CreateReportInput>}, TContext> => {

const mutationKey = ['postApiReports'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiReports>>, {data: BodyType<CreateReportInput>}> = (props) => {
          const {data} = props ?? {};

          return  postApiReports(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiReportsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiReports>>>
    export type PostApiReportsMutationBody = BodyType<CreateReportInput>
    export type PostApiReportsMutationError = ErrorType<unknown>

    /**
 * @summary Gửi báo cáo vi phạm bản quyền
 */
export const usePostApiReports = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiReports>>, TError,{data: BodyType<CreateReportInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiReports>>,
        TError,
        {data: BodyType<CreateReportInput>},
        TContext
      > => {

      const mutationOptions = getPostApiReportsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách báo cáo (Admin)
 */
export const getApiReports = (
    params?: GetApiReportsParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiReports200>(
      {url: `/api/reports`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiReportsInfiniteQueryKey = (params?: GetApiReportsParams,) => {
    return [
    'infinite', `/api/reports`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiReportsQueryKey = (params?: GetApiReportsParams,) => {
    return [
    `/api/reports`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiReportsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiReports>>, GetApiReportsParams['page']>, TError = ErrorType<unknown>>(params?: GetApiReportsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData, QueryKey, GetApiReportsParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiReportsInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiReports>>, QueryKey, GetApiReportsParams['page']> = ({ signal, pageParam }) => getApiReports({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData, QueryKey, GetApiReportsParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiReportsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiReports>>>
export type GetApiReportsInfiniteQueryError = ErrorType<unknown>


export function useGetApiReportsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReports>>, GetApiReportsParams['page']>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiReportsParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData, QueryKey, GetApiReportsParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReports>>,
          TError,
          Awaited<ReturnType<typeof getApiReports>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReportsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReports>>, GetApiReportsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiReportsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData, QueryKey, GetApiReportsParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReports>>,
          TError,
          Awaited<ReturnType<typeof getApiReports>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReportsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReports>>, GetApiReportsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiReportsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData, QueryKey, GetApiReportsParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách báo cáo (Admin)
 */

export function useGetApiReportsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReports>>, GetApiReportsParams['page']>, TError = ErrorType<unknown>>(
 params?: GetApiReportsParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData, QueryKey, GetApiReportsParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiReportsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiReportsQueryOptions = <TData = Awaited<ReturnType<typeof getApiReports>>, TError = ErrorType<unknown>>(params?: GetApiReportsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiReportsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiReports>>> = ({ signal }) => getApiReports(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiReportsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiReports>>>
export type GetApiReportsQueryError = ErrorType<unknown>


export function useGetApiReports<TData = Awaited<ReturnType<typeof getApiReports>>, TError = ErrorType<unknown>>(
 params: undefined |  GetApiReportsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReports>>,
          TError,
          Awaited<ReturnType<typeof getApiReports>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReports<TData = Awaited<ReturnType<typeof getApiReports>>, TError = ErrorType<unknown>>(
 params?: GetApiReportsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReports>>,
          TError,
          Awaited<ReturnType<typeof getApiReports>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReports<TData = Awaited<ReturnType<typeof getApiReports>>, TError = ErrorType<unknown>>(
 params?: GetApiReportsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách báo cáo (Admin)
 */

export function useGetApiReports<TData = Awaited<ReturnType<typeof getApiReports>>, TError = ErrorType<unknown>>(
 params?: GetApiReportsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReports>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiReportsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Lấy chi tiết báo cáo
 */
export const getApiReportsReportId = (
    reportId: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiReportsReportId200>(
      {url: `/api/reports/${reportId}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiReportsReportIdInfiniteQueryKey = (reportId?: string,) => {
    return [
    'infinite', `/api/reports/${reportId}`
    ] as const;
    }

export const getGetApiReportsReportIdQueryKey = (reportId?: string,) => {
    return [
    `/api/reports/${reportId}`
    ] as const;
    }

    
export const getGetApiReportsReportIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiReportsReportId>>>, TError = ErrorType<unknown>>(reportId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiReportsReportIdInfiniteQueryKey(reportId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiReportsReportId>>> = ({ signal }) => getApiReportsReportId(reportId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(reportId), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiReportsReportIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiReportsReportId>>>
export type GetApiReportsReportIdInfiniteQueryError = ErrorType<unknown>


export function useGetApiReportsReportIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReportsReportId>>>, TError = ErrorType<unknown>>(
 reportId: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReportsReportId>>,
          TError,
          Awaited<ReturnType<typeof getApiReportsReportId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReportsReportIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReportsReportId>>>, TError = ErrorType<unknown>>(
 reportId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReportsReportId>>,
          TError,
          Awaited<ReturnType<typeof getApiReportsReportId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReportsReportIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReportsReportId>>>, TError = ErrorType<unknown>>(
 reportId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy chi tiết báo cáo
 */

export function useGetApiReportsReportIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiReportsReportId>>>, TError = ErrorType<unknown>>(
 reportId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiReportsReportIdInfiniteQueryOptions(reportId,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiReportsReportIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiReportsReportId>>, TError = ErrorType<unknown>>(reportId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiReportsReportIdQueryKey(reportId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiReportsReportId>>> = ({ signal }) => getApiReportsReportId(reportId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(reportId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiReportsReportIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiReportsReportId>>>
export type GetApiReportsReportIdQueryError = ErrorType<unknown>


export function useGetApiReportsReportId<TData = Awaited<ReturnType<typeof getApiReportsReportId>>, TError = ErrorType<unknown>>(
 reportId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReportsReportId>>,
          TError,
          Awaited<ReturnType<typeof getApiReportsReportId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReportsReportId<TData = Awaited<ReturnType<typeof getApiReportsReportId>>, TError = ErrorType<unknown>>(
 reportId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiReportsReportId>>,
          TError,
          Awaited<ReturnType<typeof getApiReportsReportId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiReportsReportId<TData = Awaited<ReturnType<typeof getApiReportsReportId>>, TError = ErrorType<unknown>>(
 reportId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy chi tiết báo cáo
 */

export function useGetApiReportsReportId<TData = Awaited<ReturnType<typeof getApiReportsReportId>>, TError = ErrorType<unknown>>(
 reportId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiReportsReportId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiReportsReportIdQueryOptions(reportId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Cập nhật trạng thái báo cáo (Admin)
 */
export const putApiReportsReportIdStatus = (
    reportId: string,
    updateReportStatusInput: BodyType<UpdateReportStatusInput>,
 ) => {
      
      
      return mainInstance<PutApiReportsReportIdStatus200>(
      {url: `/api/reports/${reportId}/status`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateReportStatusInput
    },
      );
    }
  


export const getPutApiReportsReportIdStatusMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiReportsReportIdStatus>>, TError,{reportId: string;data: BodyType<UpdateReportStatusInput>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiReportsReportIdStatus>>, TError,{reportId: string;data: BodyType<UpdateReportStatusInput>}, TContext> => {

const mutationKey = ['putApiReportsReportIdStatus'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiReportsReportIdStatus>>, {reportId: string;data: BodyType<UpdateReportStatusInput>}> = (props) => {
          const {reportId,data} = props ?? {};

          return  putApiReportsReportIdStatus(reportId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PutApiReportsReportIdStatusMutationResult = NonNullable<Awaited<ReturnType<typeof putApiReportsReportIdStatus>>>
    export type PutApiReportsReportIdStatusMutationBody = BodyType<UpdateReportStatusInput>
    export type PutApiReportsReportIdStatusMutationError = ErrorType<unknown>

    /**
 * @summary Cập nhật trạng thái báo cáo (Admin)
 */
export const usePutApiReportsReportIdStatus = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiReportsReportIdStatus>>, TError,{reportId: string;data: BodyType<UpdateReportStatusInput>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof putApiReportsReportIdStatus>>,
        TError,
        {reportId: string;data: BodyType<UpdateReportStatusInput>},
        TContext
      > => {

      const mutationOptions = getPutApiReportsReportIdStatusMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    