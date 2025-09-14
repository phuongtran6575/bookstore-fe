import type { Book } from "../../core/Types";
import { axiosAPI } from "./baseService";


export const bookService = {
  getAll: async (): Promise<Book[]> => {
    const res = await axiosAPI.get<Book[]>("/books");
    return res.data;   // 👈 phải .data
  },

  getById: async (id: string): Promise<Book> => {
    const res = await axiosAPI.get<Book>(`/books/${id}`);
    return res.data;
  },

  create: async (data: Partial<Book>): Promise<Book> => {
    const res = await axiosAPI.post<Book>("/books", data);
    return res.data;
  },

  update: async (id: string, data: Partial<Book>): Promise<Book> => {
    const res = await axiosAPI.put<Book>(`/books/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosAPI.delete(`/books/${id}`);
  },
};

