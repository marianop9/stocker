import { pbClient } from './pocketbase'
import type { ListResult } from 'pocketbase'
import type { ICategory } from '@/models/administrations'

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
