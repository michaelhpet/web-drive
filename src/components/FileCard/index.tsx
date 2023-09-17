import classes from "./FileCard.module.css";
import modalClasses from "../FileModal/FileModal.module.css";
import imageIcon from "../../images/image_icon.png";
import pdfIcon from "../../images/pdf_icon.png";
import sheetsIcon from "../../images/sheets_icon.png";
import fileIcon from "../../images/file_icon.svg";
import { useState } from "react";
import FileModal from "../FileModal";
import DownloadIcon from "../../icons/DownloadIcon";
import PrintIcon from "../../icons/PrintIcon";
import HeartFilledIcon from "../../icons/HeartFilledIcon";
import HeartIcon from "../../icons/HeartIcon";
import { FileMeta, FileType } from "../../lib/types";
import { getDateInWords, getFileCategory, getFilename } from "../../lib/utils";
import { Image } from "antd";
import { FALLBACK_IMAGE_SRC } from "../../lib/constants";

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
            <Image
              src={file.src}
              alt={filename + " " + fileMeta.category}
              className={classes.thumbnail}
              preview={false}
              fallback={FALLBACK_IMAGE_SRC}
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

const FILE_METAS: Record<FileMeta["category"], FileMeta> = {
  image: { category: "image", color: "#FFF7E5", icon: imageIcon },
  pdf: { category: "pdf", color: "#FFEBEB", icon: pdfIcon },
  sheets: { category: "sheets", color: "#EBFAF3", icon: sheetsIcon },
  file: { category: "file", color: "#EBFAF3", icon: fileIcon },
};
