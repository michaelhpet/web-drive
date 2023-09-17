import LikeIconButton from "../LikeIconButton";
import classes from "./FileCard.module.css";
import thumbnail from "../../images/file_thumbnail.png";
import imageIcon from "../../images/image_icon.png";
import pdfIcon from "../../images/pdf_icon.png";
import sheetsIcon from "../../images/sheets_icon.png";
import { useState } from "react";
import FileModal from "../FileModal";

interface Props {
  flat?: boolean;
}

export default function FileCard(props: Props) {
  const fileType = FILE_TYPES.image;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li
        className={props.flat ? classes.flat_card : classes.file}
        onClick={() => setIsOpen(true)}
      >
        <figure className={classes.thumbnail_wrapper}>
          <img src={thumbnail} alt="Thumbnail" />

          <span className={classes.like_button_wrapper}>
            <LikeIconButton />
          </span>
        </figure>

        <div className={classes.details}>
          <figure style={{ background: fileType.color }}>
            <img src={fileType.icon} alt={fileType.type + " icon"} />
          </figure>

          <article>
            <p>Brunch Memories villa</p>
            <p>10mb</p>
          </article>
        </div>
      </li>
      <FileModal
        centered
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        closeIcon={null}
        footer={null}
      />
    </>
  );
}

interface FileType {
  type: "image" | "pdf" | "sheets";
  color: string;
  icon: HTMLImageElement["src"];
}

const FILE_TYPES: Record<FileType["type"], FileType> = {
  image: { type: "image", color: "#FFF7E5", icon: imageIcon },
  pdf: { type: "pdf", color: "#FFEBEB", icon: pdfIcon },
  sheets: { type: "sheets", color: "#EBFAF3", icon: sheetsIcon },
};
