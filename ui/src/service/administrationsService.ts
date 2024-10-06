import { pbClient } from "./pocketbase";
import type {
    ICategory,
    IColor,
    IProvider,
    ISize,
} from "@/models/administrations";
import {
    executeService,
    ServiceResponse,
    ServiceSuccess,
} from "./serviceResponse";

interface IAdministrationService<TEntity> {
    list(): Promise<TEntity[]>;
    createUpdate(entity: TEntity): Promise<ServiceResponse<TEntity>>;
}
export const categoryService: IAdministrationService<ICategory> = {
    async list() {
        return pbClient.categories.getFullList({
            fields: "id, name, description, code",
        });
    },
    async createUpdate(c: ICategory) {
        let promise: Promise<ICategory>;
        if (c.id === "") {
            promise = pbClient.categories.create(c);
        } else {
            promise = pbClient.categories.update(c.id, c);
        }

        return executeService(promise);
    },
};
export const providerService: IAdministrationService<IProvider> = {
    async list() {
        return pbClient.providers.getFullList({
            fields: "id, name, description, code",
        });
    },
    async createUpdate(entity) {
        const promise =
            entity.id === ""
                ? pbClient.providers.create(entity)
                : pbClient.providers.update(entity.id, entity);

        return executeService(promise);
    },
};

export const colorService: IAdministrationService<IColor> = {
    async list() {
        return await pbClient.colors.getFullList({
            fields: "id, name, hexcode, code",
        });
    },
    async createUpdate(entity) {
        const promise =
            entity.id === ""
                ? pbClient.colors.create(entity)
                : pbClient.colors.update(entity.id, entity);

        return executeService(promise);
    },
};

export const sizeService: IAdministrationService<ISize> = {
    async list() {
        return await pbClient.sizes.getFullList({ fields: "id, alias, code" });
    },
    async createUpdate(entity) {
        const promise =
            entity.id === ""
                ? pbClient.sizes.create(entity)
                : pbClient.sizes.update(entity.id, entity);

        return executeService(promise);
    },
};
