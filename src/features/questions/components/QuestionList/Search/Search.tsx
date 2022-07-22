import { Box, Button, Group, Select } from "@mantine/core";
import { mapToSelectEntry, useCategories } from "features/categories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  isLoading: boolean;
  selectedId: string | null;
  onFilter: () => void;
}

const Search = ({ isLoading, selectedId, onFilter }: SearchProps) => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  useEffect(() => {
    setCategoryId(selectedId);
  }, [selectedId]);

  const categoriesQuery = useCategories({});
  const categories = categoriesQuery.data ? categoriesQuery.data : [];
  const selectEntries = categories.map((c) => mapToSelectEntry(c));
  const searchLink = categoryId ? `?categoryId=${categoryId}` : "";

  const handleFilter = () => {
    onFilter();
    navigate(searchLink);
  };
  return (
    <Group>
      <Select
        clearable
        data={selectEntries}
        placeholder="Filter by category"
        onChange={(value) => {
          setCategoryId(value);
        }}
      />
      <Button loading={isLoading} ml={2} onClick={handleFilter}>
        Filter
      </Button>
    </Group>
  );
};

export default Search;
