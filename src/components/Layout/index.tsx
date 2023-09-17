import { MenuProps } from "antd";
import Dropdown from "../Dropdown";
import classes from "./styles.module.css";
import { ReactNode, useContext } from "react";
import SortIcon from "../../icons/SortIcon";
import SearchIcon from "../../icons/SearchIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../lib/state";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { dirNames, setSortKey } = useContext(AppContext);

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

            {folderId ? <h3>{dirNames[folderId]}</h3> : null}
          </>
        ) : (
          <div style={{ width: 0, height: 40 }} />
        )}
      </nav>

      <header className={classes.header}>
        <Dropdown menu={{ items: getSortItems(setSortKey) }}>
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

function getSortItems(setSortKey: (args?: any) => any): MenuProps["items"] {
  return [
    { key: "name", label: "By name", onClick: () => setSortKey("name") },
    {
      key: "time",
      label: "By time created",
      onClick: () => setSortKey("time"),
    },
  ];
}
