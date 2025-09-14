import type { Author, Category, Publisher, Tag } from "../../core/Types";
import { createCrudService } from "./baseService";


export const categoryService = createCrudService<Category>("/categories");

export const authorService = createCrudService<Author>("/authors");

export const publisherService = createCrudService<Publisher>("/publishers");

export const tagService = createCrudService<Tag>("/tags");