import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./lib/state/index.tsx";

const router = createBrowserRouter(
  ["/", "/:folderId", "*"].map((path) => ({
    path,
    element: (
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "'Euclid Circular A', system-ui, sans-serif",
          },
        }}
      >
        <App />
      </ConfigProvider>
    ),
  }))
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
