import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createQueryClient } from "tests/utils";
import CategoryList from "./CategoryList";
import { CategoryDTO } from "../../types";

const API_URL = process.env.REACT_APP_API_URL;
const categories: CategoryDTO[] = [];

const handlers = [
  rest.get(`${API_URL}/categories`, (_req, res, ctx) => {
    return res(ctx.json(categories));
  }),
  rest.post(`${API_URL}/categories`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("when app gets empty array of categories from API endpoint", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test("Should render information that there are no categories", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CategoryList />
      </QueryClientProvider>
    );
    expect(await screen.findByText("No categories found")).toBeInTheDocument();
  });
});
