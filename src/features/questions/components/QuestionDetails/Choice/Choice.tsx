import { createStyles, Text } from "@mantine/core";
import { Choice as ChoiceType } from "features/questions/types";
import { BsCheckSquare, BsSquare } from "react-icons/bs";

const useStyles = createStyles((theme) => ({
  choice: {
    display: "flex",
    alignItems: "center",
  },
  icon: { height: "24px", width: "auto", marginRight: "8px", flexShrink: 0 },
}));

export const Choice = (choice: ChoiceType) => {
  const { classes } = useStyles();
  return (
    <div className={classes.choice}>
      {choice.valid ? (
        <BsCheckSquare className={classes.icon} />
      ) : (
        <BsSquare className={classes.icon} />
      )}
      <Text>{choice.content}</Text>
    </div>
  );
};
