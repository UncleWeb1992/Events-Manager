import { FC, FormEvent, useState } from "react";
import styles from "./Auth.module.scss";
import { Container } from "../../components/common/Container";
import { Button } from "../../components/common/Button";
import { TextField } from "../../components/common/TextFIeld";
import { Auth as AuthApi } from "../../api/auth";
import { useAppDispatch } from "../../hooks/redux";
import { authActions } from "../../store/slices/AuthSlice";
import { userActions } from "../../store/slices/UserSlice";
import { validation } from "../../utils/validation";

interface AuthProps {
  classess?: string;
}

const initState = {
  name: "",
  password: "",
};

const Auth: FC<AuthProps> = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initState);
  const [error, setError] = useState(initState);

  const disabled =
    !state.name.length ||
    !state.password.length ||
    !!Object.values(error).find((val) => !!val);

  const handleChange = (text: string, fieldName?: string) => {
    setError(initState);
    if (fieldName) {
      if (fieldName === "name") {
        setError((prev) => ({ ...prev, name: validation(text, "name") }));
      } else {
        setError((prev) => ({
          ...prev,
          password: validation(text, "password"),
        }));
      }

      setState((prev) => ({ ...prev, [fieldName]: text }));
    }
  };

  const onAuth = async () => {
    const result = await AuthApi.auth(state);

    if (result && result.length) {
      localStorage.setItem("user", JSON.stringify(result[0]));
      dispatch(authActions.setAuth(true));
      dispatch(userActions.setUser(result[0]));
    } else if (!result.length) {
      setError({
        name: "Неверный логин/пароль",
        password: "Неверный логин/пароль",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;
    await onAuth();
  };

  return (
    <Container>
      <div className={styles.root}>
        <form onSubmit={handleSubmit} className={styles.content}>
          <TextField
            error={error.name}
            value={state.name}
            onChange={handleChange}
            fieldName="name"
            placeholder="username"
            required
          />
          <TextField
            error={error.password}
            value={state.password}
            onChange={handleChange}
            fieldName="password"
            placeholder="password"
            required
          />
          <Button disabled={disabled} css={{ marginTop: 20 }} text="Войти" />
        </form>
      </div>
    </Container>
  );
};

export default Auth;
