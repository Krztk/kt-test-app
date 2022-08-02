import { useState } from "react";
import { useCategories } from "../../api/getCategories";
import { useRemoveCategory } from "../../api/removeCategory";
import EditableCategoryRow from "./EditableCategoryRow/EditableCategoryRow";
import CategoryRow from "./CategoryRow/CategoryRow";
import { CategoryDTO } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateCategory } from "../../api/updateCategory";
import { Group, Loader, Table, Text } from "@mantine/core";
import { validationSchema } from "../../validationSchemas/categoryValidationSchema";
import { DangerousActionModal } from "components/modals";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";

export interface EditCategoryFormInput {
  name: string;
}
const CategoryList = () => {
  const categoriesQuery = useCategories();
  const removeCategoryMutation = useRemoveCategory();
  const [editedCategory, setEditedCategory] = useState<CategoryDTO | null>(
    null
  );
  const [categoryToRemove, setCategoryToRemove] = useState<CategoryDTO | null>(
    null
  );
  const updateCategoryMutation = useUpdateCategory();
  const [modalOpened, setModalOpened] = useState(false);
  const usedNames =
    categoriesQuery.data?.map((x) => x.name.toLowerCase()) ?? [];
  const oldValue = editedCategory?.name.toLowerCase();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm<EditCategoryFormInput>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
    shouldFocusError: true,
    context: { categories: usedNames, oldValue: oldValue },
  });

  if (categoriesQuery.isError) {
    return <Text color="dimmed">Something's gone wrong</Text>;
  }

  const onSubmitForm: SubmitHandler<EditCategoryFormInput> = async (values) => {
    try {
      if (editedCategory == null) {
        throw new Error("editedCategory cannot be null");
      }

      if (isDirty) {
        await updateCategoryMutation.mutateAsync({
          categoryId: editedCategory.id,
          data: values,
        });
      }
      setEditedCategory(null);
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (category: CategoryDTO) => {
    setEditedCategory(category);
    reset({ name: category.name });
  };

  const hasData = !!categoriesQuery?.data?.length;
  const categories = categoriesQuery?.data ?? [];
  const loading = categoriesQuery.isLoading;

  return (
    <>
      <CreateCategoryForm forbiddenCategoryNames={usedNames} />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "100%" }}>Name</th>
              <th style={{ minWidth: "66px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) =>
              editedCategory != null && category.id === editedCategory.id ? (
                <EditableCategoryRow
                  key={category.id}
                  isLoading={isSubmitting}
                  onCancel={() => setEditedCategory(null)}
                  control={control}
                />
              ) : (
                <CategoryRow
                  key={category.id}
                  name={category.name}
                  isLoading={removeCategoryMutation.isLoading}
                  onEdit={() => onEdit(category)}
                  onRemove={() => {
                    setCategoryToRemove(category);
                    setModalOpened(true);
                  }}
                />
              )
            )}
          </tbody>
        </Table>
      </form>
      {categoriesQuery.isFetched && !hasData && (
        <Text color="dimmed">No categories found</Text>
      )}
      {loading && (
        <Group position="center">
          <Loader mt="xl" mb="xl" size="xl" />
        </Group>
      )}
      <DangerousActionModal
        opened={modalOpened}
        message={`Do you really want to delete category '${categoryToRemove?.name}'?`}
        onClose={() => setModalOpened(false)}
        onConfirm={async () => {
          await removeCategoryMutation.mutateAsync({
            categoryId: categoryToRemove!.id,
          });
          setModalOpened(false);
        }}
        title={"Delete category"}
      />
    </>
  );
};

export default CategoryList;
