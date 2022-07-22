import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(0);

  const handleNextPage = (isLastPage: boolean) =>
    setPage((page) => {
      if (isLastPage) return page;
      return page + 1;
    });

  const handlePreviousPage = () =>
    setPage((page) => {
      if (page === 0) return page;
      return page - 1;
    });

  return { page, setPage, handleNextPage, handlePreviousPage };
}
