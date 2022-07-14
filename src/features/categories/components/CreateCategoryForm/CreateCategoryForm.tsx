import { useEffect } from "react";
import { CreateCategoryDTO, useCreateCategory } from "../../api/createCategory";
import { Button } from "@mantine/core";
import { validationSchema } from "../../validationSchemas/categoryValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "components/forms";

interface CreateCategoryFormProps {
  forbiddenCategoryNames?: string[];
}
const CreateCategoryForm = ({
  forbiddenCategoryNames: usedNames = [],
}: CreateCategoryFormProps) => {
  const createCategoryMutation = useCreateCategory();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<CreateCategoryDTO>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
    context: { categories: usedNames },
    shouldFocusError: false,
  });

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

  const onSubmitForm: SubmitHandler<CreateCategoryDTO> = async (values) => {
    await createCategoryMutation.mutateAsync({
      name: values.name,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <TextInput mb="sm" name="name" label="Name" control={control} />
      <Button
        loading={createCategoryMutation.isLoading}
        type="submit"
        variant="filled"
      >
        Create a category
      </Button>
    </form>
  );
};

export default CreateCategoryForm;
