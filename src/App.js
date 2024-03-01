import React from "react";
import AppRouter from "./routes/Router";
import store from "./modules/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
