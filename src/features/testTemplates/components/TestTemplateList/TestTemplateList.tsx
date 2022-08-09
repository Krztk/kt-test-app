import { Pagination } from "components/common";
import { useTestTemplates } from "../../api/getTestTemplates";
import { usePagination } from "hooks/usePagination";
import { Button, Group, Loader, Table } from "@mantine/core";
import { Link } from "react-router-dom";

export const TestTemplateList = () => {
  const { page, handleNextPage, handlePreviousPage } = usePagination();
  const testTemplatesQuery = useTestTemplates({
    offset: 10 * page,
    limit: 10,
  });
  const lastPage = testTemplatesQuery.data?.lastPage ?? false;
  const testTemplates = testTemplatesQuery.data?.data ?? [];
  const loading = testTemplatesQuery.isLoading;

  return (
    <>
      <Button component={Link} to="add">
        Add a test template
      </Button>
      <Table>
        <thead>
          <tr>
            <th style={{ width: "100%" }}>Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Number of questions</th>
          </tr>
        </thead>
        <tbody>
          {testTemplates.map((testTemplate) => (
            <tr key={testTemplate.id}>
              <td>{testTemplate.name}</td>
              <td style={{ textAlign: "right" }}>
                {testTemplate.numberOfQuestions}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading && (
        <Group position="center">
          <Loader mt="xl" mb="xl" size="xl" />
        </Group>
      )}
      <Pagination
        onNextPage={handleNextPage}
        onPrevPage={handlePreviousPage}
        page={page}
        lastPage={lastPage}
        loading={testTemplatesQuery.isLoading}
      />
    </>
  );
};
