import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppDebouncedInput from "../AppDebouncedInput";
import { useEffect } from "react";

// value could be string, check later
export type FilterOption = {
    label: string;
    value: unknown;
};

type AppColumnMeta = {
    variant: string;
    filterOpts?: FilterOption[];
};

interface Props {
    column: Column<any, unknown>;
}

function AppColumnFilter({ column }: Props) {
    /* Variants:
     *   Text
     *   Checkboxes: column should have a filterFn which supports arrays. For this variant the filter asumes its value is an array!
     */
    const { variant, filterOpts } = (column.columnDef.meta as AppColumnMeta) ?? {};

    const filterValue = column.getFilterValue();
    useEffect(() => {
        console.log(filterValue);
    }, [filterValue]);
    return (
        <div className="flex gap-2 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="p-0" size="sm" variant="ghost">
                        <Filter className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {variant === "checkboxes" ? (
                        filterOpts?.map((opt) => (
                            <DropdownMenuCheckboxItem
                                key={opt.label}
                                checked={((filterValue ?? []) as unknown[]).includes(opt.value)}
                                onCheckedChange={(c) => {
                                    if (c) {
                                        column.setFilterValue((old?: unknown[]) => [
                                            ...(old ?? []),
                                            opt.value,
                                        ]);
                                    } else {
                                        column.setFilterValue(
                                            (old?: unknown[]) =>
                                                old?.filter((x) => x !== opt.value) ?? [],
                                        );
                                    }
                                }}
                            >
                                {opt.label}
                            </DropdownMenuCheckboxItem>
                        ))
                    ) : (
                        <AppDebouncedInput
                            value={(filterValue ?? "") as string}
                            onChange={(val) => column.setFilterValue(val as string)}
                            type="text"
                            placeholder="Filtrar..."
                            className="pr-8"
                        />
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default AppColumnFilter;
