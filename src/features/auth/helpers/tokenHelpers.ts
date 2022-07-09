import jwt_decode from "jwt-decode";
import { UserData } from "../types";

interface TokenUserInfo {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  exp: number;
  teacher?: string;
  owner?: string;
}

export const getUserData = (token: string): UserData => {
  const obj = jwt_decode<TokenUserInfo>(token);
  const userData = {
    token: token,
    id: +obj[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    isTeacher: !!obj.teacher,
    isOrganizationOwner: !!obj.owner,
    expirationDateEpochSeconds: obj.exp,
  };

  return userData;
};

export const didTokenExpire = (userData: UserData) =>
  Date.now() / 1000 >= userData.expirationDateEpochSeconds;
