import { QueryClient } from "react-query";

const defaultOptions = {
  queries: {
    retry: false,
  },
};

export function createQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: defaultOptions });
}
