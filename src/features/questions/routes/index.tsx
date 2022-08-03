import { Route, Routes } from "react-router-dom";
import { AddQuestion } from "./AddQuestion";
import { EditQuestion } from "./EditQuestion";
import { Question } from "./Question";
import { Questions } from "./Questions";

export const QuestionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Questions />} />
      <Route path="add" element={<AddQuestion />} />
      <Route path="edit/:questionId" element={<EditQuestion />} />
      <Route path=":questionId" element={<Question />} />
    </Routes>
  );
};
