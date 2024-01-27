import "./index.css";
import React from "react";
import App from "./App/App";
import "./antdEditStyle.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./Redux/ReduxStore";
import ReactDOM from "react-dom/client";
import locale from "antd/es/locale/ru_RU";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ConfigProvider locale={locale}>
                    <App />
                </ConfigProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
