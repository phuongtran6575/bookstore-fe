// src/api/axiosClient.ts
import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
    console.log("Access token FE gửi:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosAPI.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);


export interface crudService<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export function createCrudService<T>(baseUrl: string): crudService<T> {
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

export interface RelationshipService<TLeft, TRight, TReturn = any> {
  getAll: (leftId: TLeft) => Promise<TReturn[]>;
  add: (leftId: TLeft, rightId: TRight) => Promise<TReturn>;
  remove: (leftId: TLeft, rightId: TRight) => Promise<void>;
}

export function createRelationshipService<
  TLeft = string,
  TRight = string,
  TReturn = any
>(
  baseUrl: string,
  leftKey: string,
  rightKey: string
): RelationshipService<TLeft, TRight, TReturn> {
  return {
    getAll: async (leftId: TLeft) => {
      const res = await axiosAPI.get(baseUrl, { params: { [leftKey]: leftId } });
      return res.data;
    },
    add: async (leftId: TLeft, rightId: TRight) => {
      const payload = { [leftKey]: leftId, [rightKey]: rightId };
      console.log("Payload gửi lên:", payload);
      const res = await axiosAPI.post(baseUrl, {
        [leftKey]: leftId,
        [rightKey]: rightId,
      });
      return res.data;
    },
    remove: async (leftId: TLeft, rightId: TRight) => {
      await axiosAPI.delete(`${baseUrl}/${leftId}/${rightId}`);
    },
  };
}





