import { IProductSpreadsheetProcessDto } from "@/models/spreadsheets";
import { CustomEndpointResponse, pbClient } from "./pocketbase";
import { executeService, ServiceResponse } from "./serviceResponse";

interface IProductSpreadsheetProcessService {
    all(): Promise<IProductSpreadsheetProcessDto[]>;
    create(formdata: FormData): Promise<ServiceResponse<CustomEndpointResponse>>;
    process(id: string): Promise<ServiceResponse<CustomEndpointResponse>>;
    delete(id: string): Promise<ServiceResponse>;
}

export const productSpreadsheetProcessService: IProductSpreadsheetProcessService = {
    all() {
        return pbClient.productSpreadsheetProcesses.getFullList({
            fields: "id, description, state, executed, error",
            sort: "-updated",
        });
    },
    create(formdata) {
        return executeService(
            pbClient.callCustomEndpoint("spreadsheets", "load", formdata, "POST"),
        );
    },
    process(id) {
        return executeService(
            pbClient.callCustomEndpoint("spreadsheets", `process/${id}`, {}, "POST"),
        );
    },
    delete(id) {
        return executeService(pbClient.productSpreadsheetProcesses.delete(id));
    },
};
