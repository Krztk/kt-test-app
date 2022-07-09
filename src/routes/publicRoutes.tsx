import { AuthRoutes } from "features/auth/routes";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/app/*",
    element: <Navigate to="/auth/login" />,
  },
];
