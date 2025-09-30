import type { Category } from "../Types";

export function buildCategoryTree(categories: Category[]) {
  const parents = categories.filter((c) => c.parentName === null);

  return parents.map((parent) => ({
    ...parent,
    children: categories.filter((c) => c.parentName === parent.name),
  }));
}