export const questionKeys = {
  all: ["questions"] as const,
  paginated: (offset: number, limit: number, categoryId: string | null) =>
    [...questionKeys.all, offset, limit, { categoryId: categoryId }] as const,
  detail: (id: number) => ["question", id] as const,
};
