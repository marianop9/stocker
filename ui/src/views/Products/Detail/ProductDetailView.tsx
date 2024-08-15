import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { productDetailLoader } from "./productDetailLoader";
import ProductForm from "../ProductForm";
import {
    AppDialog,
    AppDialogTrigger,
    AppDialogContent,
} from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useParams, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IProductDetailView } from "@/models/products";
import { AppDataTable } from "@/components/AppDataTable";
import ProductDetailForm from "./ProductDetailForm";
import { useQuery } from "@tanstack/react-query";
import { productDetailService } from "@/service/productService";

function ProductDetailView() {
    const [productDialogOpen, setProductDialogOpen] = useState(false);

    const product = useAppRouterLoaderData(productDetailLoader);
    const routeParams = useParams();
    const productId = routeParams["id"]

    
    const { data: details } = useQuery({
        queryKey: ["product-details"],
        enabled: productId !== undefined,
        queryFn: () => productDetailService.list(productId!),
    });

    const { revalidate } = useRevalidator();

    const handleUpdatedProduct = () => {
        // manually revalidate product
        revalidate();
        setProductDialogOpen(false);
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

                    <AppDialog
                        open={productDialogOpen}
                        onOpenChange={setProductDialogOpen}
                    >
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

            <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Detalles</h2>
                <AppDialog>
                    <AppDialogTrigger asChild>
                        <div>
                            <Button>Agregar detalles</Button>
                        </div>
                    </AppDialogTrigger>
                    <AppDialogContent title="Agregar detalles">
                        <ProductDetailForm details={details?.items ?? []} />
                    </AppDialogContent>
                </AppDialog>
                <AppDataTable columns={productDetailsColumns} data={details?.items ?? []} />
            </div>
        </>
    );
}

const productDetailsColumns: ColumnDef<IProductDetailView>[] = [
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Color",
        accessorKey: "colorName",
    },
    {
        header: "Talle",
        accessorKey: "sizeAlias",
    },
];

export default ProductDetailView;
