"use client"

import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import { monthRange, yearRange } from "@/lib/data";
import { useCallback, useEffect, useState } from "react";
import BudgetTable from "./budget-table";
import { Budget } from "@/types/definitions";
import { fetchBudgets } from "../api/route";
import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartConfig = {
  amount: {
    label: "Amount",
  },
  "Auto & Transport": {
    label: "Auto & Transport",
    // color: "hsl(var(--chart-1))",
  },
  "Bills & Utilities": {
    label: "Bills & Utilities",
    // color: "hsl(var(--chart-2))",
  },
  "Business": {
    label: "Business",
    // color: "hsl(var(--chart-3))",
  },
  "Children": {
    label: "Children",
    // color: "hsl(var(--chart-4))",
  },
  "Education": {
    label: "Education",
    // color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function BudgetPage() {
  const [year, setYear] = useState<string>((new Date().getFullYear()).toString())
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString())
  const [data , setData] = useState<Array<Budget>>([]);
  const [filteredData, setFilteredData] = useState<Array<Budget>>([]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);
  const [chartData, setChartData] = useState([
    { category: "Auto & Transport", amount: 275, fill: "hsl(var(--chart-1))" },
    { category: "Bills & Utilities", amount: 200, fill: "hsl(var(--chart-2))" },
    { category: "Business", amount: 187, fill: "hsl(var(--chart-3))" },
    { category: "Children", amount: 173, fill: "hsl(var(--chart-4))" },
    { category: "Education", amount: 90, fill: "hsl(var(--chart-5))" },
  ])

  const fetchData = useCallback(async () => {
    const budgets = await fetchBudgets();
    setData(budgets);
    setIsCompleteLoaded(true);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    let filteredBudgets = [...data];
    if (year) {
      filteredBudgets = filteredBudgets.filter((budget) =>
        budget.year.toString() == year,
      );
    }
    if (month) {
      filteredBudgets = filteredBudgets.filter((budget) =>
         budget.month.toString() == month,
      );
    }
    filteredBudgets = [...filteredBudgets].sort((a, b) => {
      const first = a["catName"];
      const second = b["catName"];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return cmp;
    });
    let counter = 1;
    const result = filteredBudgets.map((budget) => {
      return {category: budget.catName, amount: budget.amount, fill: `hsl(var(--chart-${counter++}))`}
    })
    setChartData(result)
    
    setFilteredData(filteredBudgets);
  }, [month, year, data]);

  return (
    <div className="relative mx-auto flex-nowrap w-full space-y-2.5 p-4">
      <div className="relative mx-auto flex gap-4">
      <Select 
        items={yearRange} label="Year" aria-label="Year"
        defaultSelectedKeys={[year]}
        value={[year]}
        onChange={(e) => setYear(e.target.value)}
        color='default' variant='bordered' size='md' radius='full'
      >
        {(year) => <SelectItem key={year.key} value={year.key}>{year.label}</SelectItem>}
      </Select>
      <Select 
        items={monthRange} label="Month" aria-label="Month"
        defaultSelectedKeys={[month]}
        value={[month]}
        onChange={(e) => setMonth(e.target.value)}
        color='default' variant='bordered' size='md' radius='full'
      >
      {(month) => <SelectItem key={month.key} value={month.key}>{month.label}</SelectItem>}
      </Select>
      </div>
      <Skeleton isLoaded={isCompleteLoaded} className="rounded-lg">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </Skeleton>
      <Skeleton isLoaded={isCompleteLoaded} className="rounded-lg">
        <BudgetTable filteredData={filteredData} fetchData={fetchData} />
      </Skeleton>
    </div>
  );
}
