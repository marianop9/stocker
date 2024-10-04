import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FocusEventHandler, forwardRef } from "react";

type ISelectOption = {
    label: string;
    value: string;
};

interface Props {
    name: string;
    options: ISelectOption[];
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: string;
    value?: string;
    onValueChange?(v: string): void;
    onBlur?: FocusEventHandler;
}

// function AppSelect({
//     name,
//     options,
//     placeholder,
//     disabled = false,
//     defaultValue,
//     value,
//     onChange,
//     onBlur,
// }: Props) {
//     return (
//         <Select
//             name={name}
//             defaultValue={defaultValue}
//             disabled={disabled}
//             value={value}
//             onValueChange={onChange}
//         >
//             <SelectTrigger onBlur={onBlur}>
//                 <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//                 {options.map((opt) => (
//                     <SelectItem value={opt.value} key={opt.value}>
//                         {opt.label}
//                     </SelectItem>
//                 ))}
//             </SelectContent>
//         </Select>
//     );
// }

const AppSelect = forwardRef<HTMLButtonElement, Props>(
    (
        {
            name,
            options,
            placeholder,
            disabled = false,
            defaultValue,
            value,
            onValueChange,
            onBlur,
        },
        forwardedRef,
    ) => {
        return (
            <Select
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                value={value}
                onValueChange={onValueChange}
            >
                <SelectTrigger onBlur={onBlur} ref={forwardedRef}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem value={opt.value} key={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    },
);

export default AppSelect;
