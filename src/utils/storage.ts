import { UserData } from "features/auth";

const storagePrefix = "kt-test_";
const userStorageKey = `${storagePrefix}userData`;

const storage = {
  getUserData: (): UserData | null => {
    var jsonString = localStorage.getItem(userStorageKey);
    if (!jsonString) return null;
    return JSON.parse(jsonString);
  },
  setUserData: (user: UserData) => {
    localStorage.setItem(userStorageKey, JSON.stringify(user));
  },
  clearUserData: () => {
    localStorage.removeItem(userStorageKey);
  },
};

export default storage;
