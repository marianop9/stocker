import useAppAuth from "@/lib/auth/authContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
    const { userData, authRefresh } = useAppAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.isValid) {
            console.log("not authenticated, redirecting to login");
            navigate("/login");
        } else {
            authRefresh().then((refreshed) => {
                if (!refreshed) {
                    console.log("auth expired, redirecting to login");
                    navigate("/login");
                }
            });
        }
    }, [userData, authRefresh, navigate]);

    return <Outlet />;
}

export default PrivateRoute;
