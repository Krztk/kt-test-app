import { ActionIcon, Group } from "@mantine/core";
import { BsPen, BsTrash } from "react-icons/bs";
import styles from "./CategoryRow.module.scss";

interface CategoryRowProps {
  name: string;
  isLoading: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

const CategoryRow = ({
  name,
  isLoading,
  onEdit,
  onRemove,
}: CategoryRowProps) => (
  <tr>
    <td className={styles.name}>{name}</td>
    <td>
      <Group noWrap spacing="xs">
        <ActionIcon
          onClick={onEdit}
          aria-label="edit category"
          loading={isLoading}
          variant="filled"
          data-testid="edit"
        >
          <BsPen />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={onRemove}
          loading={isLoading}
          variant="filled"
          aria-label="remove category"
          data-testid="remove"
        >
          <BsTrash />
        </ActionIcon>
      </Group>
    </td>
  </tr>
);

export default CategoryRow;
