import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import useDebounce from "@/lib/hooks/useDebounce";
import { PropsWithChildren, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props extends PropsWithChildren {
    label?: string;
    onSearchTermChange(searchTerm: string): void;
}

function AppSearchInput({ label, onSearchTermChange, children }: Props) {
    const [open, setOpen] = useState(false);

    const [inputValue, setInputValue] = useState("");

    useDebounce(
        () => {
            onSearchTermChange(inputValue);
        },
        [onSearchTermChange, inputValue],
        1000,
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor>
                <Label>{label}</Label>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => {
                        setOpen(true);
                    }}
                />
            </PopoverAnchor>
            <PopoverContent
                style={{
                    width: "var(--radix-popover-trigger-width)",
                    maxHeight: "var(--radix-popover-content-available-height)",
                    overflow: "scroll",
                }}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onFocusOutside={(e) => e.preventDefault()}
                align="start"
            >
                {children}
            </PopoverContent>
        </Popover>
    );
}

export default AppSearchInput;
