import Login from "./Login";
import { Routes, Route } from "react-router-dom";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
