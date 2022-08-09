import { ActionIcon, Box, createStyles, Text } from "@mantine/core";
import { QuestionHeaderDTO } from "features/questions";
import { BsTrash } from "react-icons/bs";

const useStyles = createStyles(() => ({
  container: {
    marginBottom: "6px",
    padding: "6px 6px",
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "5px 5px",
  },
}));
interface QuestionProps {
  data: QuestionHeaderDTO;
  onRemove: (id: number) => void;
}
export const Question = ({ data, onRemove }: QuestionProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.container}>
      <Text>{data.content}</Text>
      <ActionIcon
        onClick={() => onRemove(data.id)}
        color="red"
        variant="filled"
      >
        <BsTrash />
      </ActionIcon>
    </Box>
  );
};
