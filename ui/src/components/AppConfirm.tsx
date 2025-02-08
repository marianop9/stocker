import { PropsWithChildren } from "react";
import { AppDialogFooter } from "./AppDialog";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/button";
import AppDialogWrapper from "./AppDialogWrapper";
import { DialogClose } from "@radix-ui/react-dialog";

interface AppConfirmProps extends PropsWithChildren {
    title?: string;
    triggerLabel: string;
    triggerDisabled?: boolean;
    triggerVariant?: ButtonVariant;
    triggerSize?: ButtonSize;
    onConfirm: () => void;
}

export default function AppConfirm({
    title,
    triggerLabel,
    triggerDisabled,
    triggerVariant,
    triggerSize,
    onConfirm,
    children,
}: AppConfirmProps) {
    return (
        <AppDialogWrapper
            dialogTitle={title ?? triggerLabel}
            triggerLabel={triggerLabel}
            triggerDisabled={triggerDisabled}
            triggerVariant={triggerVariant}
            triggerSize={triggerSize}
        >
            {children}
            <AppDialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button variant="ghost" size="noPad">
                        Cancelar
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={onConfirm}>Confirmar</Button>
                </DialogClose>
            </AppDialogFooter>
        </AppDialogWrapper>
    );
}
