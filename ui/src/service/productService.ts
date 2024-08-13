import type { IProductCreateDto, IProductDto, IProductView } from '@/models/products'
import { pbClient } from './pocketbase'
import type { ListResult } from 'pocketbase'

type ServiceResponse<T> = ServiceSuccess<T> | ServiceError

class ServiceSuccess<T> {
    success: true
    data: T

    constructor(data: T) {
        this.success = true
        this.data = data
    }
}
class ServiceError {
    success: false
    error: ClientResponseError

    constructor(error: ClientResponseError) {
        this.success = false
        this.error = error
    }
}

type ClientResponseError = {
    url: string // requested url
    status: number // response status code
    response: PocketBaseError // the API JSON error response
    isAbort: boolean // is abort/cancellation error
    originalError: Error | null // the original non-normalized error
}

function isClientResponseError(err: any): err is ClientResponseError {
    return err && typeof err.isAbort === 'boolean' && typeof err.originalError === 'object'
}

type PocketBaseError = {
    code: number
    message: string
    data: any
}

interface IProductSerivce {
    list(): Promise<ListResult<IProductView>>
    create(p: IProductCreateDto): Promise<ServiceResponse<IProductDto>>
    update(p: IProductDto): Promise<ServiceResponse<IProductDto>>
}

export const productService: IProductSerivce = {
    async list() {
        return pbClient.productsView.getList()
    },
    async create(p: IProductCreateDto) {
        try {
            const result = await pbClient.products.create({
                name: p.name,
                description: p.description,
                category: p.categoryId,
                provider: p.providerId,
            })

            return new ServiceSuccess(result)
        } catch (error) {
            if (isClientResponseError(error)) {
                const resp = new ServiceError(error)
                console.error(resp)
                return resp
            } else {
                throw error
            }
        }
    },
    async update(p: IProductDto) {
        return pbClient.products.update(p.id, {
            name: p.name,
            description: p.description,
            category: p.categoryId,
            provider: p.providerId,
        })
    },
}
