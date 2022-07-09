import { QueryClient, QueryClientProvider } from "react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import CategoryCreate from "./CategoryCreate";
import { createQueryClient } from "tests/utils";

const API_URL = process.env.REACT_APP_API_URL;

const handlers = [
  rest.post(`${API_URL}/categories`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CategoryCreate tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test("Submitting form with emtpy name input should not be allowed", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CategoryCreate />
      </QueryClientProvider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(
      await screen.findByText("name is a required field")
    ).toBeInTheDocument();
  });

  test("Should clear input value after submission", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CategoryCreate />
      </QueryClientProvider>
    );

    const nameInput = await waitFor(() => screen.findByLabelText("Name"));
    const button = await screen.findByRole("button");

    userEvent.type(nameInput, "MyCategory");
    fireEvent.click(button);
    await waitFor(() => {
      expect(nameInput).toHaveValue("");
    });
  });
});
