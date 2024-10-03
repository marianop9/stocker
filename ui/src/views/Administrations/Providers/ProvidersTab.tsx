import { AppDataTable } from "@/components/AppDataTable";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { useCategories, useProviders } from "@/hooks/administrations";
import { ICategory } from "@/models/administrations";
import { ColumnDef, ColumnFilter } from "@tanstack/react-table";
import { useState } from "react";

const columns: ColumnDef<ICategory>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        filterFn: "includesString",
    },
    {
        accessorKey: "description",
        header: "Descripción",
    },
    {
        accessorKey: "code",
        header: "Código",
    },
];

function ProvidersTab() {
    const { data } = useProviders();
    const [filterTerm, setFilterTerm] = useState("");
    const [filterType, setFilterType] = useState("name");
    const columnFilter: ColumnFilter = { id: filterType, value: filterTerm };

    return (
        <>
            <div className="mb-5 flex bg-gray-100 p-4 rounded-md">
                <AppFormEntry label="Filtro" name="">
                    <Input
                        className="w-[300px] mr-5"
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                    />
                </AppFormEntry>
                <AppFormEntry label="Filtrar por" name="">
                    <div className="flex gap-4">
                        <div>
                            <input
                                type="radio"
                                name="filterType"
                                id="filterTypeName"
                                value="name"
                                onChange={(e) => setFilterType(e.target.value)}
                                defaultChecked
                            />
                            <label htmlFor="filterTypeName" className="ml-2">
                                Nombre
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="filterType"
                                id="filterTypeCode"
                                value="code"
                                onChange={(e) => setFilterType(e.target.value)}
                            />
                            <label htmlFor="filterTypeCode" className="ml-2">
                                Código
                            </label>
                        </div>
                    </div>
                </AppFormEntry>
            </div>
            <AppDataTable
                columns={columns}
                data={data ?? []}
                filters={[columnFilter]}
            />
        </>
    );
}

export default ProvidersTab;
