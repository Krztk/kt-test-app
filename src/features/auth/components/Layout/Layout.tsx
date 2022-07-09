import { Box } from "@mantine/core";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: "white",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          minWidth: "260px",
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
