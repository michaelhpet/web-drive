import classes from "./Folder.module.css";
import FolderIcon from "../../icons/FolderIcon";

export default function FolderCard() {
  return (
    <li className={classes.folder}>
      <figure>
        <FolderIcon />
      </figure>

      <article>
        <p>Brunch Memories villa</p>
        <p>10mb</p>
      </article>
    </li>
  );
}
