import { productService } from "@/service/productService";
import { LoaderFunction } from "react-router-dom";

export const productUnitLoader = async function ({ params }) {
    const id = params["id"]

    return productService.get(id ?? "");
} satisfies LoaderFunction;
