import type { Author, Category, Publisher, Tag } from "../../core/Types";
import { authorService, categoryService, publisherService, tagService } from "../service/ultilityService";
import { useCrud } from "./useBaseHook";

export const useCategoryCrud = () => {
  const crudCategory = useCrud<Category>("categories", categoryService);

  return {
    useGetListCategories: crudCategory.useGetList,
    useGetCategoryById: crudCategory.useGetById,
    useCreateCategory: crudCategory.useCreate,
    useUpdateCategory: crudCategory.useUpdate,
    useDeleteCategory: crudCategory.useDelete,
  };
};

export const useAuthorCrud = () =>{
    const crudAuthor = useCrud<Author>("authors", authorService);
    return {
        useGetListAuthors : crudAuthor.useGetList,
        useGetAuthorById : crudAuthor.useGetById,
        useCreateAuthor : crudAuthor.useCreate,
        useUpdateAuthor : crudAuthor.useUpdate,
        useDeleteAuthor : crudAuthor.useDelete,
    }
}

export const usePublisherCrud = () =>{
    const crudPublisher = useCrud<Publisher>("publishers", publisherService);
    return {
        useGetListPublishers : crudPublisher.useGetList,
        useGetPublisherById : crudPublisher.useGetById,
        useCreatePublisher : crudPublisher.useCreate,
        useUpdatePublisher : crudPublisher.useUpdate,
        useDeletePublisher : crudPublisher.useDelete,
    }

}

export const useTagCrud = () =>{
    const crudTag = useCrud<Tag>("tags", tagService);
    return{
        useGetListTags : crudTag.useGetList,
        useGetTagById : crudTag.useGetById,
        useCreateTag : crudTag.useCreate,
        useUpdateTag : crudTag.useUpdate,
        useDeleteTag : crudTag.useDelete,

    }
}



