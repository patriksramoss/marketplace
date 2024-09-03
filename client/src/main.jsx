import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import store from "./Store";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);
