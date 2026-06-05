import axios, { isAxiosError } from "axios";

const BASE = import.meta.env.VITE_API_URL || "/api";
const apiBase = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;

export const http = axios.create({ baseURL: apiBase });

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (r) => r,
    (err) => {
        if (err.response?.status === 401) {
            const url = err.config?.url ?? "";
            const isAuthRoute = url.includes("/auth/");
            const isProfileRoute = url.endsWith("/profile");
            if (!isAuthRoute && !isProfileRoute) {
                // Remove o full reload e emite um evento global para o SPA
                window.dispatchEvent(new Event("unauthorized"));
            }
        }
        return Promise.reject(err);
    }
);

export function getApiError(error: unknown, fallbackMessage = "Ocorreu um erro inesperado."): string {
    if (isAxiosError(error) && error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return fallbackMessage;
}