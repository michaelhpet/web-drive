import { useParams } from "react-router-dom";
import classes from "./App.module.css";
import FileCard from "./components/FileCard";
import FolderCard from "./components/FolderCard";
import Layout from "./components/Layout";
import { useGetFiles } from "./lib/api";
import { Empty } from "antd";

export default function App() {
  const { folderId } = useParams();
  const { files, folders, loading } = useGetFiles(folderId);

  if (loading) return null;

  return (
    <Layout>
      <section className={classes.folders}>
        <h4>Folders</h4>
        {folders.length ? (
          <ul>
            {folders.map((folder) => (
              <FolderCard key={folder.id} {...folder} />
            ))}
          </ul>
        ) : (
          <Empty className={classes.empty} />
        )}
      </section>

      <section className={classes.files}>
        <h4>Files</h4>
        {files.length ? (
          <ul>
            {files.map((file) => (
              <FileCard key={file.id} {...file} />
            ))}
          </ul>
        ) : (
          <Empty className={classes.empty} />
        )}
      </section>
    </Layout>
  );
}
