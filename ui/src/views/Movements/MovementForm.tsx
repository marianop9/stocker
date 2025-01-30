import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, useActionData } from "react-router-dom";
import { MovementFormSchemaErrors, MovementFormServerError } from "./movementFormActions";
import AppSelect from "@/components/AppSelect";
import { AppDialogFooter } from "@/components/AppDialog";

const movementTypeOpts = [
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

function MovementForm() {
    const actionData = useActionData() as
        | MovementFormSchemaErrors
        | MovementFormServerError
        | undefined;

    console.log(actionData);

    return (
        <Form method="POST">
            <AppFormEntry label="Referencia" name="reference">
                <Input name="reference" type="text" />
            </AppFormEntry>
            <AppFormEntry label="Tipo" name="type">
                <AppSelect
                    name="type"
                    options={movementTypeOpts}
                    defaultValue={movementTypeOpts[1].value}
                />
            </AppFormEntry>
            <AppFormEntry label="Fecha" name="date">
                <Input
                    name="date"
                    type="date"
                    defaultValue={new Date().toISOString().substring(0, 10)}
                />
            </AppFormEntry>

            <AppDialogFooter>
                <Button type="submit">Crear</Button>
            </AppDialogFooter>
        </Form>
    );
}

export default MovementForm;
