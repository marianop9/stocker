import IUser from "@/models/user";
import { useContext, createContext } from "react";

export type AppAuthResult = {
    success: boolean;
    error: string;
};

export type AppAuthData = {
    isAuth: boolean;
    token: string;
    user: IUser | null;
};

export type AppAuthContext = {
    authData: AppAuthData;
    logout(): void;
    login(userOrEmail: string, password: string): Promise<AppAuthResult>;
};

export const authContext = createContext<AppAuthContext | undefined>(undefined);

const useAppAuth = () => {
    const ctx = useContext(authContext);

    if (!ctx) throw new Error("use auth context inside provider");

    return ctx;
};

export default useAppAuth;
