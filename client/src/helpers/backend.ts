import axios, { type AxiosInstance } from 'axios';

export function useBackend(): AxiosInstance {
    const apiClient = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return apiClient;
}