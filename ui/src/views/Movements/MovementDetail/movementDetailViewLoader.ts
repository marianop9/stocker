import { movementService } from "@/service/movementService";
import { LoaderFunction } from "react-router-dom";

const movementDetailViewLoader: LoaderFunction = ({ params }) => {
    const movementId = params["id"]!;

    return movementService.get(movementId);
};

export default movementDetailViewLoader;
