import classes from "./FolderCard.module.css";
import FolderIcon from "../../icons/FolderIcon";
import { FolderType } from "../../lib/types";
import { getDateInWords, getFilename } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function FolderCard(props: FolderType) {
  const navigate = useNavigate();

  return (
    <li className={classes.folder} onClick={() => navigate(`/${props.id}`)}>
      <figure>
        <FolderIcon />
      </figure>

      <article>
        <p>{getFilename(props.name)}</p>
        <p>{getDateInWords(props.created_at)}</p>
      </article>
    </li>
  );
}
