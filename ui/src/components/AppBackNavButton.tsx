import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppBackNavButton() {
    const navigate = useNavigate();

    return (
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
            <ChevronLeft size="1rem" /> Volver
        </Button>
    );
}
