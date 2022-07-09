import { Control } from "react-hook-form";

export interface HookFormControlled<TFieldValues> {
  control: Control<TFieldValues>;
}

export interface ErrorResponseDTO {
  error: string;
}
