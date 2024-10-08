import { LoaderFunction, useLoaderData } from "react-router-dom";

export default function useAppRouterLoaderData<LoaderFn extends LoaderFunction>(
    loader: LoaderFn,
) {
    return useLoaderData() as Awaited<ReturnType<typeof loader>>;
}

/** Used as with a loader that satisfies LoaderFunction:
 * export const productsLoader = (async function () {
    return await productService.list();
    }) satisfies LoaderFunction;

 */
