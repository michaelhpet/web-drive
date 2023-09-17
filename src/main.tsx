import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  ["/", "/:folderId"].map((path) => ({
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
