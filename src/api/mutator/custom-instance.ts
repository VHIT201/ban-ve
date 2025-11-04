import axios from 'axios';
import baseConfig from '../../configs/base';

// Main API instance
export const MAIN_AXIOS_INSTANCE = axios.create({
    baseURL: baseConfig.backendDomain,
});

export const mainInstance = async <T>(config: any, options?: any): Promise<T> => {
    const response = await MAIN_AXIOS_INSTANCE({
        ...config,
        ...options,
    });
    return response.data as T;
};

// File upload service instance (nếu khác với main API)
export const FILE_UPLOAD_AXIOS_INSTANCE = axios.create({
    baseURL: `${baseConfig.backendDomain}/storage`,
});

export const fileUploadServiceInstance = async <T>(config: any, options?: any): Promise<T> => {
    const response = await FILE_UPLOAD_AXIOS_INSTANCE({
        ...config,
        ...options,
    });
    return response.data as T;
};

export default mainInstance;

export type ErrorType<Error = any> = Error;
export type BodyType<BodyData = any> = BodyData;