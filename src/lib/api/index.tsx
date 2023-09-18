import useSWR from "swr";
import { FileDownloadInfo, FileType, FolderType } from "../types";
import { useContext } from "react";
import { AppContext } from "../state";
import axios from "axios";
import { getBytesInWord } from "../utils";
import { message } from "antd";
import DownloadFile from "../../components/File/DownloadFile";
import { API_URL } from "../constants";

interface GetFilesType {
  files: Array<FileType>;
  folders: Array<FolderType>;
  loading: boolean;
  sortKey: "name" | "date";
  setSortKey: (args?: any) => any;
}

export function useGetFiles(folderId?: string): GetFilesType {
  let endpoint = API_URL;
  if (folderId) endpoint += "/file/" + folderId;

  const { sortKey, setSortKey } = useContext(AppContext);

  const {
    data,
    isLoading: loading,
    error,
  } = useSWR([endpoint, folderId, sortKey], fetcher);

  if (error || !data)
    return {
      files: [],
      folders: [],
      loading,
      sortKey,
      setSortKey,
    };

  let files: Array<FileType> = data
    .filter((data: any) => data?.type === "file")
    .map((data: any) => ({
      id: data.id,
      type: data.type,
      name: data.name,
      src: data.src,
      favourite: data.favourite,
      created_at: data.created_at,
    }));

  let folders: Array<FolderType> = data
    .filter((data: any) => data?.type === "folder")
    .map((data: any) => ({
      id: data.id,
      type: data.type,
      name: data.name,
      favourite: data.favourite,
      created_at: data.created_at,
      contents: data.contents,
      size: data.size,
    }));

  files = sortData(files, sortKey);
  folders = sortData(folders, sortKey);

  return {
    files,
    folders,
    loading,
    sortKey,
    setSortKey,
  };
}

async function fetcher([url]: Array<string>): Promise<Array<any>> {
  try {
    const response = await fetch(url);
    let data: Array<any> = await response.json();

    // for (const item of data) {
    //   if (item?.type === "folder") {
    //     item.size = getBytesInWord(await getFolderSize(item));
    //   }
    // }

    return data;
  } catch (error) {
    return [];
  }
}

function sortData<T extends FileType | FolderType>(
  data: Array<T>,
  sortKey: "name" | "date"
): Array<T> {
  if (sortKey === "name")
    return data.sort((a, b) => a.name.localeCompare(b.name));

  return data.sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return aTime - bTime;
  });
}

export function useDownloadFile() {
  /**
   * Download a file with real-time progress (in bytes)
   * @param src URL to file to download
   * @param filename Filename to save once download is completed
   */
  async function downloader(src: string, options: FileDownloadInfo) {
    message.open({
      key: "progress",
      content: <DownloadFile {...options} />,
      duration: 0,
    });
    const response = await axios.get(src, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        if (document) {
          const progressElement = document.getElementById("download-progress");
          if (progressElement && progressEvent.loaded)
            progressElement.innerHTML = `${getBytesInWord(
              progressEvent.loaded
            )} &bull; ${Math.round(
              (progressEvent.loaded * 100) /
                (progressEvent.total || progressEvent.loaded)
            )}% done`;
        }
      },
    });

    const href = URL.createObjectURL(response.data);
    const linkElement = document.createElement("a");
    linkElement.href = href;
    linkElement.setAttribute("download", options.filename);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    URL.revokeObjectURL(href);

    if (window) {
      setTimeout(() => {
        message.destroy("progress");
      }, 5000);
    }
  }

  return downloader;
}
