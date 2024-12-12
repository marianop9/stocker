import { PropsWithChildren } from "react";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "./AppDialog";
import { Button } from "./ui/button";
import ControlledComponent from "@/lib/contracts/ControlledComponent";

export type ButtonVariants = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
interface AppDialogWrapperProps extends PropsWithChildren {
    dialogTitle: string;
    dialogDescription?: string;
    triggerLabel: string;
    triggerDisabled?: boolean;
    triggerVariant?: ButtonVariants;
}

export default function AppDialogWrapper({
    dialogTitle,
    dialogDescription,
    triggerLabel,
    triggerDisabled = false,
    triggerVariant,
    children,
}: AppDialogWrapperProps) {
    return (
        <AppDialog>
            <AppDialogTrigger asChild>
                <Button variant={triggerVariant} disabled={triggerDisabled}>
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
    triggerVariant?: ButtonVariants;
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
