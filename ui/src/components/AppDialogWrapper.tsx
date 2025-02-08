import { PropsWithChildren } from "react";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "./AppDialog";
import { Button, ButtonSize, ButtonVariant } from "./ui/button";
import ControlledComponent from "@/lib/contracts/ControlledComponent";

// export type ButtonVariants = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
interface AppDialogWrapperProps extends PropsWithChildren {
    dialogTitle: string;
    dialogDescription?: string;
    triggerLabel: string;
    triggerDisabled?: boolean;
    triggerVariant?: ButtonVariant;
    triggerSize?: ButtonSize;
}

export default function AppDialogWrapper({
    dialogTitle,
    dialogDescription,
    triggerLabel,
    triggerDisabled = false,
    triggerVariant,
    triggerSize = "default",
    children,
}: AppDialogWrapperProps) {
    return (
        <AppDialog>
            <AppDialogTrigger asChild>
                <Button variant={triggerVariant} size={triggerSize} disabled={triggerDisabled}>
                    {triggerLabel}
                </Button>
            </AppDialogTrigger>
            <AppDialogContent title={dialogTitle} description={dialogDescription}>
                {children}
            </AppDialogContent>
        </AppDialog>
    );
}

interface AppControlledDialogWrapperProps extends PropsWithChildren, ControlledComponent {
    dialogTitle: string;
    triggerLabel?: string;
    triggerDisabled?: boolean;
    triggerVariant?: ButtonVariant;
}

export function AppControlledDialogWrapper({
    dialogTitle,
    triggerLabel = "",
    triggerDisabled = false,
    triggerVariant,
    open,
    onOpenChange,
    children,
}: AppControlledDialogWrapperProps) {
    return (
        <AppDialog open={open} onOpenChange={onOpenChange}>
            {triggerLabel && (
                <AppDialogTrigger asChild>
                    <Button variant={triggerVariant} disabled={triggerDisabled}>
                        {triggerLabel}
                    </Button>
                </AppDialogTrigger>
            )}
            <AppDialogContent title={dialogTitle}>{children}</AppDialogContent>
        </AppDialog>
    );
}
