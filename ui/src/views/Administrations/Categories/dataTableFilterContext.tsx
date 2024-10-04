import { createContext, Dispatch, SetStateAction, useContext } from "react";

type FilterModel = {
    filterTerm: string;
    setFilterTerm: Dispatch<SetStateAction<string>>;
    filteredProperty: string;
    setfilteredProperty: Dispatch<SetStateAction<string>>;
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
