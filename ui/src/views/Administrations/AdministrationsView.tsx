import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import CategoriesTab from "./Categories/CategoriesTab";
import ProvidersTab from "./Providers/ProvidersTab";

function AdminView() {
    return (
        <Tabs defaultValue="categories">
            <TabsList className="w-full grid grid-cols-4 mb-10">
                <TabsTrigger value="categories">Categorias</TabsTrigger>
                <TabsTrigger value="providers">Proveedores</TabsTrigger>
                <TabsTrigger value="sizes">Talles</TabsTrigger>
                <TabsTrigger value="colors">Colores</TabsTrigger>
            </TabsList>
            <div className="w-2/3 mx-auto">
                <TabsContent value="categories">
                    <CategoriesTab />
                </TabsContent>
                <TabsContent value="providers">
                    <ProvidersTab />
                </TabsContent>
                <TabsContent value="sizes">
                    <h1>talles</h1>
                </TabsContent>
                <TabsContent value="colors">
                    <h1>colores</h1>
                </TabsContent>
            </div>
        </Tabs>
    );
}

export default AdminView;
