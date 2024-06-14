import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableHeadSelect } from "./table-head-select";

interface Props {
  headers: string[];
  body: string[][];
  selectedCollumns: Record<string, string | null>;
  onTableHeadSelectChange: (collumnIndex: number, value: string | null) => void;
}

export const ImportTable = ({
  headers,
  body,
  selectedCollumns,
  onTableHeadSelectChange,
}: Props) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, i) => (
              <TableHead key={i}>
                <TableHeadSelect
                  collumnIndex={i}
                  selectedCollumns={selectedCollumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], i) => (
            <TableRow key={i}>
              {row.map((cell, i) => (
                <TableCell key={i}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
