import { ConfigProvider } from "antd";
import Layout from "./components/Layout";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Euclid Circular A', system-ui, sans-serif",
        },
      }}
    >
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    </ConfigProvider>
  );
}
