import { MenuProps } from "antd";
import Dropdown from "../Dropdown";
import classes from "./Layout.module.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Dropdown menu={{ items: SORT_ITEMS }}>Sort</Dropdown>
      </header>

      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

const SORT_ITEMS: MenuProps["items"] = [
  { key: "name", label: "By name" },
  { key: "time", label: "By time created" },
];
