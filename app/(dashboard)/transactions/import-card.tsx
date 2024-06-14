import { useState } from "react";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ImportTable } from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

interface Props {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedCollumns, setSelectedCollumns] = useState<SelectedColumnState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    collumnIndex: number,
    value: string | null
  ) => {
    setSelectedCollumns((prev) => {
      const newSelectedCollumns = { ...prev };

      for (const key in newSelectedCollumns) {
        if (newSelectedCollumns[key] === value) {
          newSelectedCollumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedCollumns[`column_${collumnIndex}`] = value;
      return newSelectedCollumns;
    });
  };

  const progress = Object.values(selectedCollumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, i) => {
        const columnIndex = getColumnIndex(`column_${i}`);
        return selectedCollumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, i) => {
            const columnIndex = getColumnIndex(`column_${i}`);
            return selectedCollumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, i) => {
        const header = mappedData.headers[i];
        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: parseInt(item.amount),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat)
    }))

    onSubmit(formattedData)
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
            <Button size="sm" onClick={onCancel} className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedCollumns={selectedCollumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
