import { Title } from "@mantine/core";
import CategoryCreate from "../components/CategoryCreate/CategoryCreate";
import { default as CategoryListComp } from "../components/CategoryList/CategoryList";

export const CategoryList = () => {
  return (
    <div>
      <Title mb="md" order={2}>
        Categories
      </Title>
      <CategoryListComp />
      <Title mt="lg" mb="md" order={3}>
        Add a new category
      </Title>
      <CategoryCreate />
    </div>
  );
};
