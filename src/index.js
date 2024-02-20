import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules/rootReducer";

const store = createStore(rootReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {console.log(store.getState())}
    <App />
  </Provider>,
);
