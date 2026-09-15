import Cookies from "js-cookie";
import axios from "axios";
import { useTokens } from "./useTokens";
import { useSessionModal } from "./useSessionModal";

export const publicClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const { tokens } = useTokens.getState();
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { openModal } = useSessionModal.getState();
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      openModal();
    }
  },
);
