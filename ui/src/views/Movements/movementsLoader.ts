import { movementService } from "@/service/movementService";
import { LoaderFunctionArgs } from "react-router-dom";

export const movementsLoader = async (_args: LoaderFunctionArgs) => {
    const movements = await movementService.list();

    return {
        movements,
    };
};
