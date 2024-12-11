import { PropsWithChildren } from "react";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "./AppDialog";
import { Button } from "./ui/button";
import ControlledComponent from "@/lib/contracts/ControlledComponent";

interface AppControlledDialogWrapperProps extends PropsWithChildren, ControlledComponent {
    dialogTitle: string;
    triggerLabel?: string;
    triggerDisabled?: boolean;
}

function AppControlledDialogWrapper({
    dialogTitle,
    triggerLabel = "",
    triggerDisabled = false,
    open,
    onOpenChange,
    children,
}: AppControlledDialogWrapperProps) {
    return (
        <AppDialog open={open} onOpenChange={onOpenChange}>
            {triggerLabel && (
                <AppDialogTrigger asChild>
                    <Button disabled={triggerDisabled}>{triggerLabel}</Button>
                </AppDialogTrigger>
            )}
            <AppDialogContent title={dialogTitle}>{children}</AppDialogContent>
        </AppDialog>
    );
}

export default AppControlledDialogWrapper;
