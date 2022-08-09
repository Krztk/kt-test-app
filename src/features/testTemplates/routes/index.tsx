import { Route, Routes } from "react-router-dom";
import { AddTestTemplate } from "./AddTestTemplate";
import { TestTemplates } from "./TestTemplates";

export const TestTemplatesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TestTemplates />} />
      <Route path="add" element={<AddTestTemplate />} />
    </Routes>
  );
};
