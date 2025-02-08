import { Label } from "./ui/label";
import { PropsWithChildren } from "react";

interface AppLabelProps extends PropsWithChildren {
    label: string;
    className?: string;
}

export default function AppLabel({ label, className, children }: AppLabelProps) {
    return (
        <div className={`flex flex-col gap-2 mb-2 justify-between ${className ?? ""}`}>
            <Label className="text-muted-foreground">{label}</Label>
            {children}
        </div>
    );
}
