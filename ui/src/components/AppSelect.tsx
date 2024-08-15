import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
}

function AppSelect({
    name,
    options,
    placeholder,
    disabled = false,
    defaultValue,
    value,
    onValueChange
}: Props) {
    return (
        <Select
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            onValueChange={onValueChange}
        >
            <SelectTrigger>
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
}

export default AppSelect;
