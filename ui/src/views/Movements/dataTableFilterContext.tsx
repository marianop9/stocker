import { ColumnFiltersState } from "@tanstack/react-table";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";

type FilterModel = {
    filters: ColumnFiltersState;
    setFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
};

export const DataTableFilterContext = createContext<FilterModel | null>(null);

export function useDataTableFilterContext() {
    const ctx = useContext(DataTableFilterContext);

    if (ctx === null) {
        throw new Error(
            "useDataTableFilterContext should be used inside a DataTableFilterContext",
        );
    }

    return ctx;
}

export function DataTableFilterContextProvider({
    children,
}: PropsWithChildren) {
    const [filters, setFilters] = useState<ColumnFiltersState>([]);

    return (
        <DataTableFilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </DataTableFilterContext.Provider>
    );
}
