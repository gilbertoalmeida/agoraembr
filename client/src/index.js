import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ConfigProvider } from "antd";
import pt_BR from "antd/es/locale/pt_BR";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <ConfigProvider locale={pt_BR}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
registerServiceWorker();
