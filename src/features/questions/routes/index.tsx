import { Route, Routes } from "react-router-dom";
import { QuestionDetails } from "../components/QuestionDetails/QuestionDetails";
import { AddQuestion } from "./AddQuestion";
import { EditQuestion } from "./EditQuestion";
import { Questions } from "./Questions";

export const QuestionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Questions />} />
      <Route path="add" element={<AddQuestion />} />
      <Route path="edit/:questionId" element={<EditQuestion />} />
      <Route path=":questionId" element={<QuestionDetails />} />
    </Routes>
  );
};
