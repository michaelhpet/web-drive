import classes from "./styles.module.css";
import FolderIcon from "../../icons/FolderIcon";
import { FolderType } from "../../lib/types";
import { getDateInWords, getFilename } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../lib/state";

export default function Folder(props: FolderType) {
  const navigate = useNavigate();
  const { setDirNames } = useContext(AppContext);
  function handleDblClick() {
    setDirNames((dirNames) => ({ ...dirNames, [props.id]: props.name }));
    navigate(`/${props.id}`);
  }

  return (
    <li className={classes.folder} onDoubleClick={handleDblClick}>
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

export { default as SkeletonFolderCard } from "./SkeletonFolder";
