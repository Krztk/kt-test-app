import storage from "utils/storage";
import { LoginCredentialsDTO, loginWithEmailAndPassword } from "../api/login";
import { LoginResponseDTO, UserData } from "../types";
import { getUserData } from "../helpers/tokenHelpers";

export async function login(
  data: LoginCredentialsDTO,
  setUserData: (user: UserData) => void
) {
  const response = await loginWithEmailAndPassword(data);
  handleUserResponse(response, setUserData);
}

export function logout() {
  storage.clearUserData();
}

function handleUserResponse(
  data: LoginResponseDTO,
  setUser: (user: UserData) => void
) {
  const { token } = data;
  const userData = getUserData(token);
  storage.setUserData(userData);
  setUser(userData);
}
