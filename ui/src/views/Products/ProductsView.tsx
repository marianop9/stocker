import ProductsDataTable from "./ProductsDataTable";
import { IProductDto, IProductView } from "@/models/products";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "@/components/AppDialog";
import ProductForm from "./ProductForm";
import { useState } from "react";
import AppAlert from "@/components/AppAlert";
import AppLink from "@/components/AppLink";

function ProductsView() {
    const [lastCreatedId, setLastCreatedId] = useState("");
    const [showProductForm, setShowProductForm] = useState(false);

    const { products } = useLoaderData() as {
        products: IProductView[];
    };

    const handleCreatedProduct = (p: IProductDto) => {
        setLastCreatedId(p.id);
        setShowProductForm(false);
    };

    return (
        <div className="p-8">
            {lastCreatedId && (
                <AppAlert className="mb-4" title="Producto creado" variant="success">
                    <AppLink label="Ver detalle" route={"/products/" + lastCreatedId} />
                </AppAlert>
            )}

            <div className="mb-4 flex justify-end">
                <AppDialog open={showProductForm} onOpenChange={setShowProductForm}>
                    <AppDialogTrigger asChild>
                        <Button onClick={() => setLastCreatedId("")}>Agregar producto</Button>
                    </AppDialogTrigger>
                    <AppDialogContent title="Agregar producto">
                        <ProductForm afterSubmit={handleCreatedProduct} />
                    </AppDialogContent>
                </AppDialog>
            </div>

            <ProductsDataTable products={products} />
        </div>
    );
}

export default ProductsView;
