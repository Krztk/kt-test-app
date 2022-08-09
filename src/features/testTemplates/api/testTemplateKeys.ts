export const testTemplateKeys = {
  all: ["test-templates"] as const,
  paginated: (offset: number, limit: number) =>
    [...testTemplateKeys.all, offset, limit] as const,
  detail: (id: number) => ["test-template", id] as const,
};
