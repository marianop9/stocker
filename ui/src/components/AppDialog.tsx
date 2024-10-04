import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

export const AppDialog = (props: DialogProps) => {
    return <Dialog {...props}></Dialog>;
};

export const AppDialogTrigger = DialogTrigger;
export const AppDialogFooter = DialogFooter;

interface Props extends PropsWithChildren {
    title: string;
    description?: string;
}
export function AppDialogContent({ title, description, children }: Props) {
    return (
        <DialogContent>
            <DialogHeader>
                <div className="mb-4">
                    <DialogTitle className="mb-2">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </div>
            </DialogHeader>
            <div className="overflow-auto p-1" style={{ maxHeight: "80vh" }}>
                {children}
            </div>
        </DialogContent>
    );
}

/** API:
 * <AppDialog>
 *  <AppDialogTrigger></AppDialogTrigger>
 *  <AppDialogContent>
 *    <AppDialogFooter> (optional)
 *    </AppDialogFooter>
 *  </AppDialogContent>
 * </AppDialog>
 */
