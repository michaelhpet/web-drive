import { MenuProps } from "antd";
import Dropdown from "../Dropdown";
import classes from "./Layout.module.css";
import { ReactNode } from "react";
import SortIcon from "../../icons/SortIcon";
import SearchIcon from "../../icons/SearchIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { folderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        {Boolean(folderId) ? (
          <>
            <button
              className={classes.back_button}
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon />
              <p>Back</p>
            </button>

            <h3>Brunch Memories villa</h3>
          </>
        ) : (
          <div style={{ width: 0, height: 40 }} />
        )}
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
