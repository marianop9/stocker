import { AlertCircle, CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HtmlHTMLAttributes, PropsWithChildren, forwardRef } from "react";

interface Props extends PropsWithChildren {
    variant: "error" | "success" | "default";
    title: string;
}

const AppAlert = forwardRef<HTMLDivElement, Props & HtmlHTMLAttributes<HTMLDivElement>>(
    ({ className, variant, title, children }, ref) => {
        const isError = variant === "error";
        const isSuccess = variant === "success";
        return (
            <>
                <Alert
                    className={`${className} ${isSuccess ? "border-green-500 bg-green-200" : ""}`}
                    variant={isError ? "destructive" : "default"}
                    ref={ref}
                >
                    {isError ? (
                        <AlertCircle className="h-4 w-4" />
                    ) : (
                        <CircleCheck className="h-4 w-4" />
                    )}
                    <AlertTitle>{!!title ? title : isError ? "Error" : ""}</AlertTitle>
                    <AlertDescription>{children}</AlertDescription>
                </Alert>
            </>
        );
    },
);

export default AppAlert;
