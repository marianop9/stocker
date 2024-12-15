import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
    title: string;
    message: string;
}

export default function AppAlertSuccess({ title, message }: Props) {
    if (!message) return null;

    return (
        <Alert variant="default" className="mb-4">
            <CircleCheck className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
