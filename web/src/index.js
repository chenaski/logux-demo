import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import reducer from "./reducers";
import { Provider } from "react-redux";
import { CrossTabClient, badge, badgeEn, log, Client } from "@logux/client";
import { badgeStyles } from "@logux/client/badge/styles";
import { createStoreCreator } from "@logux/redux";
import { ClientContext } from "@logux/client/react";

import "./global.css";

const client = new CrossTabClient({
  server: "ws://localhost:31337",
  subprotocol: "1.0.0",
  userId: localStorage.getItem("userId") || "anonymous",
  token: localStorage.getItem("token"),
});

const createStore = createStoreCreator(client);

const store = createStore(reducer);

badge(store.client, { messages: badgeEn, styles: badgeStyles });
log(store.client);

store.client.type("login/done", (action) => {
  localStorage.setItem("userId", action.userId);
  localStorage.setItem("token", action.token);
});
store.client.type("logux/undo", (action) => {
  alert(action.reason);
});
store.client.start();

ReactDOM.render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ClientContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
