import { PropsWithChildren } from "react";
import { Label } from "./ui/label";

interface Props extends PropsWithChildren {
    label: string;
    name: string;
    helperText?: string;
    errors?: string | string[];
    disabled?: boolean;
    readonly?: boolean;
    className?: string;
}

function AppFormEntry({
    label,
    name,
    helperText,
    errors,
    children,
    disabled = false,
    readonly = false,
    className,
}: Props) {
    const errorMsg = Array.isArray(errors) ? errors.join(". ") : errors;

    return (
        <div className={`flex flex-col gap-2 mb-2 justify-between ${className ?? ""}`}>
            <Label
                htmlFor={name}
                className={`${disabled || readonly ? "text-muted-foreground" : ""}`}
            >
                {label}
            </Label>
            {children}
            <div>
                <p className="text-xs">{helperText}</p>
                <AppFormValidationMessage message={errorMsg} />
            </div>
        </div>
    );
}

export default AppFormEntry;

export function AppFormValidationMessage({ message }: { message?: string }) {
    return <p className="text-xs text-red-600">{message}</p>;
}
