import { AppLayout } from "components/layout";
import { CategoriesRoutes } from "features/categories/routes";
import { Navigate } from "react-router-dom";

export const protectedTeacherRoutes = [
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "categories/*", element: <CategoriesRoutes /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
