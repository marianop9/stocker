import { createContext, PropsWithChildren, useContext, useState } from "react";

interface AppContextType {
    appError: string;
    setAppError: (err: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [appError, setAppError] = useState("");

    return <AppContext.Provider value={{ appError, setAppError }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }

    return context;
};

export { AppContextProvider, useAppContext };
