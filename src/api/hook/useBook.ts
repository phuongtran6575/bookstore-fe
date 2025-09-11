// src/features/books/hooks/useBooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookService } from "../service/productService";
import type { Book } from "../../core/Types";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: bookService.getAll,
  });
};

export const useBookbyId = (id:string) =>{
    return useQuery({
        queryKey: ["book", id],   // cache riêng cho từng id
        queryFn: () => bookService.getById(id),
        enabled: !!id,   
    })
}

// Thêm user mới
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); // refetch lại danh sách
    },
  });
};

// Cập nhật user
export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Book> }) =>
      bookService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

// Xóa user
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};