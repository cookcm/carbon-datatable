import React from "react";
import { render } from "react-dom";
import "./index.scss";


import  Page  from "./pages/Page";

const App = () => (
  <div className="app">
    <Page />
  </div>
);

render(
    <App />,
  document.getElementById("root")
);