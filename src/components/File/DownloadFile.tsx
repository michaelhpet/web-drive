import classes from "./styles.module.css";
import { FileMeta } from "../../lib/types";

interface Props extends FileMeta {
  filename: string;
}

export default function DownloadFile(props: Props) {
  return (
    <div className={classes.details}>
      <figure style={{ background: props.color }}>
        <img src={props.icon} alt={props.category + " icon"} />
      </figure>

      <article>
        <p>{props.filename}</p>
        <p id="download-progress">0.00kb &bull; 0% done</p>
      </article>
    </div>
  );
}
