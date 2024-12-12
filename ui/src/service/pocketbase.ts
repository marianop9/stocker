import type { ICategory, IColor, IProvider, ISize } from "@/models/administrations";
import { IMovementDto, IStockEntryDto, IStockEntryProductDto } from "@/models/movements";
import type { IProductUnitView, IProductDto, IProductView } from "@/models/products";
import IUser from "@/models/user";
import Client, { RecordService } from "pocketbase";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type CustomEndpointResponse = any;

class PocketBaseClient {
    private pb: Client;

    constructor(url: string) {
        this.pb = new Client(url);
    }

    logout() {
        this.pb.authStore.clear();
    }

    getInternalClient() {
        return this.pb;
    }

    callCustomEndpoint<T = CustomEndpointResponse>(
        module: string,
        action: string,
        body: any,
        method: HttpMethod = "POST",
    ): Promise<T> {
        const url = `/api/custom/${module}/${action}`;

        return this.getInternalClient().send<T>(url, {
            body,
            method,
        });
    }

    get users(): RecordService<IUser> {
        return this.pb.collection("users");
    }

    get categories(): RecordService<ICategory> {
        return this.pb.collection("categories");
    }

    get providers(): RecordService<IProvider> {
        return this.pb.collection("providers");
    }

    get colors(): RecordService<IColor> {
        return this.pb.collection("colors");
    }

    get sizes(): RecordService<ISize> {
        return this.pb.collection("sizes");
    }

    get products(): RecordService<IProductDto> {
        return this.pb.collection("products");
    }

    get productsView(): RecordService<IProductView> {
        return this.pb.collection("products_view");
    }

    get productUnitsView(): RecordService<IProductUnitView> {
        return this.pb.collection("product_units_view");
    }

    get stockEntries(): RecordService<IStockEntryDto> {
        return this.pb.collection("stock_entries");
    }

    get movements(): RecordService<IMovementDto> {
        return this.pb.collection("movements");
    }

    get stockEntryProductsView(): RecordService<IStockEntryProductDto> {
        return this.pb.collection("stock_entry_products_view");
    }
}

const pbUrl = "http://localhost:8090";
export const pbClient = new PocketBaseClient(pbUrl);
