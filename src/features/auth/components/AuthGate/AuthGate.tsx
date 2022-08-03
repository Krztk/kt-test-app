import { Navigate, useLocation } from "react-router-dom";

export const AuthGate = () => {
  const location = useLocation();

  return <Navigate to="/auth/login" state={{ from: location }} />;
};
