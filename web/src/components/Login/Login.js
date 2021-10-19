import { Layout } from "../Layout/Layout";
import React from "react";
import { useDispatch } from "@logux/redux";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const routerHistory = useHistory();

  const dispatch = useDispatch();
  const [loginFormState, setLoginFormState] = React.useState({
    name: "",
    password: "",
  });
  const login = async () => {
    return dispatch.sync({
      type: "login",
      name: loginFormState.name,
      password: loginFormState.password,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    await login(loginFormState.name, loginFormState.password);
    routerHistory.push("/profile");
  };

  return (
    <Layout>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            value={loginFormState.name}
            onChange={(e) =>
              setLoginFormState({ ...loginFormState, name: e.target.value })
            }
          />
        </label>

        <label>
          Password:
          <input
            value={loginFormState.path}
            onChange={(e) =>
              setLoginFormState({
                ...loginFormState,
                password: e.target.value,
              })
            }
            type="password"
          />
        </label>

        <button>Login</button>
      </form>
    </Layout>
  );
};
