import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Categories } from "./Categories";
import { createQueryClient } from "tests/utils";

const API_URL = process.env.REACT_APP_API_URL;
const categories = [
  { id: 1, name: "English" },
  { id: 2, name: "Math" },
  { id: 3, name: "Space" },
  { id: 4, name: "Astronomy" },
];

const handlers = [
  rest.get(`${API_URL}/categories`, (_req, res, ctx) => {
    return res(ctx.json(categories));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Categories tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test("render categories that match provided IDs", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Categories categoryIds={[3, 4]} />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Space")).toBeInTheDocument();
    expect(await screen.findByText("Astronomy")).toBeInTheDocument();

    const englishCategoryNode = await waitFor(() =>
      screen.queryByText("English")
    );
    expect(englishCategoryNode).toBeNull();

    const mathCategoryNode = await waitFor(() => screen.queryByText("Math"));
    expect(mathCategoryNode).toBeNull();
  });

  test("If IDs of categories were not provided, component renders 'No categories'", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Categories categoryIds={[]} />
      </QueryClientProvider>
    );

    expect(await screen.findByText("No categories")).toBeInTheDocument();
  });
});
