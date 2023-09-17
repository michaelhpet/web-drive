export interface FileType {
  id: string;
  type: "file";
  name: string;
  src: string;
  favourite: boolean;
  created_at: string;
}

export interface FolderType {
  id: string;
  type: "folder";
  name: string;
  favourite: boolean;
  created_at: string;
  contents: Array<FileType | FolderType>;
  size: number;
}
