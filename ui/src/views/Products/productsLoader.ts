import { productService } from "@/service/productService";
import { ActionFunction, type LoaderFunction } from "react-router-dom";

// export const productsLoader = (() => {}) satisfies LoaderFunction
export const productsLoader = async function () {
    const products = productService.list();

    return {
        products: await products,
    };
} satisfies LoaderFunction;

export const productSaveAction: ActionFunction = async ({ request }) => {
    const isUpdate = request.method === "PUT";

    const form = await request.formData();

    // form.set("name", "");

    if (isUpdate) {
        return await productService.update(form);
    } else {
        return await productService.create(form);
    }
};
