import classes from "./FolderCard.module.css";
import FolderIcon from "../../icons/FolderIcon";
import { FolderType } from "../../lib/types";
import { getDateInWords } from "../../lib/utils";

export default function FolderCard(props: FolderType) {
  return (
    <li className={classes.folder}>
      <figure>
        <FolderIcon />
      </figure>

      <article>
        <p>{props.name}</p>
        <p>{getDateInWords(props.created_at)}</p>
      </article>
    </li>
  );
}
