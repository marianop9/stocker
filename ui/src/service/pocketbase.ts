import type { ICategory, IColor, IProvider, ISize } from '@/models/administrations'
import type { IProductDetailView, IProductDto, IProductView } from '@/models/products'
import Client, { RecordService } from 'pocketbase'

class PocketBaseClient {
    private pb: Client

    constructor(url: string) {
        this.pb = new Client(url)
    }

    get categories(): RecordService<ICategory> {
        return this.pb.collection('categories')
    }

    get providers(): RecordService<IProvider> {
        return this.pb.collection('providers')
    }

    get colors(): RecordService<IColor> {
        return this.pb.collection('colors')
    }

    get sizes(): RecordService<ISize> {
        return this.pb.collection('sizes')
    }

    get products(): RecordService<IProductDto> {
        return this.pb.collection('products')
    }

    get productsView(): RecordService<IProductView> {
        return this.pb.collection('products_view')
    }

    get productDetailsView(): RecordService<IProductDetailView> {
        return this.pb.collection('product_details_view')
    }
}

const pbUrl = 'http://localhost:8090'
export const pbClient = new PocketBaseClient(pbUrl)
