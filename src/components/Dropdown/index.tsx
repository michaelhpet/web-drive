import classes from "./styles.module.css";
import { Dropdown as AntdDropdown, DropdownProps } from "antd";

export default function Dropdown(props: DropdownProps) {
  return (
    <AntdDropdown {...props} overlayClassName={classes.dropdown}>
      <button className={classes.button}>{props.children}</button>
    </AntdDropdown>
  );
}
