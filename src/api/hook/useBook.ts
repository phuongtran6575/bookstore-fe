// src/features/books/hooks/useBooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookauthorService, bookcategoryService, bookpublisherService, bookService, booktagService } from "../service/productService";
import type { Book } from "../../core/Types";
import { useRelationship } from "./useBaseHook";

export const useGetListBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: bookService.getAll,
  });
};

export const useGetBookbyId = (id:string) =>{
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

export const useBookAuthorRelationship = () =>{
  const relationshipBookAuthor = useRelationship<string, string>("bookauthors", bookauthorService);
  return {
    useGetAuthorsByBookId: relationshipBookAuthor.useGetAll,
    useAddAuthorToBook: relationshipBookAuthor.useAdd,
    useRemoveAuthorFromBook: relationshipBookAuthor.useRemove,
  }
}

export const useBookCategoryRelationship = () => {
  const relationshipBookCategory = useRelationship<string, string>("bookcategories", bookcategoryService);
  return {
    useGetCategoriesByBookId: relationshipBookCategory.useGetAll,
    useAddCategoryToBook: relationshipBookCategory.useAdd,
    useRemoveCategoryFromBook: relationshipBookCategory.useRemove,
  };
};

export const useBookPublisherRelationship = () => {
  const relationshipBookPublisher = useRelationship<string, string>("bookpublishers", bookpublisherService);
  return {
    useGetPublishersByBookId: relationshipBookPublisher.useGetAll,
    useAddPublisherToBook: relationshipBookPublisher.useAdd,
    useRemovePublisherFromBook: relationshipBookPublisher.useRemove,
  };
};

export const useBookTagRelationship = () => {
  const relationshipBookTag = useRelationship<string, string>("booktags", booktagService);
  return {
    useGetTagsByBookId: relationshipBookTag.useGetAll,
    useAddTagToBook: relationshipBookTag.useAdd,
    useRemoveTagFromBook: relationshipBookTag.useRemove,
  };
};