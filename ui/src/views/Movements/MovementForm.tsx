import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetcher } from "react-router-dom";
import { MovementFormErrors } from "./movementFormActions";
import AppSelect from "@/components/AppSelect";
import { AppDialogFooter } from "@/components/AppDialog";
import { IMovementDto, MovementType, PaymentType } from "@/models/movements";
import { useEffect, useState } from "react";
import AppAlert from "@/components/AppAlert";
import { extractHTMLDate } from "@/lib/formatters";
import dayjs from "dayjs";

const movementTypeOpts: {
    label: string;
    value: MovementType;
}[] = [
    {
        label: "Compra",
        value: "IN",
    },
    {
        label: "Venta",
        value: "OUT",
    },
    {
        label: "Cambio",
        value: "EXCHANGE",
    },
];

const paymentTypeOpts: {
    label: string;
    value: PaymentType;
}[] = [
    {
        label: "Contado",
        value: "CASH",
    },
    {
        label: "Tarjeta",
        value: "CARD",
    },
    {
        label: "Promoción",
        value: "PROMO",
    },
];

interface Props {
    movement?: IMovementDto;
    onSubmitted?: () => void;
}
function MovementForm({ movement, onSubmitted }: Props) {
    const fetcher = useFetcher();
    const actionData = fetcher.data as MovementFormErrors | undefined;

    useEffect(() => {
        if (actionData?.errorType === "None" && onSubmitted !== undefined) {
            onSubmitted();
        }
    }, [actionData]);

    const formErrors =
        actionData && actionData.errorType === "Form" ? actionData.errors : undefined;
    const serverError =
        actionData && actionData.errorType === "Server" ? actionData.errors : undefined;

    const isUpdating = movement !== undefined;
    const [movementType, setMovementType] = useState(() =>
        movement ? movement.type : movementTypeOpts[1].value,
    );

    const [paymentType, setPaymentType] = useState(() =>
        movement ? movement.paymentType : paymentTypeOpts[1].value,
    );

    return (
        <fetcher.Form action="/movements" method="post">
            <input hidden name="id" defaultValue={movement?.id} />
            <input hidden name="state" defaultValue={movement?.state ?? "OPEN"} />
            <AppFormEntry
                label="Referencia"
                name="reference"
                errors={formErrors?.reference?._errors}
            >
                <Input name="reference" type="text" defaultValue={movement?.reference} />
            </AppFormEntry>
            <AppFormEntry label="Tipo" name="type" errors={formErrors?.type?._errors}>
                <AppSelect
                    name="type"
                    options={movementTypeOpts}
                    value={movementType}
                    onValueChange={(v) => setMovementType(v as MovementType)}
                    disabled={isUpdating}
                />
            </AppFormEntry>
            <AppFormEntry
                label="Tipo de venta"
                name="payment_type"
                errors={formErrors?.paymentType?._errors}
            >
                <AppSelect
                    name="paymentType"
                    options={paymentTypeOpts}
                    value={paymentType}
                    onValueChange={(v) => setPaymentType(v as PaymentType)}
                />
            </AppFormEntry>
            {paymentType === "PROMO" && (
                <AppFormEntry
                    label="Descuento (%)"
                    name="discount"
                    errors={formErrors?.discount?._errors}
                >
                    <Input
                        name="discount"
                        type="number"
                        step={0.1}
                        min={0}
                        max={100}
                        defaultValue={movement?.discount ?? 0}
                    />
                </AppFormEntry>
            )}
            <AppFormEntry label="Fecha" name="date" errors={formErrors?.date?._errors}>
                <Input
                    name="date"
                    type="date"
                    defaultValue={extractHTMLDate(movement?.date ? movement.date : dayjs())}
                />
            </AppFormEntry>

            {!!serverError && (
                <AppAlert variant="error" className="my-4">
                    {serverError}
                </AppAlert>
            )}

            <AppDialogFooter>
                <Button type="submit">Guardar</Button>
            </AppDialogFooter>
        </fetcher.Form>
    );
}

export default MovementForm;
