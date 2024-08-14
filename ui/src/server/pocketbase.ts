import type { ICategory, Provider } from '@/models/administrations'
import type { IProductDto, IProductView } from '@/models/products'
import Client, { RecordService } from 'pocketbase'

class PocketBaseClient {
    private pb: Client

    constructor(url: string) {
        this.pb = new Client(url)
    }

    get categories(): RecordService<ICategory> {
        return this.pb.collection('categories')
    }

    get providers(): RecordService<Provider> {
        return this.pb.collection('providers')
    }

    get products(): RecordService<IProductDto> {
        return this.pb.collection('products')
    }

    get productsView(): RecordService<IProductView> {
        return this.pb.collection('products_view')
    }
}

const pbUrl = 'http://localhost:8090'
export const pbClient = new PocketBaseClient(pbUrl)
