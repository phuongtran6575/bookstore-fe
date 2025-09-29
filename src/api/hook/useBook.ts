// src/features/books/hooks/useBooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookauthorService, bookcategoryService, bookpublisherService, bookService, booktagService, imageService } from "../service/productService";
import type { Book } from "../../core/Types";
import { useRelationship } from "./useBaseHook";

export const useGetListBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: bookService.getAll,
  });
};

export const useGetBookbyId = (id: string) =>{
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


export const useBookTagRelationship = () => {
  const relationshipBookTag = useRelationship<string, string>("booktags", booktagService);
  return {
    useGetTagsByBookId: relationshipBookTag.useGetAll,
    useAddTagToBook: relationshipBookTag.useAdd,
    useRemoveTagFromBook: relationshipBookTag.useRemove,
  };
};

export const useAddPublisherToBook = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { product_id: string; publisher_id: string; edition?: string; year?: string; isbn?: string}) => bookpublisherService.AddPublisherToBook(data),
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["bookpublishers"] }); }
  })
}

export const useGetListPublishersBook = (book_id: string) => {
  return useQuery({
    queryKey: ["bookpublishers", book_id],
    queryFn: () => bookpublisherService.GetListPublishersBook(book_id),
    enabled: !!book_id, // chỉ chạy khi có id
  });
};

export const useRemovePublisherFromBook = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  ({ product_id, publisher_id }: { product_id: string; publisher_id: string }) => bookpublisherService.RemovePublisherFromBook(product_id, publisher_id),
        onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["bookpublishers"] }); },
    })
}

export const useAddImageToBook = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data: {image_url:string, book_id:string}) => imageService.AddImageToBook(data),
        onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["bookimages"] }); },
    })
}

export const useGetImagesBook = (book_id: string) => {
  return useQuery({
    queryKey: ["bookimages", book_id],
    queryFn: () => imageService.GetListImagesBook(book_id),
    enabled: !!book_id, // chỉ chạy khi có id
  });
};

export const useRemoveImageFromBook = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (id: string) => imageService.RemoveImageFromBook(id),
        onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["bookimages"] }); },
    })
}


export const useSetThumbnailImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => imageService.SetThumbnailImage(id),
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["bookimages"] }); },
  });
};