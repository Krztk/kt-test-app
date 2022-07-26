import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createQueryClient } from "tests/utils";
import { Paginated } from "types";
import { QuestionHeaderDTO } from "features/questions/types";
import { QuestionList } from "./QuestionList";
import { MemoryRouter } from "react-router-dom";
import { CategoryDTO } from "features/categories/types";

const API_URL = process.env.REACT_APP_API_URL;
const questions: Paginated<QuestionHeaderDTO> = {
  data: [
    {
      id: 1,
      type: "Written",
      content: "Who was the first person in space?",
      numberOfTimesUsedInTests: 3,
    },
    {
      id: 2,
      type: "Single choice",
      content: "Who was the second emperor of Rome?",
      numberOfTimesUsedInTests: 0,
    },
    {
      id: 5,
      type: "Multiple choice",
      content: "Select prime numbers",
      numberOfTimesUsedInTests: 1,
    },
  ],
  lastPage: true,
};

const categories: CategoryDTO[] = [
  { id: 1, name: "History" },
  { id: 2, name: "Space" },
];

const handlers = [
  rest.get(`${API_URL}/questions/headers`, (_req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  rest.get(`${API_URL}/categories`, (_req, res, ctx) => {
    return res(ctx.json(categories));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("when question headers API endpoint returns some questions", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test("should render questions in table", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <QuestionList />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const question1ContentCell = await screen.findByText(
      "Who was the first person in space?"
    );
    const question1TypeCell = question1ContentCell.nextSibling;
    const question1UsedInTests = question1TypeCell?.nextSibling;
    expect(question1TypeCell?.textContent).toBe("Written");
    expect(question1UsedInTests?.textContent).toBe("3");

    const question2ContentCell = await screen.findByText(
      "Who was the second emperor of Rome?"
    );
    const question2TypeCell = question2ContentCell.nextSibling;
    const question2UsedInTests = question2TypeCell?.nextSibling;
    expect(question2TypeCell?.textContent).toBe("Single choice");
    expect(question2UsedInTests?.textContent).toBe("0");

    const question3ContentCell = await screen.findByText(
      "Select prime numbers"
    );
    const question3TypeCell = question3ContentCell.nextSibling;
    const question3UsedInTests = question3TypeCell?.nextSibling;
    expect(question3TypeCell?.textContent).toBe("Multiple choice");
    expect(question3UsedInTests?.textContent).toBe("1");
  });
});
