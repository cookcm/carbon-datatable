import React from "react";
import { render } from "react-dom";


import  Page  from "./Pages/Page";

const App = () => (
  <div className="app">
    <Page />
  </div>
);

render(
    <App />,
  document.getElementById("root")
);