import AppSearchInput from "@/components/AppSearchInput";
import { IProductView } from "@/models/products";
import { productService } from "@/service/productService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
        <AppSearchInput label="Búsqueda de Productos" onSearchTermChange={setSearchTerm}>
            <ul>
                {results?.map((product) => (
                    <li key={product.id}>
                        <div className="cursor-pointer" onClick={() => onSelected(product)}>
                            {product.name}
                        </div>
                    </li>
                ))}
            </ul>
        </AppSearchInput>
    );
}

export default ProductSearch;
