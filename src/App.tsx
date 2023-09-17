import classes from "./App.module.css";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <section className={classes.folders}>
        <h4>Folders</h4>
        <ul></ul>
      </section>

      <section className={classes.files}>
        <h4>Files</h4>
        <ul></ul>
      </section>
    </Layout>
  );
}
