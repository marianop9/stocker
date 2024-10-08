import { movementService } from "@/service/movementService";
import { LoaderFunction } from "react-router-dom";

export const stockEntryViewLoader = function ({ params }) {
    const id = params["id"] ?? "";

    return movementService.get(id);
} satisfies LoaderFunction;
