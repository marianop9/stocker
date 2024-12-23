import { AlertCircle, CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
    variant: "error" | "success";
    title?: string;
    message: string;
}
function AppAlert({ variant, title, message }: Props) {
    const isError = variant === "error";

    // if (!message) return null;

    return (
        <>
            {message !== "" && (
                <Alert variant={isError ? "destructive" : "default"} className="mb-4">
                    {isError ? (
                        <AlertCircle className="h-4 w-4" />
                    ) : (
                        <CircleCheck className="h-4 w-4" />
                    )}
                    <AlertTitle>{!!title ? title : isError ? "Error" : ""}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}
        </>
    );
}

export default AppAlert;
