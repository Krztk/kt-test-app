import { axios } from "lib/axios";
import { LoginResponseDTO } from "../types";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<LoginResponseDTO> => {
  return axios.post("/auth/login", data);
};
