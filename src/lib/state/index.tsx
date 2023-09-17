import { ReactNode, createContext, useState } from "react";

export interface GlobalState {
  sortKey: "name" | "date";
  setSortKey: (args?: any) => any;
  dirNames: Record<string, string>;
  setDirNames: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const AppContext = createContext<GlobalState>({} as GlobalState);

export function AppContextProvider(props: { children: ReactNode }) {
  const [dirNames, setDirNames] = useState<GlobalState["dirNames"]>({});
  const [sortKey, setSortKey] = useState<GlobalState["sortKey"]>("date");

  return (
    <AppContext.Provider value={{ sortKey, dirNames, setSortKey, setDirNames }}>
      {props.children}
    </AppContext.Provider>
  );
}
