import { movementService } from "@/service/movementService";
import { CustomEndpointResponse } from "@/service/pocketbase";
import { ServiceResponse } from "@/service/serviceResponse";
import { ActionFunction, redirect } from "react-router-dom";

export const movementDetailViewActions = async function ({ params, request }) {
    const movementId = params["id"]!;

    if (request.method === "POST") {
        const resp = await movementService.close(movementId);
        return newCustomEndpointResponse(resp);
    }

    if (request.method === "DELETE") {
        const resp = await movementService.delete(movementId);
        if (resp.success) {
            return redirect("/movements");
        }

        return newCustomEndpointResponse(resp);
    }

    return null;
} satisfies ActionFunction;

function newCustomEndpointResponse(serviceResponse: ServiceResponse): CustomEndpointResponse {
    const success = serviceResponse.success;

    return {
        success,
        message: success ? "" : serviceResponse.error.message,
    };
}
