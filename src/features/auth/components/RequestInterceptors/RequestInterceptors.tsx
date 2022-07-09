import useAuthInterceptors from "features/auth/hooks/useAuthInterceptors";
import { useEffect, useState } from "react";

export const RequestInterceptors = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isSet, setIsSet] = useState(false);
  useEffect(() => setIsSet(true), []);
  useAuthInterceptors();

  return isSet ? children : null;
};
