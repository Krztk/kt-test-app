import { AuthRoutes, AuthGate } from "features/auth";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/app/*",
    element: <AuthGate />,
  },
];
