import { AxiosError } from "axios";
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from "react-query";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
    retry: false,

    staleTime: 1000 * 120,
    cacheTime: 1000 * 120,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >;
