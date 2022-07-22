import { Route, Routes } from "react-router-dom";
import { Questions } from "./Questions";

export const QuestionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Questions />} />
    </Routes>
  );
};
