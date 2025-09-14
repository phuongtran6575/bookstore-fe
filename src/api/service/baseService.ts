// src/api/axiosClient.ts
import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosAPI.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);


export interface Service<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export function createCrudService<T>(baseUrl: string): Service<T> {
  return {
    getAll: async () => {
      const res = await axiosAPI.get(baseUrl);
      return res.data;
    },
    getById: async (id: string) => {
      const res = await axiosAPI.get(`${baseUrl}/${id}`);
      return res.data;
    },
    create: async (data: Partial<T>) => {
      const res = await axiosAPI.post(baseUrl, data);
      return res.data;
    },
    update: async (id: string, data: Partial<T>) => {
      const res = await axiosAPI.put(`${baseUrl}/${id}`, data);
      return res.data;
    },
    delete: async (id: string) => {
      await axiosAPI.delete(`${baseUrl}/${id}`);
    },
  };
}

