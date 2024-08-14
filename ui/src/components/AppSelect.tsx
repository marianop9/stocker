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
  placeholder?: string;
  defaultValue?: string;
  options: ISelectOption[];
  disabled?: boolean;
}

function AppSelect({
  name,
  placeholder,
  defaultValue,
  options,
  disabled = false,
}: Props) {
  return (
    <Select name={name} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default AppSelect;
