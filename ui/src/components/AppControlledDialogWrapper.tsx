import { PropsWithChildren } from "react";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "./AppDialog";
import { Button } from "./ui/button";

interface AppControlledDialogWrapperProps extends PropsWithChildren {
    dialogTitle: string;
    triggerLabel?: string;
    triggerDisabled?: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
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
