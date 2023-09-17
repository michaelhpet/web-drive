import useSWR from "swr";
import { FileType, FolderType } from "../types";
import { useContext } from "react";
import { AppContext } from "../state";

interface GetFilesType {
  files: Array<FileType>;
  folders: Array<FolderType>;
  loading: boolean;
  sortKey: "name" | "date";
  setSortKey: (args?: any) => any;
}

export function useGetFiles(folderId?: string): GetFilesType {
  let endpoint = "https://fc-test.onrender.com";
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
