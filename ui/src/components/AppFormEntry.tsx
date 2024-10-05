import { PropsWithChildren } from "react";
import { Label } from "./ui/label";

interface Props extends PropsWithChildren {
    label: string;
    name: string;
    helperText?: string;
    errors?: string | string[];
    disabled?: boolean;
    className?: string;
}

function AppFormEntry({
    label,
    name,
    helperText,
    errors,
    children,
    disabled = false,
    className,
}: Props) {
    const errorMsg = Array.isArray(errors) ? errors.join(". ") : errors;

    return (
        <div
            className={`flex flex-col gap-2 mb-2 justify-between ${disabled ? "text-muted-foreground" : ""} ${className}`}
        >
            <Label htmlFor={name}>{label}</Label>
            {children}
            <div>
                <p className="text-xs">{helperText}</p>
                <p className="text-xs text-red-600">{errorMsg}</p>
            </div>
        </div>
    );
}

export default AppFormEntry;
