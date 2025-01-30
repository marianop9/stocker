import RootLayout from "@/RootLayout";
import AppError from "@/RootError";
import AdmininstrationsView from "@/views/Administrations/AdministrationsView";
import HomeView from "@/views/Home/HomeView";
import ProductUnitView from "@/views/Products/Detail/ProductUnitView";
import { productUnitLoader } from "@/views/Products/Detail/productUnitLoader";
import { productSaveAction, productsLoader } from "@/views/Products/productsLoader";
import ProductsView from "@/views/Products/ProductsView";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import LoginView from "@/views/Login/LoginView";
import MovementsView from "@/views/Movements/MovementsView";
import { movementFormActions } from "@/views/Movements/movementFormActions";
import { movementsLoader } from "@/views/Movements/movementsLoader";
import MovementDetailView from "@/views/Movements/MovementDetail/MovementDetailView";
import movementDetailViewLoader from "@/views/Movements/MovementDetail/movementDetailViewLoader";
import { movementDetailViewActions } from "@/views/Movements/MovementDetail/movementDetailViewActions";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginView />,
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                errorElement: <AppError />,
                children: [
                    {
                        path: "",
                        element: <HomeView />,
                    },
                    {
                        path: "products",
                        element: <ProductsView />,
                        loader: productsLoader,
                        action: productSaveAction,
                    },
                    {
                        path: "products/:id",
                        element: <ProductUnitView />,
                        loader: productUnitLoader,
                    },
                    {
                        path: "admin",
                        element: <AdmininstrationsView />,
                    },
                    {
                        path: "movements",
                        element: <MovementsView />,
                        action: movementFormActions,
                        loader: movementsLoader,
                    },
                    {
                        path: "movements/:id",
                        element: <MovementDetailView />,
                        action: movementDetailViewActions,
                        loader: movementDetailViewLoader,
                    },
                ],
            },
        ],
    },
]);

export default router;
