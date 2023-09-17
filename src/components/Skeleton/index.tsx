import classes from "./styles.module.css";

interface Props {
  width?: number;
  height?: number;
}

export default function Skeleton(props: Props) {
  return (
    <div
      style={{ width: props?.width ?? "100%", height: props.height ?? "100%" }}
      className={classes.skeleton}
    />
  );
}
