import { PropsWithChildren } from "react";
import { AppDialogFooter } from "./AppDialog";
import { Button } from "./ui/button";
import AppDialogWrapper, { ButtonVariants } from "./AppDialogWrapper";
import { DialogClose } from "@radix-ui/react-dialog";

interface AppConfirmProps extends PropsWithChildren {
    title?: string;
    triggerLabel: string;
    triggerDisabled?: boolean;
    triggerVariant?: ButtonVariants;
    onConfirm: () => void;
}

export default function AppConfirm({
    title,
    triggerLabel,
    triggerDisabled,
    triggerVariant,
    onConfirm,
    children,
}: AppConfirmProps) {
    return (
        <AppDialogWrapper
            dialogTitle={title ?? "Confirmar"}
            triggerLabel={triggerLabel}
            triggerDisabled={triggerDisabled}
            triggerVariant={triggerVariant}
        >
            {children}
            <AppDialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={onConfirm}>Confirmar</Button>
                </DialogClose>
            </AppDialogFooter>
        </AppDialogWrapper>
    );
}
