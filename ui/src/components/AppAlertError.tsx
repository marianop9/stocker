import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
    message: string;
}

export default function AppAlertError({ message }: Props) {
    if (!message) return null;

    return (
        <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
