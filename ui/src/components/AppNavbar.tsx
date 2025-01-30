import useAppAuth from "@/lib/auth/authContext";
import { NavLink, useNavigate } from "react-router-dom";
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
        label: "Movimientos",
        url: "/movements",
    },
    {
        label: "Administración",
        url: "/admin",
    },
];

function AppNavBar() {
    const { logout, userData } = useAppAuth();

    const navigate = useNavigate();

    function onLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="flex justify-between p-2">
            <div className="flex gap-x-4">
                {items.map((item) => (
                    <NavLink
                        v-for="item in items"
                        key={item.url}
                        to={item.url}
                        className={({ isActive }) =>
                            [
                                // "hover:bg-accent/20",
                                "rounded p-2",
                                isActive ? "bg-accent text-foreground" : "",
                                "text-muted-foreground",
                                "hover:text-foreground",
                            ].join(" ")
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
            <div className="flex space-x-2 items-center">
                <span>{userData.model?.username}</span>
                <Button variant="secondary" onClick={onLogout}>
                    Cerrar sesión
                </Button>
            </div>
        </nav>
    );
}

export default AppNavBar;
