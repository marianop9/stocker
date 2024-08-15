import { pbClient } from './pocketbase'
import type { ListResult } from 'pocketbase'
import type { ICategory, IColor, ISize } from '@/models/administrations'

interface ICategoryService {
    list(): Promise<ListResult<ICategory>>
}

export const categoryService: ICategoryService = {
    async list() {
        return pbClient.categories.getList()
    },
}

interface IProviderService {
    list(): Promise<ListResult<ICategory>>
}

export const providerService: IProviderService = {
    async list() {
        return pbClient.providers.getList()
    },
}

interface IAdministrationService<TEntity> {
    list(): Promise<TEntity[]>
}

export const colorService: IAdministrationService<IColor> = {
    async list() {
        return await pbClient.colors.getFullList({fields: 'id, name, hexcode'})
    },
}

export const sizeService: IAdministrationService<ISize> = {
    async list() {
        return await pbClient.sizes.getFullList({fields: 'id, alias'})
    },
}