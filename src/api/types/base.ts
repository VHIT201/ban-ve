// Base API data
export interface Response<Data = unknown> {
  message: string;
  message_en: string;
  responseData: Data;
  status: string;
  statusCode: number;
  timeStamp: Date;
}

export interface QueryData<Data = unknown> {
  success: boolean;
  message_en: string;
  responseData: Data;
}

export interface MutationData<Data = unknown> {
  success: boolean;
  message: string;
  responseData: Data;
}

export interface MutationDataResult<Data = unknown> {
  success: boolean;
  message: string;
  data: Data;
}

interface Pagination {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export type FilterData<TData> = Record<string, TData> & {
  pagination: Pagination;
};
