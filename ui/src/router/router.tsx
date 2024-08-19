import RootLayout from "@/RootLayout";
import AppError from "@/RootError";
import AdminView from "@/views/Admin/AdminView";
import HomeView from "@/views/Home/HomeView";
import ProductUnitView from "@/views/Products/Detail/ProductUnitView";
import { productUnitLoader } from "@/views/Products/Detail/productUnitLoader";
import {
    productCreateAction,
    productsLoader,
} from "@/views/Products/productsLoader";
import ProductsView from "@/views/Products/ProductsView";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import LoginView from "@/views/Login/LoginView";
import MovementsView from "@/views/Movements/MovementsView";
import { movementFormActions } from "@/views/Movements/movementFormActions";
import StockEntryView from "@/views/Movements/StockEntry/StockEntryView";
import { stockEntryViewLoader } from "@/views/Movements/StockEntry/stockEntryViewLoader";

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
                        action: productCreateAction,
                    },
                    {
                        path: "products/:id",
                        element: <ProductUnitView />,
                        loader: productUnitLoader,
                    },
                    {
                        path: "admin",
                        element: <AdminView />,
                    },
                    {
                        path: "movements",
                        element: <MovementsView />,
                        action: movementFormActions,
                    },
                    {
                        path: "movements/:id",
                        element: <StockEntryView />,
                        loader: stockEntryViewLoader,
                    },
                ],
            },
        ],
    },
]);

export default router;
