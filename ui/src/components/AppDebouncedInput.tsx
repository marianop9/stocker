/* Copied from TanStack Table example:
 * https://stackblitz.com/github/tanstack/table/tree/main/examples/react/filters?embed=1&theme=dark&preset=node&file=src/main.tsx
 */

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function AppDebouncedInput({
    value: initialValue,
    onChange,
    debounceTimeout = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounceTimeout?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(() => initialValue);

    // useEffect(() => {
    //     setValue(initialValue);
    // }, [initialValue]);

    // no anduvo :/ ver por que
    // useDebounce(() => onChange(value), [value], debounceTimeout);
    useEffect(() => {
        if (value === "") {
            onChange(value);
            return;
        }

        const timeout = setTimeout(() => {
            onChange(value);
        }, debounceTimeout);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="relative">
            <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <Button size="icon" variant="ghost" onClick={() => setValue("")}>
                    <X size="1rem" />
                </Button>
            </div>
        </div>
    );
}
