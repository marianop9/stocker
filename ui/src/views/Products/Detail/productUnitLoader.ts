import { productService, productUnitService } from "@/service/productService";
import { LoaderFunction } from "react-router-dom";

export const productUnitLoader = async function ({ params }) {
    const id = params["id"];

    const product = productService.get(id ?? "");
    const units = productUnitService.list(id!);

    return {
        product: await product,
        units: await units,
    };
} satisfies LoaderFunction;
