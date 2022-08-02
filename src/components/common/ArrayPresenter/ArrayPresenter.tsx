import { Box, createStyles, Text } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  content: {
    backgroundColor: "#fff",
    boxShadow: theme.shadows.sm,
    border: "1px solid rgba(0, 0,  0, 0.2)",
    borderRadius: "5px",
  },
  item: {
    padding: "8px 32px",
    "&:nth-of-type(even)": {
      backgroundColor: "lightgray",
    },
  },
}));

interface ArrayPresenterProps<T> {
  name: string;
  items: T[];
  component: (item: T) => JSX.Element;
}

export const ArrayPresenter = <T extends unknown>({
  name,
  items,
  component,
}: ArrayPresenterProps<T>) => {
  const { classes } = useStyles();
  return (
    <Box mb="sm">
      <Text mb="xs">{name}</Text>
      <Box className={classes.content}>
        {items.map((item, index) => (
          <Box className={classes.item} key={index}>
            {component(item)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
