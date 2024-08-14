import App from "@/App";
import AdminView from "@/views/Admin/AdminView";
import HomeView from "@/views/Home/HomeView";
import ProductDetailView from "@/views/Products/Detail/ProductDetailView";
import ProductsView from "@/views/Products/ProductsView";
import { createBrowserRouter } from "react-router-dom";

type AppRoute = {
  path: string;
  element: JSX.Element;
  children?: AppRoute[];
  title?: string;
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        title: "Inicio",
        element: <HomeView />,
      },
      {
        path: "/products",
        title: "Productos",
        element: <ProductsView />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailView />,
      },
      {
        path: "/admin",
        title: "Administraciones",
        element: <AdminView />,
      },
    ],
  },
];

const router = createBrowserRouter(
  routes.map((r) => ({
    path: r.path,
    element: r.element,
    children: r.children,
  }))
);

export default router;
