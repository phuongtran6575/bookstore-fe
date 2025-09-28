import type { Book } from "../../core/Types";
import { axiosAPI, createRelationshipService } from "./baseService";


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

export const bookcategoryService = createRelationshipService("bookcategories","product_id","category_id");

export const bookauthorService = createRelationshipService("bookauthors","product_id","author_id");

export const bookpublisherService = createRelationshipService("bookpublishers","product_id","publisher_id");

export const booktagService = createRelationshipService("booktags","product_id","tag_id");

export const imageService = {
    AddImageToBook: async (data: {image_url: string, book_id: string})=>{
        const res = await axiosAPI.post("/bookimages", data)
        return res.data
    },
    RemoveImageFromBook: async(id: string) =>{
        await axiosAPI.delete(`/bookimages/${id}`)
        
    },
    GetListImagesBook: async (book_id: string) => {
      const res = await axiosAPI.get(`/bookimages?book_id=${book_id}`);
      return res.data;
    },

    SetThumbnailImage: async(id: string) =>{
        const res = await axiosAPI.put(`/bookimages/${id}/set-thumbnail`)
        return res.data
    }
    
}
