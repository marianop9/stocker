import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { ColumnFilter } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type GenericFilterModel<T> = {
    propertiesToFilter: { key: keyof T; label: string }[];
    // onFilterTermChange(term: string): void;
    // onFilteredPropertyChange(prop: keyof T): void;
    onFilterChange(filter: ColumnFilter): void;
};

function GenericFilter<T>({
    propertiesToFilter,
    // onFilterTermChange,
    // onFilteredPropertyChange,
    onFilterChange,
}: GenericFilterModel<T>) {
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");

    const [filteredProperty, setFilteredProperty] = useState<keyof T | null>(
        () =>
            propertiesToFilter.length > 0 ? propertiesToFilter[0].key : null,
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // onFilterTermChange(input);
            setDebouncedInput(input);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [input]);

    useEffect(() => {
        if (filteredProperty === null) {
            return;
        }

        onFilterChange({
            id: filteredProperty as string,
            value: debouncedInput,
        });
    }, [filteredProperty, debouncedInput]);

    // function handleFilteredPropertyChange(prop: keyof T) {
    //     onFilterChange({
    //         id: prop as string,
    //         value: input,
    //     });
    // }

    return (
        <>
            <AppFormEntry label="Filtro" name="">
                <Input
                    className="w-[300px] mr-5"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </AppFormEntry>
            <AppFormEntry label="Filtrar por" name="">
                <div className="flex gap-4">
                    {propertiesToFilter.map(({ key, label }, index) => (
                        <div key={key as string}>
                            <input
                                type="radio"
                                name="filterType"
                                id={"filterType" + (key as string)}
                                value={key as string}
                                onChange={() => setFilteredProperty(key)}
                                defaultChecked={index === 0}
                            />
                            <label
                                htmlFor={"filterType" + (key as string)}
                                className="ml-2"
                            >
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </AppFormEntry>
        </>
    );
}

export default GenericFilter;
