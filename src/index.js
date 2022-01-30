import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import  {configureStore}  from "./store";
import "./index.scss";

import Page from "./pages/Page";

const App = () => (
  <div className="app">
    <Page />
  </div>
);

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
