// Base API data
export interface Response<Data = unknown> {
  message: string;
  message_en: string;
  responseData: Data;
  status: string;
  statusCode: number;
  timeStamp: Date;
}
