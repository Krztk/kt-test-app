import { Button } from "@mantine/core";
import { TextInput } from "components/forms";
import { LoginCredentialsDTO } from "features/auth/api/login";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocationState } from "utils/locationState";
import { useAuth } from "../../hooks/useAuth";
import { validationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../helpers/authenticationHelpers";
import { ErrorMessage } from "components/forms";
import { getErrorMessage } from "utils/errorHelpers";

const LoginForm = () => {
  const { setUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = getLocationState(location)?.from.pathname ?? "/";
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<LoginCredentialsDTO>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    const subscription = watch((_, { type }) => {
      if (type === "change") setError(null);
    });
    return () => subscription.unsubscribe();
  }, [watch, setError]);

  const onSubmitForm: SubmitHandler<LoginCredentialsDTO> = async (values) => {
    try {
      await login(values, setUserData);
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      console.error("error while siging in", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <TextInput mb="sm" control={control} name="username" label="Username" />
      <TextInput
        mb="sm"
        control={control}
        name="password"
        label="Password"
        type="password"
      />
      {error && <ErrorMessage mb="sm" error={error} />}
      <Button loading={isSubmitting} type="submit" fullWidth color="blue">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
