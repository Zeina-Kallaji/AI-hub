import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import {
  getErrorMessage,
  getErrorStatus,
  getFieldErrors,
} from "@/shared/api/errors";
import { PasswordField } from "../PasswordField";
import { loginFormSchema, type LoginFormSchema } from "./config";
import { useLogin } from "../../hooks/useLogin";

const formFields = ["email", "password"] as const;
const isFormField = (key: string): key is (typeof formFields)[number] =>
  (formFields as readonly string[]).includes(key);

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loginMutation = useLogin();

  const {
    // to be edited
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          const redirectPath = searchParams.get("redirect");

          const isInternalPath =
            redirectPath?.startsWith("/") &&
            !redirectPath.startsWith("//") &&
            !redirectPath.includes("\\");

          const destination = isInternalPath ? redirectPath : "/";

          navigate(destination, { replace: true });
        },
        
        onError: (err) => {
          const status = getErrorStatus(err);
          if (status === 400) {
            for (const [field, message] of Object.entries(
              getFieldErrors(err)
            )) {
              if (isFormField(field)) setError(field, { message });
            }
          }
        },
      }
    );
  });

  // 409/400 land on the fields; anything else (network, 500…) gets a banner
  const status = getErrorStatus(loginMutation.error);
  const showAlert = loginMutation.isError && status !== 400;
  const isPending = loginMutation.isPending;

  return (
    <Stack component="form" spacing={2} noValidate onSubmit={onSubmit}>
      {showAlert && (
        <Alert severity="error">{getErrorMessage(loginMutation.error)}</Alert>
      )}
      <TextField
        {...register("email")}
        label="Email"
        type="email"
        autoComplete="email"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <PasswordField
        {...register("password")}
        label="Password"
        autoComplete="new-password"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isPending}
        startIcon={
          isPending ? <CircularProgress size={20} color="inherit" /> : undefined
        }
      >
        Log In
      </Button>
    </Stack>
  );
}
