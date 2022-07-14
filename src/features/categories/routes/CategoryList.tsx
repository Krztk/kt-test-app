import { Title } from "@mantine/core";
import { default as CategoryListComp } from "../components/CategoryList/CategoryList";

export const CategoryList = () => {
  return (
    <>
      <Title mb="md" order={2}>
        Categories
      </Title>
      <CategoryListComp />
    </>
  );
};
