import { stockEntryService } from "@/service/movementService";
import { LoaderFunction } from "react-router-dom";

export const stockEntryViewLoader = function ({ params }) {
    const id = params["id"] ?? "";

    return stockEntryService.get(id);
} satisfies LoaderFunction;
