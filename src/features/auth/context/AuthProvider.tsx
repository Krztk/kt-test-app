import React, { createContext, ReactNode, useEffect, useState } from "react";
import storage from "utils/storage";
import { didTokenExpire } from "../helpers/tokenHelpers";
import { UserData } from "../types";

interface AuthContextValue {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}
const AuthContext = createContext<AuthContextValue>({
  userData: null,
  setUserData: () => {},
});

const getUserDataIfTokenIsValid = () => {
  const userData = storage.getUserData();
  if (userData === null) return null;

  if (didTokenExpire(userData)) {
    return null;
  }

  return userData;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(
    getUserDataIfTokenIsValid
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const userData = storage.getUserData();
    if (!userData) return;
    if (didTokenExpire(userData)) {
      storage.clearUserData();
      return;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {ready && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
