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
  ErrorResponse,
  File,
  FileUploadResponse,
  GetApiFile401,
  GetApiFileDownloadsHistory200,
  GetApiFileDownloadsHistoryParams,
  GetApiFileDownloadsMyHistory200,
  GetApiFileDownloadsMyHistoryParams,
  PatchApiFileIdReviewBody,
  PostApiFileUpload400,
  PostApiFileUpload401,
  PostApiFileUpload500,
  PostApiFileUploadBody
} from '../models';

import { mainInstance } from '../mutator/custom-instance';
import type { ErrorType , BodyType } from '../mutator/custom-instance';





/**
 * Tải lên file lên máy chủ và lưu thông tin vào cơ sở dữ liệu.
Yêu cầu phải đăng nhập với quyền admin hoặc cộng tác viên.
Hỗ trợ các định dạng: 3D, PDF, hình ảnh, tài liệu văn bản, v.v.

 * @summary Tải lên file (Yêu cầu quyền admin hoặc cộng tác viên)
 */
export const postApiFileUpload = (
    postApiFileUploadBody: BodyType<PostApiFileUploadBody>,
 signal?: AbortSignal
) => {
      
      const formData = new FormData();
formData.append(`file`, postApiFileUploadBody.file)
if(postApiFileUploadBody.image1 !== undefined) {
 formData.append(`image1`, postApiFileUploadBody.image1)
 }
if(postApiFileUploadBody.image2 !== undefined) {
 formData.append(`image2`, postApiFileUploadBody.image2)
 }
if(postApiFileUploadBody.image3 !== undefined) {
 formData.append(`image3`, postApiFileUploadBody.image3)
 }
if(postApiFileUploadBody.image4 !== undefined) {
 formData.append(`image4`, postApiFileUploadBody.image4)
 }
if(postApiFileUploadBody.filename !== undefined) {
 formData.append(`filename`, postApiFileUploadBody.filename)
 }
if(postApiFileUploadBody.dir !== undefined) {
 formData.append(`dir`, postApiFileUploadBody.dir)
 }
if(postApiFileUploadBody.private !== undefined) {
 formData.append(`private`, postApiFileUploadBody.private.toString())
 }
if(postApiFileUploadBody.compress !== undefined) {
 formData.append(`compress`, postApiFileUploadBody.compress.toString())
 }
if(postApiFileUploadBody.requirePayment !== undefined) {
 formData.append(`requirePayment`, postApiFileUploadBody.requirePayment.toString())
 }
if(postApiFileUploadBody.expiresAfterDays !== undefined) {
 formData.append(`expiresAfterDays`, postApiFileUploadBody.expiresAfterDays.toString())
 }

      return mainInstance<FileUploadResponse>(
      {url: `/api/file/upload`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData, signal
    },
      );
    }
  


export const getPostApiFileUploadMutationOptions = <TError = ErrorType<PostApiFileUpload400 | PostApiFileUpload401 | PostApiFileUpload500>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiFileUpload>>, TError,{data: BodyType<PostApiFileUploadBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiFileUpload>>, TError,{data: BodyType<PostApiFileUploadBody>}, TContext> => {

const mutationKey = ['postApiFileUpload'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiFileUpload>>, {data: BodyType<PostApiFileUploadBody>}> = (props) => {
          const {data} = props ?? {};

          return  postApiFileUpload(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiFileUploadMutationResult = NonNullable<Awaited<ReturnType<typeof postApiFileUpload>>>
    export type PostApiFileUploadMutationBody = BodyType<PostApiFileUploadBody>
    export type PostApiFileUploadMutationError = ErrorType<PostApiFileUpload400 | PostApiFileUpload401 | PostApiFileUpload500>

    /**
 * @summary Tải lên file (Yêu cầu quyền admin hoặc cộng tác viên)
 */
export const usePostApiFileUpload = <TError = ErrorType<PostApiFileUpload400 | PostApiFileUpload401 | PostApiFileUpload500>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiFileUpload>>, TError,{data: BodyType<PostApiFileUploadBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof postApiFileUpload>>,
        TError,
        {data: BodyType<PostApiFileUploadBody>},
        TContext
      > => {

      const mutationOptions = getPostApiFileUploadMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy danh sách tất cả file (Yêu cầu đăng nhập)
 */
export const getApiFile = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<File[]>(
      {url: `/api/file`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiFileInfiniteQueryKey = () => {
    return [
    'infinite', `/api/file`
    ] as const;
    }

export const getGetApiFileQueryKey = () => {
    return [
    `/api/file`
    ] as const;
    }

    
export const getGetApiFileInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<GetApiFile401>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFile>>> = ({ signal }) => getApiFile(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFile>>>
export type GetApiFileInfiniteQueryError = ErrorType<GetApiFile401>


export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<GetApiFile401>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<GetApiFile401>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<GetApiFile401>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả file (Yêu cầu đăng nhập)
 */

export function useGetApiFileInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFile>>>, TError = ErrorType<GetApiFile401>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileQueryOptions = <TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<GetApiFile401>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFile>>> = ({ signal }) => getApiFile(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFile>>>
export type GetApiFileQueryError = ErrorType<GetApiFile401>


export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<GetApiFile401>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<GetApiFile401>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFile>>,
          TError,
          Awaited<ReturnType<typeof getApiFile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<GetApiFile401>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách tất cả file (Yêu cầu đăng nhập)
 */

export function useGetApiFile<TData = Awaited<ReturnType<typeof getApiFile>>, TError = ErrorType<GetApiFile401>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Chỉ admin mới xem được danh sách này.
Các file này được đánh dấu khi upload có kích thước từ 50MB trở lên.

 * @summary Lấy danh sách file lớn (>= 50MB) đang chờ admin duyệt
 */
export const getApiFilePendingLarge = (
    
 signal?: AbortSignal
) => {
      
      
      return mainInstance<void>(
      {url: `/api/file/pending/large`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiFilePendingLargeInfiniteQueryKey = () => {
    return [
    'infinite', `/api/file/pending/large`
    ] as const;
    }

export const getGetApiFilePendingLargeQueryKey = () => {
    return [
    `/api/file/pending/large`
    ] as const;
    }

    
export const getGetApiFilePendingLargeInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFilePendingLarge>>>, TError = ErrorType<void>>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFilePendingLargeInfiniteQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFilePendingLarge>>> = ({ signal }) => getApiFilePendingLarge(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFilePendingLargeInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFilePendingLarge>>>
export type GetApiFilePendingLargeInfiniteQueryError = ErrorType<void>


export function useGetApiFilePendingLargeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFilePendingLarge>>>, TError = ErrorType<void>>(
  options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFilePendingLarge>>,
          TError,
          Awaited<ReturnType<typeof getApiFilePendingLarge>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFilePendingLargeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFilePendingLarge>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFilePendingLarge>>,
          TError,
          Awaited<ReturnType<typeof getApiFilePendingLarge>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFilePendingLargeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFilePendingLarge>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách file lớn (>= 50MB) đang chờ admin duyệt
 */

export function useGetApiFilePendingLargeInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFilePendingLarge>>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFilePendingLargeInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFilePendingLargeQueryOptions = <TData = Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError = ErrorType<void>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFilePendingLargeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFilePendingLarge>>> = ({ signal }) => getApiFilePendingLarge(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFilePendingLargeQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFilePendingLarge>>>
export type GetApiFilePendingLargeQueryError = ErrorType<void>


export function useGetApiFilePendingLarge<TData = Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError = ErrorType<void>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFilePendingLarge>>,
          TError,
          Awaited<ReturnType<typeof getApiFilePendingLarge>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFilePendingLarge<TData = Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFilePendingLarge>>,
          TError,
          Awaited<ReturnType<typeof getApiFilePendingLarge>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFilePendingLarge<TData = Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy danh sách file lớn (>= 50MB) đang chờ admin duyệt
 */

export function useGetApiFilePendingLarge<TData = Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError = ErrorType<void>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFilePendingLarge>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFilePendingLargeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Tải xuống file và tất cả ảnh minh họa liên quan (image1, image2, image3, image4) từ một đơn hàng đã thanh toán.
- Nếu chỉ có file chính: Trả về file đó trực tiếp
- Nếu có nhiều file (file chính + ảnh minh họa): Trả về file ZIP chứa tất cả các file

**Xác thực:**
- **Khách vãng lai**: Không cần token, chỉ cần orderId của đơn hàng
- **Người dùng đăng nhập**: Cần token JWT trong header Authorization và orderId phải khớp với userId

**Giới hạn tải xuống:**
- Khách vãng lai: 3 lần/đơn hàng
- Người dùng đăng nhập: 5 lần/đơn hàng

 * @summary Tải xuống file từ đơn hàng (khách hoặc người dùng đăng nhập)
 */
export const getApiFileIdDownload = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Blob>(
      {url: `/api/file/${id}/download`, method: 'GET',
        responseType: 'blob', signal
    },
      );
    }
  



export const getGetApiFileIdDownloadInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/file/${id}/download`
    ] as const;
    }

export const getGetApiFileIdDownloadQueryKey = (id?: string,) => {
    return [
    `/api/file/${id}/download`
    ] as const;
    }

    
export const getGetApiFileIdDownloadInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdDownloadInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileIdDownload>>> = ({ signal }) => getApiFileIdDownload(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdDownloadInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileIdDownload>>>
export type GetApiFileIdDownloadInfiniteQueryError = ErrorType<void>


export function useGetApiFileIdDownloadInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdDownloadInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdDownloadInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Tải xuống file từ đơn hàng (khách hoặc người dùng đăng nhập)
 */

export function useGetApiFileIdDownloadInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdDownload>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdDownloadInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileIdDownloadQueryOptions = <TData = Awaited<ReturnType<typeof getApiFileIdDownload>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdDownloadQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileIdDownload>>> = ({ signal }) => getApiFileIdDownload(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdDownloadQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileIdDownload>>>
export type GetApiFileIdDownloadQueryError = ErrorType<void>


export function useGetApiFileIdDownload<TData = Awaited<ReturnType<typeof getApiFileIdDownload>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdDownload<TData = Awaited<ReturnType<typeof getApiFileIdDownload>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdDownload>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdDownload>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdDownload<TData = Awaited<ReturnType<typeof getApiFileIdDownload>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Tải xuống file từ đơn hàng (khách hoặc người dùng đăng nhập)
 */

export function useGetApiFileIdDownload<TData = Awaited<ReturnType<typeof getApiFileIdDownload>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdDownload>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdDownloadQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Chỉ admin mới có thể sử dụng endpoint này để xem trước file mà không cần thanh toán.
- Không có giới hạn lượt tải
- Không yêu cầu thanh toán
- Hỗ trợ tải file đơn hoặc ZIP (nếu có ảnh minh họa)

 * @summary Admin tải xuống file preview (không giới hạn, không cần thanh toán)
 */
export const getApiFileIdPreview = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<Blob>(
      {url: `/api/file/${id}/preview`, method: 'GET',
        responseType: 'blob', signal
    },
      );
    }
  



export const getGetApiFileIdPreviewInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/file/${id}/preview`
    ] as const;
    }

export const getGetApiFileIdPreviewQueryKey = (id?: string,) => {
    return [
    `/api/file/${id}/preview`
    ] as const;
    }

    
export const getGetApiFileIdPreviewInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdPreview>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdPreviewInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileIdPreview>>> = ({ signal }) => getApiFileIdPreview(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdPreviewInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileIdPreview>>>
export type GetApiFileIdPreviewInfiniteQueryError = ErrorType<void>


export function useGetApiFileIdPreviewInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdPreview>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdPreview>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdPreview>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdPreviewInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdPreview>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdPreview>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdPreview>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdPreviewInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdPreview>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Admin tải xuống file preview (không giới hạn, không cần thanh toán)
 */

export function useGetApiFileIdPreviewInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileIdPreview>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdPreviewInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileIdPreviewQueryOptions = <TData = Awaited<ReturnType<typeof getApiFileIdPreview>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdPreviewQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileIdPreview>>> = ({ signal }) => getApiFileIdPreview(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdPreviewQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileIdPreview>>>
export type GetApiFileIdPreviewQueryError = ErrorType<void>


export function useGetApiFileIdPreview<TData = Awaited<ReturnType<typeof getApiFileIdPreview>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdPreview>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdPreview>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdPreview<TData = Awaited<ReturnType<typeof getApiFileIdPreview>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileIdPreview>>,
          TError,
          Awaited<ReturnType<typeof getApiFileIdPreview>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdPreview<TData = Awaited<ReturnType<typeof getApiFileIdPreview>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Admin tải xuống file preview (không giới hạn, không cần thanh toán)
 */

export function useGetApiFileIdPreview<TData = Awaited<ReturnType<typeof getApiFileIdPreview>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileIdPreview>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdPreviewQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Chỉ admin mới được phép duyệt/từ chối file.

 * @summary Admin duyệt hoặc từ chối file lớn
 */
export const patchApiFileIdReview = (
    id: string,
    patchApiFileIdReviewBody: BodyType<PatchApiFileIdReviewBody>,
 ) => {
      
      
      return mainInstance<void>(
      {url: `/api/file/${id}/review`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: patchApiFileIdReviewBody
    },
      );
    }
  


export const getPatchApiFileIdReviewMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiFileIdReview>>, TError,{id: string;data: BodyType<PatchApiFileIdReviewBody>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof patchApiFileIdReview>>, TError,{id: string;data: BodyType<PatchApiFileIdReviewBody>}, TContext> => {

const mutationKey = ['patchApiFileIdReview'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof patchApiFileIdReview>>, {id: string;data: BodyType<PatchApiFileIdReviewBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  patchApiFileIdReview(id,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PatchApiFileIdReviewMutationResult = NonNullable<Awaited<ReturnType<typeof patchApiFileIdReview>>>
    export type PatchApiFileIdReviewMutationBody = BodyType<PatchApiFileIdReviewBody>
    export type PatchApiFileIdReviewMutationError = ErrorType<void>

    /**
 * @summary Admin duyệt hoặc từ chối file lớn
 */
export const usePatchApiFileIdReview = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof patchApiFileIdReview>>, TError,{id: string;data: BodyType<PatchApiFileIdReviewBody>}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof patchApiFileIdReview>>,
        TError,
        {id: string;data: BodyType<PatchApiFileIdReviewBody>},
        TContext
      > => {

      const mutationOptions = getPatchApiFileIdReviewMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Lấy thông tin chi tiết file (Yêu cầu đăng nhập)
 */
export const getApiFileId = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<File>(
      {url: `/api/file/${id}`, method: 'GET', signal
    },
      );
    }
  



export const getGetApiFileIdInfiniteQueryKey = (id?: string,) => {
    return [
    'infinite', `/api/file/${id}`
    ] as const;
    }

export const getGetApiFileIdQueryKey = (id?: string,) => {
    return [
    `/api/file/${id}`
    ] as const;
    }

    
export const getGetApiFileIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdInfiniteQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileId>>> = ({ signal }) => getApiFileId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileId>>>
export type GetApiFileIdInfiniteQueryError = ErrorType<void>


export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết file (Yêu cầu đăng nhập)
 */

export function useGetApiFileIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileId>>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileId>>> = ({ signal }) => getApiFileId(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileId>>>
export type GetApiFileIdQueryError = ErrorType<void>


export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileId>>,
          TError,
          Awaited<ReturnType<typeof getApiFileId>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy thông tin chi tiết file (Yêu cầu đăng nhập)
 */

export function useGetApiFileId<TData = Awaited<ReturnType<typeof getApiFileId>>, TError = ErrorType<void>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileId>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Xóa file (Yêu cầu đăng nhập)
 */
export const deleteApiFileId = (
    id: string,
 ) => {
      
      
      return mainInstance<File>(
      {url: `/api/file/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiFileIdMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiFileId>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiFileId>>, TError,{id: string}, TContext> => {

const mutationKey = ['deleteApiFileId'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiFileId>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiFileId(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteApiFileIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiFileId>>>
    
    export type DeleteApiFileIdMutationError = ErrorType<void>

    /**
 * @summary Xóa file (Yêu cầu đăng nhập)
 */
export const useDeleteApiFileId = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiFileId>>, TError,{id: string}, TContext>, }
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteApiFileId>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getDeleteApiFileIdMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Lấy lịch sử tải xuống file.
- Người dùng thông thường chỉ xem được lịch sử của chính mình
- Admin và cộng tác viên xem được tất cả lịch sử

 * @summary Lấy lịch sử tải xuống
 */
export const getApiFileDownloadsHistory = (
    params?: GetApiFileDownloadsHistoryParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiFileDownloadsHistory200>(
      {url: `/api/file/downloads/history`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiFileDownloadsHistoryInfiniteQueryKey = (params?: GetApiFileDownloadsHistoryParams,) => {
    return [
    'infinite', `/api/file/downloads/history`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiFileDownloadsHistoryQueryKey = (params?: GetApiFileDownloadsHistoryParams,) => {
    return [
    `/api/file/downloads/history`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiFileDownloadsHistoryInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, GetApiFileDownloadsHistoryParams['page']>, TError = ErrorType<void>>(params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData, QueryKey, GetApiFileDownloadsHistoryParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileDownloadsHistoryInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, QueryKey, GetApiFileDownloadsHistoryParams['page']> = ({ signal, pageParam }) => getApiFileDownloadsHistory({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData, QueryKey, GetApiFileDownloadsHistoryParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileDownloadsHistoryInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>>
export type GetApiFileDownloadsHistoryInfiniteQueryError = ErrorType<void>


export function useGetApiFileDownloadsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, GetApiFileDownloadsHistoryParams['page']>, TError = ErrorType<void>>(
 params: undefined |  GetApiFileDownloadsHistoryParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData, QueryKey, GetApiFileDownloadsHistoryParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, GetApiFileDownloadsHistoryParams['page']>, TError = ErrorType<void>>(
 params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData, QueryKey, GetApiFileDownloadsHistoryParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, GetApiFileDownloadsHistoryParams['page']>, TError = ErrorType<void>>(
 params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData, QueryKey, GetApiFileDownloadsHistoryParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy lịch sử tải xuống
 */

export function useGetApiFileDownloadsHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, GetApiFileDownloadsHistoryParams['page']>, TError = ErrorType<void>>(
 params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData, QueryKey, GetApiFileDownloadsHistoryParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileDownloadsHistoryInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileDownloadsHistoryQueryOptions = <TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError = ErrorType<void>>(params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileDownloadsHistoryQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>> = ({ signal }) => getApiFileDownloadsHistory(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileDownloadsHistoryQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>>
export type GetApiFileDownloadsHistoryQueryError = ErrorType<void>


export function useGetApiFileDownloadsHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError = ErrorType<void>>(
 params: undefined |  GetApiFileDownloadsHistoryParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError = ErrorType<void>>(
 params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsHistory>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError = ErrorType<void>>(
 params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy lịch sử tải xuống
 */

export function useGetApiFileDownloadsHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError = ErrorType<void>>(
 params?: GetApiFileDownloadsHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsHistory>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileDownloadsHistoryQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Lấy danh sách các file đã tải xuống bởi tài khoản hiện tại
 * @summary Lấy lịch sử tải xuống của tài khoản đang đăng nhập
 */
export const getApiFileDownloadsMyHistory = (
    params?: GetApiFileDownloadsMyHistoryParams,
 signal?: AbortSignal
) => {
      
      
      return mainInstance<GetApiFileDownloadsMyHistory200>(
      {url: `/api/file/downloads/my-history`, method: 'GET',
        params, signal
    },
      );
    }
  



export const getGetApiFileDownloadsMyHistoryInfiniteQueryKey = (params?: GetApiFileDownloadsMyHistoryParams,) => {
    return [
    'infinite', `/api/file/downloads/my-history`, ...(params ? [params]: [])
    ] as const;
    }

export const getGetApiFileDownloadsMyHistoryQueryKey = (params?: GetApiFileDownloadsMyHistoryParams,) => {
    return [
    `/api/file/downloads/my-history`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGetApiFileDownloadsMyHistoryInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, GetApiFileDownloadsMyHistoryParams['page']>, TError = ErrorType<ErrorResponse | void>>(params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData, QueryKey, GetApiFileDownloadsMyHistoryParams['page']>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileDownloadsMyHistoryInfiniteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, QueryKey, GetApiFileDownloadsMyHistoryParams['page']> = ({ signal, pageParam }) => getApiFileDownloadsMyHistory({...params, 'page': pageParam || params?.['page']}, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData, QueryKey, GetApiFileDownloadsMyHistoryParams['page']> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileDownloadsMyHistoryInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>>
export type GetApiFileDownloadsMyHistoryInfiniteQueryError = ErrorType<ErrorResponse | void>


export function useGetApiFileDownloadsMyHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, GetApiFileDownloadsMyHistoryParams['page']>, TError = ErrorType<ErrorResponse | void>>(
 params: undefined |  GetApiFileDownloadsMyHistoryParams, options: { query:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData, QueryKey, GetApiFileDownloadsMyHistoryParams['page']>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsMyHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, GetApiFileDownloadsMyHistoryParams['page']>, TError = ErrorType<ErrorResponse | void>>(
 params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData, QueryKey, GetApiFileDownloadsMyHistoryParams['page']>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, QueryKey
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsMyHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, GetApiFileDownloadsMyHistoryParams['page']>, TError = ErrorType<ErrorResponse | void>>(
 params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData, QueryKey, GetApiFileDownloadsMyHistoryParams['page']>>, }
 , queryClient?: QueryClient
  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy lịch sử tải xuống của tài khoản đang đăng nhập
 */

export function useGetApiFileDownloadsMyHistoryInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, GetApiFileDownloadsMyHistoryParams['page']>, TError = ErrorType<ErrorResponse | void>>(
 params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData, QueryKey, GetApiFileDownloadsMyHistoryParams['page']>>, }
 , queryClient?: QueryClient 
 ):  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileDownloadsMyHistoryInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions, queryClient) as  UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getGetApiFileDownloadsMyHistoryQueryOptions = <TData = Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError = ErrorType<ErrorResponse | void>>(params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiFileDownloadsMyHistoryQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>> = ({ signal }) => getApiFileDownloadsMyHistory(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiFileDownloadsMyHistoryQueryResult = NonNullable<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>>
export type GetApiFileDownloadsMyHistoryQueryError = ErrorType<ErrorResponse | void>


export function useGetApiFileDownloadsMyHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError = ErrorType<ErrorResponse | void>>(
 params: undefined |  GetApiFileDownloadsMyHistoryParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsMyHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError = ErrorType<ErrorResponse | void>>(
 params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>,
          TError,
          Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiFileDownloadsMyHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError = ErrorType<ErrorResponse | void>>(
 params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Lấy lịch sử tải xuống của tài khoản đang đăng nhập
 */

export function useGetApiFileDownloadsMyHistory<TData = Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError = ErrorType<ErrorResponse | void>>(
 params?: GetApiFileDownloadsMyHistoryParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiFileDownloadsMyHistory>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiFileDownloadsMyHistoryQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




