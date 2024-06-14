import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  collumnIndex: number;
  selectedCollumns: Record<string, string | null>;
  onChange: (collumnIndex: number, value: string | null) => void;
}

const options = ["amount", "payee", "date"];

export const TableHeadSelect = ({
  collumnIndex,
  selectedCollumns,
  onChange,
}: Props) => {
  const currentSelect = selectedCollumns[`column_${collumnIndex}`];

  return (
    <Select
      value={currentSelect || ""}
      onValueChange={(value) => onChange(collumnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelect && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, i) => {
          const disabled =
            Object.values(selectedCollumns).includes(option) &&
            selectedCollumns[`column_${collumnIndex}`] !== option;
          return (
            <SelectItem
              key={i}
              value={option}
              disabled={disabled}
              className="capitalize"
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
