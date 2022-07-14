import {
  queryByAttribute,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryRow from "./CategoryRow";

test("render name", async () => {
  const handleEdit = jest.fn();
  const handleRemove = jest.fn();
  render(
    <table>
      <tbody>
        <CategoryRow
          name="Math"
          isLoading={false}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </tbody>
    </table>
  );

  expect(screen.getByText("Math")).toBeInTheDocument();
});

test("Should call 'onEdit' and 'onRemove' once when user click edit and remove button", async () => {
  const handleEdit = jest.fn();
  const handleRemove = jest.fn();
  render(
    <table>
      <tbody>
        <CategoryRow
          name="Math"
          isLoading={false}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </tbody>
    </table>
  );

  const editButton = screen.getByTestId("edit");
  userEvent.click(editButton);
  expect(handleEdit).toBeCalledTimes(1);

  const removeButton = screen.getByTestId("remove");
  userEvent.click(removeButton);
  expect(handleRemove).toBeCalledTimes(1);
});
