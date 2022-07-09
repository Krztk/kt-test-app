import { Route, Routes } from "react-router-dom";
import { CategoryList } from "./CategoryList";

export const CategoriesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CategoryList />} />
    </Routes>
  );
};
