import { AxiosError } from "axios";
import { ErrorResponseDTO } from "types";

export const getErrorMessage = (error: unknown) => {
  const defaultErrorMessage = "Something went wrong. Try again later";
  if (error instanceof Error) {
    if (error.name === "AxiosError") {
      const axiosError = error as AxiosError<ErrorResponseDTO, unknown>;
      switch (axiosError.code) {
        case "ERR_BAD_REQUEST":
          if (axiosError.response?.status === 500) return defaultErrorMessage;
          else return axiosError.response?.data?.error ?? "Bad Request";
        default:
          return axiosError.message;
      }
    }
  }
  return defaultErrorMessage;
};
