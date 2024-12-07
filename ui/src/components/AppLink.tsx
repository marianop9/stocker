import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function AppLink({ label, route }: { label: string; route: string }) {
    return (
        <Button variant="link" asChild className="p-0">
            <Link to={route}>{label}</Link>
        </Button>
    );
}

export default AppLink;
