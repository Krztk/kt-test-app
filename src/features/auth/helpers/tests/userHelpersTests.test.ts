import { ROLES } from "features/auth/types";
import { hasRole, isAuthenticated } from "../userHelpers";

test("isAuthenticated returns false if user is null", () => {
  const isAuth = isAuthenticated(null);
  expect(isAuth).toBe(false);
});

test("isAuthenticated returns true if a user is provided", () => {
  const user = {
    id: 5,
    isTeacher: true,
    isOrganizationOwner: false,
    token: "token",
    expirationDateEpochSeconds: new Date(2022, 8, 20).getTime() / 1000,
  };
  const isAuth = isAuthenticated(user);
  expect(isAuth).toBe(true);
});

const organizationOwner = {
  id: 5,
  isTeacher: true,
  isOrganizationOwner: true,
  token: "token",
  expirationDateEpochSeconds: new Date(2022, 8, 20).getTime() / 1000,
};

const teacher = {
  id: 5,
  isTeacher: true,
  isOrganizationOwner: false,
  token: "token",
  expirationDateEpochSeconds: new Date(2022, 8, 20).getTime() / 1000,
};

const student = {
  id: 5,
  isTeacher: false,
  isOrganizationOwner: false,
  token: "token",
  expirationDateEpochSeconds: new Date(2022, 8, 20).getTime() / 1000,
};

test("user has an ORGANIZATION OWNER role, hasRole check for organization_owner returns true", () => {
  const result = hasRole(organizationOwner, ROLES.OrganizationOwner);
  expect(result).toBe(true);
});

test("user does not have a ORGANIZATION OWNER role, hasRole check for organization_owner returns false", () => {
  const result = hasRole(teacher, ROLES.OrganizationOwner);
  expect(result).toBe(false);
});

test("user has a TEACHER role, hasRole check for teacher returns true", () => {
  const result = hasRole(teacher, ROLES.Teacher);
  expect(result).toBe(true);
});

test("user does not have a TEACHER role, hasRole check for teacher returns false", () => {
  const result = hasRole(student, ROLES.Teacher);
  expect(result).toBe(false);
});

test("user has a STUDENT role, hasRole check for student returns true", () => {
  const result = hasRole(student, ROLES.Student);
  expect(result).toBe(true);
});

test("user doesn not have a STUDENT role, hasRole check for student returns true", () => {
  const result = hasRole(organizationOwner, ROLES.Student);
  expect(result).toBe(false);
});
