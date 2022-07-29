import { useMemo } from "react";
import { Badge, Box, Group, Skeleton, Text } from "@mantine/core";
import { useCategories } from "../../api/getCategories";
import { CategoryDTO } from "../../types";

const mapCategoryIdsToCategoryNames = (
  categoryIds: number[],
  categories: CategoryDTO[]
) => {
  return categoryIds.map(
    (categoryId) => categories.find((x) => x.id === categoryId)?.name ?? "???"
  );
};

interface CategoriesProps {
  categoryIds: number[];
}

const Categories = ({ categoryIds }: CategoriesProps) => {
  const categoriesQuery = useCategories();
  const categories = useMemo(() => {
    return categoriesQuery.isFetched
      ? mapCategoryIdsToCategoryNames(categoryIds, categoriesQuery.data ?? [])
      : [];
  }, [categoryIds, categoriesQuery.isFetched, categoriesQuery.data]);

  if (categoriesQuery.isError) {
    return null;
  }

  return (
    <Box mb="sm">
      <Text mb="sm">CATEGORIES:</Text>
      <Group spacing="sm">
        {categoriesQuery.isLoading ? (
          <Skeleton width={120} height={8} radius="xl" />
        ) : (
          <>
            {!categories.length && <Text color="gray">No categories</Text>}
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                {category}
              </Badge>
            ))}
          </>
        )}
      </Group>
    </Box>
  );
};

export default Categories;
