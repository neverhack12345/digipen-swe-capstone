"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartDataType = {
  category: string;
  amount: number;
  fill: string;
};

export default function BudgetChart({
  chartData,
  chartConfig,
}: {
  chartData: Array<ChartDataType>;
  chartConfig: ChartConfig;
}) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          hide
          axisLine={false}
          dataKey="category"
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <XAxis hide dataKey="amount" type="number" />
        <ChartTooltip
          content={<ChartTooltipContent indicator="line" />}
          cursor={false}
        />
        <Bar
          dataKey="amount"
          fill="var(--color-desktop)"
          layout="vertical"
          radius={4}
        >
          <LabelList
            className="fill-[--color-label]"
            dataKey="category"
            fontSize={12}
            offset={8}
            position="insideLeft"
          />
          <LabelList
            className="fill-foreground"
            dataKey="amount"
            fontSize={12}
            offset={8}
            position="insideRight"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
