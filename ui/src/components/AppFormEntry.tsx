import { PropsWithChildren } from "react";
import { Label } from "./ui/label";

interface Props extends PropsWithChildren {
  label: string;
  name: string;
  helperText?: string;
  errors?: string | string[];
}

function AppFormEntry({ label, name, helperText, errors, children }: Props) {
  const errorMsg = Array.isArray(errors) ? errors.join(". ") : errors;

  return (
    <div className="flex flex-col gap-2 mb-2">
      <Label htmlFor={name}>{label}</Label>
      {children}
      <div>
        <p className="text-xs">{helperText}</p>
        <p className="text-xs text-red-600">{errorMsg}</p>
      </div>
    </div>
  );
}

export default AppFormEntry;
