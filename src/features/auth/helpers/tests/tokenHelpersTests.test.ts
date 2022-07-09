import { UserData } from "features/auth/types";
import { didTokenExpire } from "../tokenHelpers";
const dateNow = new Date(2020, 8, 20, 14, 30);

jest.useFakeTimers().setSystemTime(dateNow);

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};
const getUserDataWithExpirationDate = (date: Date): UserData => {
  return {
    id: 5,
    isTeacher: true,
    isOrganizationOwner: false,
    token: "token",
    expirationDateEpochSeconds: date.getTime() / 1000,
  };
};

test("token will expire in 10 minutes, didTokenExpired returns false", () => {
  const expiresIn10Minutes = addMinutes(dateNow, 10);
  const user = getUserDataWithExpirationDate(expiresIn10Minutes);
  const result = didTokenExpire(user);
  expect(result).toBe(false);
});

test("token expired, didTokenExpired returns true", () => {
  const expiredMinuteAgo = addMinutes(dateNow, -1);
  const user = getUserDataWithExpirationDate(expiredMinuteAgo);
  const result = didTokenExpire(user);
  expect(result).toBe(true);
});
