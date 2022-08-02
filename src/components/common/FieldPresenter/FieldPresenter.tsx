import { Box, createStyles, Text } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((theme) => ({
  content: {
    backgroundColor: "#fff",
    padding: "16px 32px",
    boxShadow: theme.shadows.sm,
    border: "1px solid rgba(0, 0,  0, 0.2)",
    borderRadius: "5px",
  },
}));

interface FieldPresenterProps {
  children: ReactNode;
  name: string;
  striped?: boolean;
}
export const FieldPresenter = ({ children, name }: FieldPresenterProps) => {
  const { classes } = useStyles();
  return (
    <Box mb="sm">
      <Text mb="xs">{name}</Text>
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
};
