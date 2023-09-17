import { useParams } from "react-router-dom";
import classes from "./App.module.css";
import Layout from "./components/Layout";
import { useGetFiles } from "./lib/api";
import { Empty } from "antd";
import Folder from "./components/Folder";
import SkeletonFolder from "./components/Folder/SkeletonFolder";
import SkeletonFile from "./components/File/SkeletonFile";
import File from "./components/File";

export default function App() {
  const { folderId } = useParams();
  const { files, folders, loading } = useGetFiles(folderId);

  return (
    <Layout>
      <section className={classes.folders}>
        <h4>Folders</h4>
        {loading ? (
          <ul>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonFolder key={i} />
              ))}
          </ul>
        ) : (
          <ul>
            {Boolean(folders.length) ? (
              folders.map((folder) => <Folder key={folder.id} {...folder} />)
            ) : (
              <Empty className={classes.empty} />
            )}
          </ul>
        )}
      </section>

      <section className={classes.files}>
        <h4>Files</h4>
        {loading ? (
          <ul>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonFile key={i} />
              ))}
          </ul>
        ) : (
          <ul>
            {Boolean(files.length) ? (
              files.map((file) => <File key={file.id} {...file} />)
            ) : (
              <Empty className={classes.empty} />
            )}
          </ul>
        )}
      </section>
    </Layout>
  );
}
