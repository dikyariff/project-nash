import {
  RadialBar,
  RadialBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatCurrency } from "@/lib/utils";

import { CategoryTooltip } from "@/components/category-tooltip";

const COLORS = ["#519DE9", "#73C5C5", "#F6D173", "#EF9234", "#B2B0EA"];

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="30%"
        barSize={10}
        innerRadius="90%"
        outerRadius="40%"
        data={data?.map((item, i) => ({
          ...item,
          fill: COLORS[i % COLORS.length]
        }))}
      >
        <RadialBar 
          label={{
            position: "insideStart",
            fill: "#FFF",
            fontSize: "12px"
          }}
          background
          dataKey="value"
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, i: number) => (
                  <li
                    key={`item-${i}`}
                    className="flex items-center space-x-2"
                  >
                    <span 
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {formatCurrency(entry.payload.value * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
