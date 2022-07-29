import {
  MantineStyleSystemProps,
  NumberInput as Ni,
  NumberInputProps as NiProps,
} from "@mantine/core";
import { Controller, FieldValues, Path } from "react-hook-form";
import { HookFormControlled } from "types";

interface NumberInputProps<TFieldValues>
  extends HookFormControlled<TFieldValues>,
    NiProps,
    MantineStyleSystemProps {
  name: Path<TFieldValues>;
  label?: string;
}

export const NumberInput = <TFieldValues extends FieldValues>({
  control,
  name,
  ...inputProps
}: NumberInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Ni
          defaultValue={1}
          error={error?.message}
          radius="md"
          {...field}
          {...inputProps}
        />
      )}
    />
  );
};
