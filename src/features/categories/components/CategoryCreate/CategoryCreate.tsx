import { CreateCategoryDTO, useCreateCategory } from "../../api/createCategory";
import { Button } from "@mantine/core";
import { validationSchema } from "../../validationSchemas/categoryValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "components/forms";

const CreateCategory = () => {
  const createCategoryMutation = useCreateCategory();
  const { handleSubmit, control, reset } = useForm<CreateCategoryDTO>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
    },
    shouldFocusError: false,
  });

  const onSubmitForm: SubmitHandler<CreateCategoryDTO> = async (values) => {
    await createCategoryMutation.mutateAsync({
      name: values.name,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <TextInput name="name" label="Name" control={control} />
      <Button
        loading={createCategoryMutation.isLoading}
        mt="sm"
        type="submit"
        variant="filled"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateCategory;
