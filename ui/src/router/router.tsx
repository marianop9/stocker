import App from "@/App";
import AppError from "@/AppError";
import AdminView from "@/views/Admin/AdminView";
import HomeView from "@/views/Home/HomeView";
import { productDetailLoader } from "@/views/Products/Detail/productDetailLoader";
import ProductDetailView from "@/views/Products/Detail/ProductDetailView";
import {
  productCreateAction,
  productsLoader,
} from "@/views/Products/productsLoader";
import ProductsView from "@/views/Products/ProductsView";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: <ProductDetailView />,
        loader: productDetailLoader,  
      },
      {
        path: "admin",
        element: <AdminView />,
      },
    ],
  },
]);

export default router;
