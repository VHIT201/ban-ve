import baseConfig from '../../configs/base';

export const fetchInstance = async <T>(config: any, options?: any): Promise<T> => {
    const url = `${baseConfig.backendDomain}${config.url}`;

    const response = await fetch(url, {
        method: config.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
        body: config.data ? JSON.stringify(config.data) : undefined,
        ...options,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as T;
};

export default fetchInstance;