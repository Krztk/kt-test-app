import { ActionIcon, Group, Text } from "@mantine/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  lastPage: boolean;
  loading: boolean;
  onNextPage: (isLastPage: boolean) => void;
  onPrevPage: () => void;
}

export const Pagination = ({
  page,
  lastPage,
  onNextPage,
  onPrevPage,
  loading,
}: PaginationProps) => {
  return (
    <Group position="right" spacing="xs">
      <ActionIcon
        onClick={onPrevPage}
        disabled={page === 0}
        loading={loading}
        size="lg"
        variant="filled"
        aria-label="go to previous page"
      >
        <FaChevronLeft />
      </ActionIcon>
      <Text>{page + 1}</Text>
      <ActionIcon
        onClick={() => onNextPage(lastPage)}
        disabled={lastPage}
        loading={loading}
        size="lg"
        variant="filled"
        aria-label="go to next page"
      >
        <FaChevronRight />
      </ActionIcon>
    </Group>
  );
};
