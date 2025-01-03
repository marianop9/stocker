import { PropsWithChildren } from "react";
import { AppAuthResult, authContext } from "./authContext";
import { authService } from "@/service/authService";
import { pbClient } from "@/service/pocketbase";
import IUser from "@/models/user";

// const appAuthKey = "app_auth";

const AppAuthProvider = ({ children }: PropsWithChildren) => {
    // const {
    //     storedValue: authData,
    //     setValue: setAuthData,
    //     clearValue: clearAuthData,
    // } = useLocalStorage<AppAuthData>(appAuthKey, {
    //     isAuth: false,
    //     token: "",
    //     user: null,
    // });

    // const userData = pbClient.getInternalClient().authStore.model as IUser | null;

    async function login(userOrEmail: string, password: string): Promise<AppAuthResult> {
        const result = await authService.auth(userOrEmail, password);

        if (!result.success) {
            return {
                success: false,
                error: result.error.response.message,
            };
        }

        // setAuthData({
        //     user: result.data.record,
        //     token: result.data.token,
        //     isAuth: true,
        // });

        return {
            success: true,
            error: "",
        };
    }

    function logout() {
        authService.logout();
        // clearAuthData();
    }

    async function authRefresh() {
        const result = await authService.refresh();

        if (!result.success) {
            /* request may have been auto-cancelled (due to react strict mode running useEffect twice)
            in this case, an auto-cancel does not mean the user is not auth, the next call will execute and
            determine the result.
            */
            // isAbort indicates the request was auto-cancelled
            console.log("refreshed failed, was cancelled:", result.error.isAbort);

            return result.error.isAbort;
        }

        return true;
    }

    return (
        <authContext.Provider
            value={{
                userData: pbClient.getInternalClient().authStore,
                login,
                logout,
                authRefresh,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AppAuthProvider;
