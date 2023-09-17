import { MONTHS } from "../constants";
import { FileType, FolderType } from "../types";

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
  if (date === 1) dateSuffix = "st";
  if (date === 2) dateSuffix = "nd";
  if (date === 3) dateSuffix = "rd";

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
  const log = bytes ? Math.round(Math.log10(bytes)) : 1;
  let suffix = "kb";

  if (log > 2) suffix = "mb";
  if (log > 5) suffix = "gb";

  return (bytes / Math.pow(10, log)).toFixed(2) + suffix;
}
