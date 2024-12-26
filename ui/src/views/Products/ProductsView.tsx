import ProductsDataTable from "./ProductsDataTable";
import { IProductDto } from "@/models/products";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "@/components/AppDialog";
import ProductForm from "./ProductForm";
import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { productsLoader } from "./productsLoader";

function ProductsView() {
    const navigate = useNavigate();

    const { products } = useAppRouterLoaderData(productsLoader);
    // const { products } = useLoaderData() as {
    //     products: IProductView[];
    // };

    const handleCreatedProduct = (p: IProductDto) => {
        // navigate to detail once created
        navigate(p.id);
    };

    return (
        <div className="p-8">
            <ProductsDataTable products={products} />

            <AppDialog>
                <AppDialogTrigger asChild>
                    <Button>Agregar producto</Button>
                </AppDialogTrigger>
                <AppDialogContent title="Agregar producto">
                    <ProductForm afterSubmit={handleCreatedProduct} />
                </AppDialogContent>
            </AppDialog>
        </div>
    );
}

export default ProductsView;
