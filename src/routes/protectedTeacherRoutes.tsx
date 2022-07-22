import { AppLayout } from "components/layout";
import { CategoriesRoutes } from "features/categories/routes";
import { QuestionsRoutes } from "features/questions/routes";
import { Navigate } from "react-router-dom";

export const protectedTeacherRoutes = [
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "categories/*", element: <CategoriesRoutes /> },
      { path: "questions/*", element: <QuestionsRoutes /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
