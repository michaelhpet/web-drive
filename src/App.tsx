import classes from "./App.module.css";
import FileCard from "./components/FileCard";
import FolderCard from "./components/FolderCard";
import Layout from "./components/Layout";
import { useGetFiles } from "./lib/api";

export default function App() {
  const { files, folders, loading } = useGetFiles();

  if (loading) return null;

  return (
    <Layout>
      <section className={classes.folders}>
        <h4>Folders</h4>
        <ul>
          {folders.map((folder) => (
            <FolderCard key={folder.id} {...folder} />
          ))}
        </ul>
      </section>

      <section className={classes.files}>
        <h4>Files</h4>
        <ul>
          {files.map((file) => (
            <FileCard key={file.id} {...file} />
          ))}
        </ul>
      </section>
    </Layout>
  );
}
