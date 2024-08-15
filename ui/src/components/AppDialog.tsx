import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

export const AppDialog = Dialog;
export const AppDialogTrigger = DialogTrigger;

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
        {children}
      </DialogHeader>
    </DialogContent>
  );
}

/** API:
 * <AppDialog>
 *  <AppDialogTrigger></AppDialogTrigger>
 *  <AppDialogContent>
 *    <DialogFooter> (optional)
 *    </DialogFooter>
 *  </AppDialogContent>
 * </AppDialog>
 */
