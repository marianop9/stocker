import { movementService } from "@/service/movementService";
import { ActionFunction } from "react-router-dom";

export const movementDetailViewActions: ActionFunction = async ({ params }) => {
    const movementId = params["id"];

    return await movementService.close(movementId!);
};
