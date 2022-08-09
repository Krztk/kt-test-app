import { Checkbox, Table } from "@mantine/core";
import { Pagination } from "components/common";
import { QuestionHeaderDTO } from "features/questions";

interface QuestionSelectorProps {
  questionHeaders: QuestionHeaderDTO[];
  setSelectedQuestions: React.Dispatch<
    React.SetStateAction<QuestionHeaderDTO[]>
  >;
  selectedQuestions: QuestionHeaderDTO[];
  page: number;
  lastPage: boolean;
  loading: boolean;
  handleNextPage: (lastPage: boolean) => void;
  handlePrevPage: () => void;
}

export const QuestionSelector = ({
  questionHeaders,
  selectedQuestions,
  setSelectedQuestions,
  page,
  loading,
  lastPage,
  handleNextPage,
  handlePrevPage,
}: QuestionSelectorProps) => {
  const doesArrayContainHeaderWithId = (id: number) =>
    selectedQuestions.findIndex((x) => x.id === id) !== -1;

  const handleCheckboxOnChange = (header: QuestionHeaderDTO) =>
    setSelectedQuestions((old) => {
      const index = selectedQuestions.findIndex((x) => x.id === header.id);

      if (index === -1) return [...old, header];
      return old.filter((x) => x.id !== header.id);
    });

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>
              <Checkbox disabled />
            </th>
            <th style={{ width: "100%" }}>Content</th>
            <th style={{ minWidth: "95px" }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {questionHeaders.map((header) => (
            <tr key={header.id}>
              <td>
                <Checkbox
                  checked={doesArrayContainHeaderWithId(header.id)}
                  onChange={() => handleCheckboxOnChange(header)}
                />
              </td>
              <td>{header.content}</td>
              <td style={{ whiteSpace: "nowrap" }}>{header.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        page={page}
        loading={loading}
        lastPage={lastPage}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </>
  );
};
