import { RecordAuthResponse } from "pocketbase"
import { pbClient } from "./pocketbase"
import IUser from "@/models/user"
import { executeService, ServiceResponse } from "./serviceResponse"

interface IAuthService {
    auth(userOrEmail: string, password: string): Promise<ServiceResponse<RecordAuthResponse<IUser>>>
    logout(): void
}

export const authService: IAuthService = {
    async auth(userOrEmail, password) {
        return await executeService(pbClient.users.authWithPassword(userOrEmail, password))
    },
    logout() {
        pbClient.logout()
    }
}