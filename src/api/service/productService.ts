import type { Book } from "../../core/Types";
import { axiosClient } from "./baseService";


export const bookService = {
  getAll: (): Promise<Book[]> => axiosClient.get("/books"),
  getById: (id: string): Promise<Book> => axiosClient.get(`/books/${id}`),
  create: (data: Partial<Book>): Promise<Book> => axiosClient.post("/books", data),
  update: (id: string, data: Partial<Book>): Promise<Book> => axiosClient.put(`/books/${id}`, data),
  delete: (id: string): Promise<void> => axiosClient.delete(`/books/${id}`),
};

