import { productService } from "@/server/productService";
import { useService } from "@/server/useService";
import { useEffect } from "react";
import ProductsDataTable from "./ProductsDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { IProductView } from "@/models/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  AppDialog,
  AppDialogContent,
  AppDialogTrigger,
} from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";

const columns: ColumnDef<IProductView>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "categoryName",
    header: "Categoria",
  },
  {
    accessorKey: "providerName",
    header: "Proveedor",
  },
  {
    id: "actions",
    cell({ row }) {
      return (
        <Button asChild>
          <Link to={"/products/" + row.getValue("id")}>Ver</Link>
        </Button>
      );
    },
  },
];

function ProductsView() {
  const { data, loading } = useService(productService.list);

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
  }, [loading, data]);

  return (
    <>
      <h1>Hello products</h1>
      <div>
        <ProductsDataTable columns={columns} data={data?.items ?? []} />
      </div>

      <AppDialog>
        <AppDialogTrigger asChild>
          <Button>Agregar producto</Button>
        </AppDialogTrigger>
        <AppDialogContent title="Agregar producto" >
          <AppFormEntry label="Nombre" name="name">
            <Input type="text" name="name" />
          </AppFormEntry>
          <AppFormEntry label="Descripción" name="description">
            <textarea
              name="description"
              defaultValue={''}
              rows={3}
              className="p-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground"
            ></textarea>
          </AppFormEntry>
        </AppDialogContent>
      </AppDialog>
    </>
  );
}

export default ProductsView;
