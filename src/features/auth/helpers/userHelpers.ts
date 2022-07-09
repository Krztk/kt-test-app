import { ROLES, UserData } from "../types";

export const isAuthenticated = (user: UserData | null) => {
  return user != null;
};

const isStudent = (user: UserData) => user.isTeacher === false;
const isOrganizationOwner = (user: UserData) => user.isOrganizationOwner;
const isTeacher = (user: UserData) => user.isTeacher;

const roleUser = {
  [ROLES.OrganizationOwner]: isOrganizationOwner,
  [ROLES.Teacher]: isTeacher,
  [ROLES.Student]: isStudent,
};

export const hasRole = (user: UserData | null, role: ROLES): boolean => {
  if (user === null) return false;
  return roleUser[role](user);
};
