import useAppAuth from "@/lib/auth/authContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
    const { authData } = useAppAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!authData.isAuth) {
            console.log("not authenticated, redirecting to login");
            navigate("/login");
        }
    }, [authData, navigate]);

    return <Outlet />;
}

export default PrivateRoute;
