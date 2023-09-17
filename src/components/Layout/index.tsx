import { Button, MenuProps } from "antd";
import Dropdown from "../Dropdown";
import classes from "./Layout.module.css";
import { ReactNode } from "react";
import SortIcon from "../../icons/SortIcon";
import SearchIcon from "../../icons/SearchIcon";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <Button>Back</Button>
      </nav>
      <header className={classes.header}>
        <Dropdown menu={{ items: SORT_ITEMS }}>
          <p>Sort</p>
          <SortIcon />
        </Dropdown>

        <form className={classes.search_form}>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </form>
      </header>

      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

const SORT_ITEMS: MenuProps["items"] = [
  { key: "name", label: "By name" },
  { key: "time", label: "By time created" },
];
