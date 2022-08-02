import { BsCheck, BsX } from "react-icons/bs";
import { Control } from "react-hook-form";
import { ActionIcon, Group } from "@mantine/core";
import { TextInput } from "components/forms";
import { EditCategoryFormInput } from "../CategoryList";

interface EditableCategoryRowProps {
  isLoading: boolean;
  onCancel: () => void;
  control: Control<EditCategoryFormInput, object>;
}
const EditableCategoryRow = ({
  isLoading,
  onCancel,
  control,
}: EditableCategoryRowProps) => (
  <tr>
    <td>
      <TextInput name="name" control={control} />
    </td>
    <td>
      <Group noWrap spacing="xs">
        <ActionIcon
          type="submit"
          aria-label="update category"
          loading={isLoading}
          variant="filled"
        >
          <BsCheck />
        </ActionIcon>
        <ActionIcon
          aria-label="cancel category update"
          loading={isLoading}
          onClick={onCancel}
          variant="filled"
        >
          <BsX />
        </ActionIcon>
      </Group>
    </td>
  </tr>
);

export default EditableCategoryRow;
