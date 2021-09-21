import React from "react";
import "./App.css";

function App() {
  const [loginFormState, setLoginFormState] = React.useState({
    name: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div>
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
      </div>
    </div>
  );
}

export default App;
