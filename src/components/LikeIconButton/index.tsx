import { useState } from "react";
import HeartFilledIcon from "../../icons/HeartFilledIcon";
import classes from "./LikeIconButton.module.css";
import HeartIcon from "../../icons/HeartIcon";

export default function LikeIconButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button className={classes.button} onClick={() => setLiked(!liked)}>
      {liked ? <HeartFilledIcon /> : <HeartIcon />}
    </button>
  );
}
