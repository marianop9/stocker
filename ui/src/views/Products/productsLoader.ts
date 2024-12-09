import { productService } from "@/service/productService";
import {
    ActionFunction,
    redirect,
    type LoaderFunction,
} from "react-router-dom";
import { ProductFormSchema } from "./productSchemas";

// export const productsLoader = (() => {}) satisfies LoaderFunction
export const productsLoader = async function () {
    const products = productService.list();

    return {
        products: await products,
    };
} satisfies LoaderFunction;

export const productCreateAction: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const data = Object.fromEntries(form);

    const { success, data: product, error } = ProductFormSchema.safeParse(data);

    if (!success) {
        // if validation fails, cancel and return error object
        const err = error.format();
        console.log(err);
        return err;
    }

    const resp = await productService.create({
        ...product,
        sku: "todo!",
    });

    if (resp.success) {
        return redirect(resp.data.id);
    } else {
        throw resp.error;
    }
};
