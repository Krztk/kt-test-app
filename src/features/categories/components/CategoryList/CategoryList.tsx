import { useState } from "react";
import { useCategories } from "../../api/getCategories";
import { useRemoveCategory } from "../../api/removeCategory";
import EditableCategoryRow from "./EditableCategoryRow/EditableCategoryRow";
import CategoryRow from "./CategoryRow/CategoryRow";
import { CategoryDTO } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateCategory } from "../../api/updateCategory";
import { Table } from "@mantine/core";
import { validationSchema } from "../../validationSchemas/categoryValidationSchema";
import { DangerousActionModal } from "components/modals";

export interface EditCategoryFormInput {
  name: string;
}
const CategoryList = () => {
  const categoriesQuery = useCategories({});
  const removeCategoryMutation = useRemoveCategory();
  const [editedCategory, setEditedCategory] = useState<CategoryDTO | null>(
    null
  );
  const [categoryToRemove, setCategoryToRemove] = useState<CategoryDTO | null>(
    null
  );
  const updateCategoryMutation = useUpdateCategory();
  const [modalOpened, setModalOpened] = useState(false);

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
  });

  if (categoriesQuery.isLoading) {
    return <p>Loading :)</p>;
  }

  if (categoriesQuery.isError) {
    return <h4>Something's gone wrong</h4>;
  }

  if (!categoriesQuery?.data?.length) {
    return <h4>No categories found</h4>;
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesQuery.data.map((category) =>
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
