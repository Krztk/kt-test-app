import { useEffect } from "react";
import { useAuth, hasRole, ROLES, isAuthenticated } from "features/auth";
import { Link, useRoutes } from "react-router-dom";
import storage from "utils/storage";
import { publicRoutes } from "./publicRoutes";
import { protectedTeacherRoutes } from "./protectedTeacherRoutes";

const Landing = () => {
  return (
    <div>
      <p>temporary landing</p>
      <Link to="app/categories/">Categories</Link>
      <Link to="app/questions/">Questions</Link>
    </div>
  );
};

const SignOut = () => {
  const { setUserData } = useAuth();
  useEffect(() => {
    setUserData(null);
    storage.clearUserData();
  }, [setUserData]);
  return <p>Sign Out</p>;
};

const commonRoutes = [{ path: "/", element: <Landing /> }];

const authRoutes = [
  { path: "logout", element: <SignOut /> },
  { path: "signout", element: <SignOut /> },
  { path: "*", element: <h1>404</h1> },
];

export const AppRoutes = () => {
  const { userData } = useAuth();

  const unauthenticatedRoutes = useRoutes([...commonRoutes, ...publicRoutes]);
  const teacherRoutes = useRoutes([
    ...commonRoutes,
    ...authRoutes,
    ...protectedTeacherRoutes,
  ]);
  const isAuth = isAuthenticated(userData);
  if (!isAuth) return <>{unauthenticatedRoutes}</>;

  if (hasRole(userData, ROLES.Teacher)) {
    return <>{teacherRoutes}</>;
  }

  return null;
};
