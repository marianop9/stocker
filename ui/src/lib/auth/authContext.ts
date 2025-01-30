import { BaseAuthStore } from "pocketbase";
import { useContext, createContext } from "react";

export type AppAuthResult = {
    success: boolean;
    error: string;
};

// export type AppAuthData = {
//     isAuth: boolean;
//     token: string;
//     user: IUser | null;
// };

export type AppAuthContext = {
    userData: BaseAuthStore;
    login(userOrEmail: string, password: string): Promise<AppAuthResult>;
    logout(): void;
    authRefresh(): Promise<boolean>;
};

export const authContext = createContext<AppAuthContext | undefined>(undefined);

const useAppAuth = () => {
    const ctx = useContext(authContext);

    if (!ctx) throw new Error("use auth context inside provider");

    return ctx;
};

export default useAppAuth;
