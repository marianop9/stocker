import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { productDetailLoader } from "./productDetailLoader";
import ProductForm from "../ProductForm";
import {
    AppDialog,
    AppDialogTrigger,
    AppDialogContent,
} from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useRevalidator } from "react-router-dom";
import { useState } from "react";

function ProductDetailView() {
    const [productDialogOpen, setProductDialogOpen] = useState(false);

    const product = useAppRouterLoaderData(productDetailLoader);

    const { revalidate } = useRevalidator();

    const handleUpdatedProduct = () => {
        // manually revalidate product
        revalidate();
        setProductDialogOpen(false)
    };

    return (
        <>
            <div className="flex">
                <div className="h-[250px] w-[200px] bg-gray-400 mr-4"></div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        {product?.name}
                    </h2>
                    <p>{product?.description}</p>
                    <div>
                        <span>
                            {product?.categoryName} / {product?.providerName}
                        </span>
                    </div>
                    <AppDialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                        <AppDialogTrigger asChild>
                            <Button>Modificar</Button>
                        </AppDialogTrigger>
                        <AppDialogContent title="Modificar producto">
                            <ProductForm
                                product={product}
                                afterSubmit={handleUpdatedProduct}
                            />
                        </AppDialogContent>
                    </AppDialog>
                </div>
            </div>
        </>
    );
}

export default ProductDetailView;
