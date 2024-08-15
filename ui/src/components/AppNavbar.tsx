import useAppAuth from "@/lib/auth/authContext";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const items = [
    {
        label: "Inicio",
        url: "/",
    },
    {
        label: "Productos",
        url: "/products",
    },
    {
        label: "Administración",
        url: "/admin",
    },
];

function AppNavBar() {
    const { logout } = useAppAuth();

    return (
        <nav className="flex justify-between p-2 bg-slate-700">
            <div className="flex gap-x-4 text-white">
                {items.map((item) => (
                    <NavLink
                        v-for="item in items"
                        key={item.url}
                        to={item.url}
                        className={({ isActive }) =>
                            [
                                "hover:bg-slate-500",
                                "rounded p-2",
                                isActive ? "bg-slate-500" : "",
                            ].join(" ")
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
            <Button variant='secondary' onClick={logout}>Cerrar sesión</Button>
        </nav>
    );
}

export default AppNavBar;
