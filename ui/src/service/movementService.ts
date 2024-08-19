import { IStockEntryDto } from "@/models/movements";
import { executeService, ServiceResponse } from "./serviceResponse";
import { pbClient } from "./pocketbase";

export interface IStockEntryService {
    get(id: string): Promise<IStockEntryDto>
    create(dto: IStockEntryDto): Promise<ServiceResponse<IStockEntryDto>>;
}

export const stockEntryService: IStockEntryService = {
    async get(id) {
        return pbClient.stockEntries.getOne(id, {
            fields: 'id, reference, date'
        })
    },
    async create(dto) {
        const response = await executeService(
            pbClient.stockEntries.create<IStockEntryDto>(dto),
        );

        return response;
    },
};
