import { MONTHS } from "../constants";
import { FileMeta, FileType, FolderType } from "../types";

/**
 * Get date in words
 * @param d Date string
 * @returns Date in words
 */
export function getDateInWords(d: string): string {
  const dateObject = new Date(d);
  const date = dateObject.getDate();
  const month = MONTHS[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  let dateSuffix = "th";

  if (date < 10 || date > 19) {
    if (date.toString().endsWith("1")) dateSuffix = "st";
    if (date.toString().endsWith("2")) dateSuffix = "nd";
    if (date.toString().endsWith("3")) dateSuffix = "rd";
  }

  return `${date}${dateSuffix} ${month}, ${year}`;
}

export async function getFileSizeFromUrl(url: string): Promise<number> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
    });
    return +(response.headers?.get("Content-Length") ?? 0);
  } catch (error) {
    return 0;
  }
}

export async function getFolderSize(folder: FolderType, bytes: number = 0) {
  if (!folder.contents.length) return 0;

  const files = folder.contents.filter(
    (content) => content.type === "file"
  ) as Array<FileType>;

  for (const file of files) {
    bytes += await getFileSizeFromUrl(file.src);
  }

  const folders = folder.contents.filter(
    (content) => content.type === "folder"
  ) as Array<FolderType>;

  for (const folder of folders) {
    bytes += await getFolderSize(folder, bytes);
  }

  return bytes;
}

export function getBytesInWord(bytes: number): string {
  const log = bytes ? Math.floor(Math.log10(bytes)) : 1;
  let suffix = "kb";

  if (log > 2) suffix = "mb";
  if (log > 5) suffix = "gb";

  return (bytes / Math.pow(10, log)).toFixed(2) + suffix;
}

export function getFileCategory(name: string): FileMeta["category"] {
  const ext = name.split(".")?.at(-1) ?? "";
  if (["jpg", "png", "jpeg", "webp"].includes(ext)) return "image";
  if (["xls", "xlsx"].includes(ext)) return "sheets";
  if (ext === "pdf") return "pdf";
  return "file";
}

export function getFilename(name: string): string {
  const tokens = name.split(".");

  const newTokens = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    newTokens.push(tokens[i]);
  }

  if (!newTokens.length) return name;

  return newTokens.join(" ");
}
