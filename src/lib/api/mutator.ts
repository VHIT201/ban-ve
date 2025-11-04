import axios from 'axios';

export const AXIOS_INSTANCE = axios.create({
    baseURL: 'https://architectural-bluepr.onrender.com',
});

export const customInstance = async <T>(config: any, options?: any): Promise<T> => {
    const response = await AXIOS_INSTANCE({
        ...config,
        ...options,
    });
    return response.data as T;
};

export default customInstance;

export type ErrorType<Error = any> = Error;
export type BodyType<BodyData = any> = BodyData;
