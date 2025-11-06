// Base API data
export interface Response<Data = unknown> {
  data: Data;
  statusCode: number;
  message: string;
  success: boolean;
}
