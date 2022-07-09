import { Location } from "react-router-dom";

interface LocationState {
  from: {
    pathname: string;
  };
}

export const getLocationState = (location: Location): LocationState | null => {
  if (hasLocationState(location.state)) {
    return location.state;
  }
  return null;
};

const hasLocationState = (state: unknown): state is LocationState =>
  isRecord(state) &&
  hasFromProp(state) &&
  isRecord(state.from) &&
  hasPathname(state.from);

const hasFromProp = (
  obj: Record<string, unknown>
): obj is { from: unknown } => {
  return "from" in obj;
};

const hasPathname = (
  obj: Record<string, unknown>
): obj is { pathname: string } => typeof obj.pathname === "string";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
