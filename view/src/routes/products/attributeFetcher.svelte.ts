import type { ProductAttribute } from "$lib/models/attributes.model";
import { CategoriesService, type ProductAttributeService } from "$lib/service/attributes.service";

export class AttributeFetcher<T extends ProductAttribute> {
    private readonly service: ProductAttributeService<T>;
    data: Array<T> = $state.raw([]);
    loading = $state(false);

    get fetched() {
        return !this.loading && this.data.length > 0;
    }

    async fetchData() {
        if (!this.fetched) {
            this.loading = true;
            this.data = await this.service.list();
            this.loading = false;
        }
    }

    constructor(service: ProductAttributeService<T>) {
        this.service = service;
    }
}
export const categoryFetcher = new AttributeFetcher(new CategoriesService());
