import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import store from './stores/store'


import Page from "./pages/Page";
import "./index.scss";


const persistor = persistStore(store);

const App = () => (
  <div className="app">
    <Page />
  </div>
);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
