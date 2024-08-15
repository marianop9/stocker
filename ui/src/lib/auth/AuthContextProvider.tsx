import { PropsWithChildren } from "react";
import { AppAuthData, AppAuthResult, authContext } from "./authContext";
import { authService } from "@/service/authService";
import useLocalStorage from "../hooks/useLocalStorage";

const appAuthKey = "app_auth";

const AppAuthProvider = ({ children }: PropsWithChildren) => {
    const {
        storedValue: authData,
        setValue: setAuthData,
        clearValue: clearAuthData,
    } = useLocalStorage<AppAuthData>(appAuthKey, {
        isAuth: false,
        token: "",
        user: null,
    });

    async function login(
        userOrEmail: string,
        password: string,
    ): Promise<AppAuthResult> {
        const result = await authService.auth(userOrEmail, password);

        if (!result.success) {
            return {
                success: false,
                error: result.error.response.message,
            };
        }

        setAuthData({
            user: result.data.record,
            token: result.data.token,
            isAuth: true,
        });

        return {
            success: true,
            error: "",
        };
    }

    function logout() {
        authService.logout();
        clearAuthData();
    }

    return (
        <authContext.Provider value={{ authData, login, logout }}>
            {children}
        </authContext.Provider>
    );
};

export default AppAuthProvider;
