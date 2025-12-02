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
  data: Data;
}
