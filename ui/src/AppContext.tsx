import { createContext, PropsWithChildren, useContext, useState } from "react";

type AppData = {
  title: string;
  setTitle: (t: string) => void;
};

const AppContext = createContext<AppData | undefined>(undefined);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within a Provider");
  }

  return ctx;
}


export function AppContextProvider({ children }: PropsWithChildren) {
  const [title, setTitle] = useState("");

  return (
    <AppContext.Provider value={{ title, setTitle }}>
      {children}
    </AppContext.Provider>
  );
}
