import { CategoryDTO } from "../../types";
import { Controller, FieldValues, Path } from "react-hook-form";
import { HookFormControlled } from "types";
import { Box, MantineStyleSystemProps, MultiSelect } from "@mantine/core";
import { mapToSelectEntry } from "../../mappers/categoryMappers";

interface CategorySelectorProps<TFieldValues>
  extends HookFormControlled<TFieldValues>,
    MantineStyleSystemProps {
  name: Path<TFieldValues>;
  categories: CategoryDTO[];
}

export const CategorySelector = <TFieldValues extends FieldValues>({
  name,
  categories,
  control,
  ...mantineProps
}: CategorySelectorProps<TFieldValues>) => {
  return (
    <Box {...mantineProps}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const entries = categories.map(mapToSelectEntry);
          return (
            <MultiSelect
              label="Categories"
              error={error?.message}
              {...field}
              data={entries}
            />
          );
        }}
      />
    </Box>
  );
};
