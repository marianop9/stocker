import { pbClient } from "./pocketbase";
import type {
    ICategory,
    IColor,
    IProvider,
    ISize,
} from "@/models/administrations";

interface IAdministrationService<TEntity> {
    list(): Promise<TEntity[]>;
}
export const categoryService: IAdministrationService<ICategory> = {
    async list() {
        return pbClient.categories.getFullList({
            fields: "id, name, description, code",
        });
    },
};
export const providerService: IAdministrationService<IProvider> = {
    async list() {
        return pbClient.providers.getFullList({
            fields: "id, name, description, code",
        });
    },
};

export const colorService: IAdministrationService<IColor> = {
    async list() {
        return await pbClient.colors.getFullList({
            fields: "id, name, hexcode",
        });
    },
};

export const sizeService: IAdministrationService<ISize> = {
    async list() {
        return await pbClient.sizes.getFullList({ fields: "id, alias" });
    },
};
