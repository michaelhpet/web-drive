import classes from "./FileCard.module.css";
import modalClasses from "../FileModal/FileModal.module.css";
import imageIcon from "../../images/image_icon.png";
import pdfIcon from "../../images/pdf_icon.png";
import sheetsIcon from "../../images/sheets_icon.png";
import { useState } from "react";
import FileModal from "../FileModal";
import DownloadIcon from "../../icons/DownloadIcon";
import PrintIcon from "../../icons/PrintIcon";
import HeartFilledIcon from "../../icons/HeartFilledIcon";
import HeartIcon from "../../icons/HeartIcon";
import { FileType } from "../../lib/types";
import { getDateInWords } from "../../lib/utils";

interface Props extends FileType {
  flat?: boolean;
}

export default function FileCard(props: Props) {
  const { flat, ...file } = props;
  const filename = getFilename(file.name);
  const fileCategory = getFileCategory(file.name);
  const fileMeta = FILE_METAS[fileCategory];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li
        className={flat ? classes.flat_card : classes.file}
        onClick={() =>
          fileMeta.category === "image" && !flat && setIsOpen(true)
        }
      >
        {fileMeta.category === "image" ? (
          <figure className={classes.thumbnail_wrapper}>
            <img
              src={file.src}
              alt={filename + " " + fileMeta.category}
              className={classes.thumbnail}
              {...(flat ? { style: { minHeight: 392, maxHeight: 392 } } : {})}
            />

            <span className={classes.like_button_wrapper}>
              <button className={classes.button}>
                {props.favourite ? <HeartFilledIcon /> : <HeartIcon />}
              </button>
            </span>
          </figure>
        ) : (
          <figure className={classes.action_wrapper}>
            <span className={classes.like_button_wrapper}>
              <button className={classes.button}>
                {props.favourite ? <HeartFilledIcon /> : <HeartIcon />}
              </button>
            </span>

            <img
              src={fileMeta.icon}
              alt={fileMeta.category + " icon"}
              className={classes.thumbnail}
            />

            <div className={classes.action_buttons}>
              <button className={modalClasses.download_button}>
                <DownloadIcon />
              </button>
              <button className={modalClasses.download_button}>
                <PrintIcon />
              </button>
            </div>
          </figure>
        )}

        <div className={classes.details}>
          <figure style={{ background: fileMeta.color }}>
            <img src={fileMeta.icon} alt={fileMeta.category + " icon"} />
          </figure>

          <article>
            <p>{filename}</p>
            <p>{getDateInWords(file.created_at)}</p>
          </article>
        </div>
      </li>

      <FileModal
        centered
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        closeIcon={null}
        footer={null}
        file={file}
      />
    </>
  );
}

interface FileMeta {
  category: "image" | "pdf" | "sheets";
  color: string;
  icon: HTMLImageElement["src"];
}

const FILE_METAS: Record<FileMeta["category"], FileMeta> = {
  image: { category: "image", color: "#FFF7E5", icon: imageIcon },
  pdf: { category: "pdf", color: "#FFEBEB", icon: pdfIcon },
  sheets: { category: "sheets", color: "#EBFAF3", icon: sheetsIcon },
};

function getFileCategory(name: string): FileMeta["category"] {
  const ext = name.split(".")?.at(-1) ?? "";
  if (["jpg", "png", "jpeg", "webp", "svg"].includes(ext)) return "image";
  if (["xls", "xlsx"].includes(ext)) return "sheets";
  return "pdf";
}

function getFilename(name: string): string {
  const tokens = name.split(".");

  const newTokens = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    newTokens.push(tokens[i]);
  }

  return newTokens.join(" ");
}
