import AppBackNavButton from "@/components/AppBackNavButton";
import { AppDataTable } from "@/components/AppDataTable";
import { AppControlledDialogWrapper } from "@/components/AppDialogWrapper";
import AppShortTextTooltip from "@/components/AppShortTextTooltip";
import { formatDateTime } from "@/lib/formatters";
import {
    formatProductSpreadsheetProcessState,
    IProductSpreadsheetProcessDto,
} from "@/models/spreadsheets";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Form, useLoaderData, useRevalidator } from "react-router-dom";
import ProductSpreadsheetProcessForm from "./ProductSpreadsheetProcessForm";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<IProductSpreadsheetProcessDto>[] = [
    {
        accessorKey: "id",
    },
    {
        header: "Descripción",
        cell({ row }) {
            return <AppShortTextTooltip text={row.original.description} maxLen={25} />;
        },
        enableColumnFilter: false,
        maxSize: 100,
    },
    {
        header: "Estado",
        cell({ row }) {
            return <>{formatProductSpreadsheetProcessState(row.original.state)}</>;
        },
    },
    {
        header: "Ejecución",
        cell({ row }) {
            return <span>{row.original.executed && formatDateTime(row.original.executed)}</span>;
        },
        enableColumnFilter: false,
    },
    {
        header: "Error",
        cell({ row }) {
            return <AppShortTextTooltip text={row.original.error} maxLen={25} />;
        },
        enableColumnFilter: false,
        maxSize: 100,
    },
    {
        id: "actions",
        cell({ row }) {
            return (
                <Form method="post">
                    <input type="text" hidden name="id" defaultValue={row.original.id} />
                    <div className="flex">
                        {row.original.state === "PARSED" && (
                            <Button variant="link" name="intent" value="process">
                                Procesar
                            </Button>
                        )}
                        {row.original.state === "PARSED" && (
                            <Button variant="link" name="intent" value="delete">
                                Eliminar
                            </Button>
                        )}
                    </div>
                </Form>
            );
        },
    },
];

export default function () {
    const { processes } = useLoaderData() as {
        processes: IProductSpreadsheetProcessDto[];
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const revalidator = useRevalidator();

    function handleSubmitted() {
        revalidator.revalidate();
        setIsDialogOpen(false);
    }

    return (
        <>
            <div className="mb-4">
                <AppBackNavButton to="/products" />

                <div className="flex justify-end mb-4">
                    <AppControlledDialogWrapper
                        dialogTitle="Cargar planilla"
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        triggerLabel="Cargar planilla"
                    >
                        <ProductSpreadsheetProcessForm onSubmitted={handleSubmitted} />
                    </AppControlledDialogWrapper>
                </div>

                <AppDataTable columns={columns} data={processes} />
            </div>
        </>
    );
}
