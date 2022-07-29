import { createStyles, MantineStyleSystemProps, Text } from "@mantine/core";

const useStyles = createStyles((theme, _params, _getRef) => ({
  error: {
    fontSize: "12px",
    marginTop: theme.spacing.xs / 2,
    wordBreak: "break-word",
    color: theme.colors.red[theme.colorScheme === "dark" ? 6 : 7],
  },
}));

interface ErrorMessageProps extends MantineStyleSystemProps {
  error: string;
}
export const ErrorMessage = ({ error, ...mantineProps }: ErrorMessageProps) => {
  const { classes } = useStyles();
  return (
    <Text {...mantineProps} size="sm" className={classes.error}>
      {error}
    </Text>
  );
};
