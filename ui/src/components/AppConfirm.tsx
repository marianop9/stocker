import { PropsWithChildren } from "react";
import { AppDialogFooter } from "./AppDialog";
import { Button } from "./ui/button";
import AppDialogWrapper from "./AppDialogWrapper";

interface AppConfirmProps extends PropsWithChildren {
    title?: string;
    triggerLabel: string;
    triggerDisabled?: boolean;
    onConfirm: () => void;
}

export default function AppConfirm({
    title,
    triggerLabel,
    triggerDisabled,
    onConfirm,
    children,
}: AppConfirmProps) {
    return (
        <AppDialogWrapper
            dialogTitle={title ?? "Confirmar"}
            triggerLabel={triggerLabel}
            triggerDisabled={triggerDisabled}
        >
            {children}
            <AppDialogFooter>
                <Button variant="ghost" onClick={onConfirm}>
                    Cancelar
                </Button>
                <Button>Confirmar</Button>
            </AppDialogFooter>
        </AppDialogWrapper>
    );
}
