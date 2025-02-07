import AppAlert from "@/components/AppAlert";
import { AppDialogFooter, AppDialogClose } from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productSpreadsheetProcessService } from "@/service/spreadsheetService";
import { FormEvent, useRef, useState } from "react";

export default function ProductSpreadsheetProcessForm({ onSubmitted }: { onSubmitted(): void }) {
    const [fileErrMsg, setFileErrMsg] = useState("");
    const [serverError, setServerError] = useState("");

    const fileRef = useRef<HTMLInputElement>(null);

    function validateFile(f: File) {
        setFileErrMsg("");

        if (!f.name.endsWith(".csv")) {
            setFileErrMsg("El archivo debe ser de tipo .csv");
        } else if (f.size > 5 << 20) {
            setFileErrMsg("El tamaño del archivo no debe superar 5 MB");
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerError("");

        const fdata = new FormData(e.currentTarget);

        const resp = await productSpreadsheetProcessService.create(fdata);
        if (!resp.success) {
            setServerError(resp.error.response.message);
            return;
        }

        onSubmitted();
    }

    return (
        // targets 'spreadsheetActions'
        <form onSubmit={handleSubmit}>
            {serverError && (
                <AppAlert variant="error" className="mb-4">
                    {serverError}
                </AppAlert>
            )}
            <AppFormEntry label="Descripción" name="description">
                <Textarea name="description" required />
            </AppFormEntry>

            <AppFormEntry
                label="Archivo"
                name="productsSpreadsheet"
                errors={fileErrMsg}
                helperText="Archivo .csv exportado de la planilla"
            >
                <div className="flex gap-x-2">
                    <Input
                        type="file"
                        required
                        name="productsSpreadsheet"
                        accept=".csv"
                        onChange={(e) => {
                            if (!e.target.files || e.target.files.length != 1) return;

                            const f = e.target.files[0];
                            console.log(f.name, f.size, f.type);

                            validateFile(f);
                        }}
                        ref={fileRef}
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => (fileRef.current!.value = "")}
                    >
                        Borrar
                    </Button>
                </div>
            </AppFormEntry>

            <AppDialogFooter className="gap-x-2 mt-2">
                <AppDialogClose>Cancelar</AppDialogClose>
                <Button type="submit">Guardar</Button>
            </AppDialogFooter>
        </form>
    );
}
