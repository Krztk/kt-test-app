import { ActionIcon, Button, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pagination } from "components/common";
import { DangerousActionModal } from "components/modals";
import { useDeleteQuestion } from "features/questions/api/deleteQuestion";
import { useQuestionHeaders } from "features/questions/api/getQuestionHeaders";
import { usePagination } from "hooks/usePagination";
import { useState } from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import { useLocation, Link } from "react-router-dom";
import Search from "./Search/Search";

export const QuestionList = () => {
  const { page, setPage, handleNextPage, handlePreviousPage } = usePagination();
  const search = useLocation().search;
  const categoryId = new URLSearchParams(search).get("categoryId");

  const questionHeaderQuery = useQuestionHeaders({
    offset: 10 * page,
    limit: 10,
    categoryId: categoryId,
  });

  const [opened, handlers] = useDisclosure(false);
  const removeQuestionMutation = useDeleteQuestion();
  const [questionToDelete, setQuestionToDelete] = useState(-1);

  const lastPage = questionHeaderQuery.data?.lastPage ?? false;
  const headers = questionHeaderQuery.data?.data ?? [];

  return (
    <>
      <Group position="apart" mb="sm">
        <Button component={Link} to="add">
          Add a new question
        </Button>
        <Search
          selectedId={categoryId}
          isLoading={questionHeaderQuery.isLoading}
          onFilter={() => setPage(0)}
        />
      </Group>
      <Table mb="md">
        <thead>
          <tr>
            <th>Content</th>
            <th>Type</th>
            <th style={{ whiteSpace: "nowrap" }}>In Tests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header) => (
            <tr key={header.id}>
              <td style={{ width: "100%" }}>{header.content}</td>
              <td style={{ whiteSpace: "nowrap" }}>{header.type}</td>
              <td>{header.numberOfTimesUsedInTests}</td>
              <td>
                <Group noWrap spacing="xs">
                  <ActionIcon
                    aria-label="edit category"
                    variant="filled"
                    data-testid="edit"
                  >
                    <BsPen />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setQuestionToDelete(header.id);
                      handlers.open();
                    }}
                    disabled={header.numberOfTimesUsedInTests > 0}
                    color="red"
                    variant="filled"
                    aria-label="remove category"
                    data-testid="remove"
                  >
                    <BsTrash />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        onNextPage={handleNextPage}
        onPrevPage={handlePreviousPage}
        page={page}
        lastPage={lastPage}
        loading={questionHeaderQuery.isLoading}
      />
      <DangerousActionModal
        opened={opened}
        onClose={handlers.close}
        title="Delete question"
        message="Do you really want delete this question?"
        onConfirm={async () => {
          await removeQuestionMutation.mutateAsync({
            questionId: questionToDelete,
          });
          handlers.close();
        }}
        isLoading={removeQuestionMutation.isLoading}
      />
    </>
  );
};
