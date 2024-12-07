import { PropsWithChildren } from "react";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "./AppDialog";
import { Button } from "./ui/button";

interface AppDialogWrapperProps extends PropsWithChildren {
    triggerLabel: string;
    triggerDisabled?: boolean;
    dialogTitle: string;
}

function AppDialogWrapper({
    triggerLabel,
    triggerDisabled = false,
    dialogTitle,
    children,
}: AppDialogWrapperProps) {
    return (
        <AppDialog>
            <AppDialogTrigger asChild>
                <Button disabled={triggerDisabled}>{triggerLabel}</Button>
            </AppDialogTrigger>
            <AppDialogContent title={dialogTitle}>{children}</AppDialogContent>
        </AppDialog>
    );
}

export default AppDialogWrapper;
