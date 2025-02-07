import { pbClient } from "@/service/pocketbase";
import { productSpreadsheetProcessService } from "@/service/spreadsheetService";
import { ActionFunction, LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

export const spreadsheetsViewLoader = async function ({}: LoaderFunctionArgs) {
    const processes = await productSpreadsheetProcessService.all();

    return {
        processes,
    };
} satisfies LoaderFunction;

export const spreadsheetActions = async function ({ request }) {
    const data = await request.formData();
    const id = data.get("id") as string;

    switch (data.get("intent")) {
        case "create":
            const f = data.get("productsSpreadsheet") as File;
            console.log(f.name, f.size);

            return await productSpreadsheetProcessService.create(data);
        case "delete":
            await deleteRecord(id);
            break;
        case "process":
            await processRecord(id);
            break;
        default:
            console.log("unknown intent:", Object.fromEntries(data.entries()));
    }

    return null;
} satisfies ActionFunction;

async function deleteRecord(id: string) {
    const resp = await productSpreadsheetProcessService.delete(id);
    if (!resp.success) {
        console.error("failed to delete:", resp.error.response.message);
    }
}

async function processRecord(id: string) {
    const resp = await productSpreadsheetProcessService.process(id);
    if (!resp.success) {
        console.error("failed to process:", resp.error.response.message);
    }
}
