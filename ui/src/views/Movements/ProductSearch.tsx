import {
    AppDialog,
    AppDialogContent,
    AppDialogFooter,
    AppDialogTrigger,
} from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import AppSearchInput from "@/components/AppSearchInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IStockEntryProductDto } from "@/models/movements";
import { IProductView } from "@/models/products";
import { stockEntryProductService } from "@/service/movementService";
import { productService } from "@/service/productService";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

interface ProductSearchProps {
    // stockEntryId: string;
    // onSubmitted(result: IStockEntryProductDto): void;
    onSelected(product: IProductView): void;
}

function ProductSearch({ onSelected }: ProductSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: results } = useQuery({
        queryKey: ["product-search", searchTerm],
        queryFn: () => productService.find(searchTerm),
        // enabled: searchTerm !== "",
    });

    return (
        <AppSearchInput onSearchTermChange={setSearchTerm}>
            <ul>
                {results?.map((product) => (
                    <li key={product.id}>
                        {/* <ProductSearchItemDialog
                            stockEntryId={stockEntryId}
                            product={result}
                            onSubmitted={onSubmitted}
                        /> */}
                        <div
                            className="cursor-pointer"
                            onClick={() => onSelected(product)}
                        >
                            {product.name}
                        </div>
                    </li>
                ))}
            </ul>
        </AppSearchInput>
    );
}

interface ProductSearchItemDialogProps {
    stockEntryId: string;
    product: IProductView;
    onSubmitted(result: IStockEntryProductDto): void;
}
function ProductSearchItemDialog({
    stockEntryId,
    product,
    onSubmitted,
}: ProductSearchItemDialogProps) {
    const [price, setPrice] = useState(0);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // add product to stock entry
        const response = await stockEntryProductService.addProduct({
            stockEntryId,
            productId: product.id,
            unitPrice: price,
        });

        if (response.success) {
            // notify success response to parents
            onSubmitted(response.data);
            setOpen(false);
        } else {
            console.error(response.error);
        }
    };

    return (
        // <AppDialog open={open} onOpenChange={setOpen}>
        //     <AppDialogTrigger>{product.name}</AppDialogTrigger>
        //     <AppDialogContent title={product.name}>
        //         <form onSubmit={handleSubmit}>
        //             <AppFormEntry name="price" label="Precio unitario">
        //                 <Input
        //                     type="number"
        //                     name="price"
        //                     value={price}
        //                     onChange={(e) =>
        //                         setPrice(Number.parseFloat(e.target.value))
        //                     }
        //                 />
        //             </AppFormEntry>
        //             <AppDialogFooter>
        //                 <Button>Agregar producto</Button>
        //             </AppDialogFooter>
        //         </form>
        //     </AppDialogContent>
        // </AppDialog>
        <div className="cursor-pointer">{product.name}</div>
    );
}

export default ProductSearch;
