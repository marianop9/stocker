import { NavLink } from "react-router-dom";

function AppNavBar() {
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

  return (
    <nav className="flex justify-between p-2 bg-slate-700 text-white">
      <div className="flex gap-x-4">
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
    </nav>
  );
}

export default AppNavBar;
