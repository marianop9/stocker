import { ColumnFiltersState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterOption = {
    label: string;
    value: unknown;
};

interface Props {
    columnId: string;
    columnLabel: string;
    filters: ColumnFiltersState;
    setFilters: (f: ColumnFiltersState) => void;
    opts: FilterOption[];
}

function AppColumnFilter({
    columnId,
    columnLabel,
    filters,
    setFilters,
    opts,
}: Props) {
    return (
        <div className="flex gap-2 items-center">
            {columnLabel}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="p-0" size="sm" variant="ghost">
                        <Filter className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {opts.map((opt) => (
                        <DropdownMenuCheckboxItem
                            key={opt.label}
                            checked={filters.some(
                                (f) =>
                                    f.id === columnId && f.value === opt.value,
                            )}
                            onCheckedChange={(checked) => {
                                if (checked)
                                    setFilters([
                                        ...filters,
                                        { id: columnId, value: opt.value },
                                    ]);
                                else
                                    setFilters(
                                        filters.filter(
                                            (f) =>
                                                f.id !== columnId &&
                                                f.value !== opt.value,
                                        ),
                                    );
                            }}
                        >
                            {opt.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default AppColumnFilter;
