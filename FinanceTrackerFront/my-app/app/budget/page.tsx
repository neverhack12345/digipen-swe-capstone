"use client";

import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

import BudgetTable from "./budget-table";
import BudgetChart from "./budget-chart";

import { monthRange, yearRange } from "@/lib/data";
import { Budget } from "@/types/definitions";
import { fetchBudgets } from "@/lib/backend";
import { ChartConfig } from "@/components/ui/chart";

type ChartDataType = {
  category: string;
  amount: number;
  fill: string;
};

export default function BudgetPage() {
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [data, setData] = useState<Array<Budget>>([]);
  const [filteredData, setFilteredData] = useState<Array<Budget>>([]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);
  const [chartData, setChartData] = useState<Array<ChartDataType>>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

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
      filteredBudgets = filteredBudgets.filter(
        (budget) => budget.year.toString() == year,
      );
    }
    if (month) {
      filteredBudgets = filteredBudgets.filter(
        (budget) => budget.month.toString() == month,
      );
    }
    filteredBudgets = [...filteredBudgets].sort((a, b) => {
      const first = a["catName"];
      const second = b["catName"];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return cmp;
    });
    let counter = 1;
    const dataResult = filteredBudgets.map((budget) => {
      return {
        category: budget.catName,
        amount: budget.amount,
        fill: `hsl(var(--chart-${counter++}))`,
      };
    });
    const configResult: ChartConfig = filteredBudgets.reduce((acc, budget) => {
      const label = budget.catName;

      acc[label] = { label: label };

      return acc;
    }, {} as ChartConfig);

    configResult["amount"] = { label: "Amount" };
    configResult satisfies ChartConfig;

    setChartData(dataResult);
    setChartConfig(configResult);
    setFilteredData(filteredBudgets);
  }, [month, year, data]);

  return (
    <div className="relative mx-auto flex-nowrap w-full space-y-2.5 p-4">
      <div className="relative mx-auto flex gap-4">
        <Select
          disallowEmptySelection
          aria-label="Year"
          color="default"
          defaultSelectedKeys={[year]}
          items={yearRange}
          label="Year"
          radius="full"
          size="md"
          value={[year]}
          variant="bordered"
          onChange={(e) => setYear(e.target.value)}
        >
          {(year) => (
            <SelectItem key={year.key} value={year.key}>
              {year.label}
            </SelectItem>
          )}
        </Select>
        <Select
          disallowEmptySelection
          aria-label="Month"
          color="default"
          defaultSelectedKeys={[month]}
          items={monthRange}
          label="Month"
          radius="full"
          size="md"
          value={[month]}
          variant="bordered"
          onChange={(e) => setMonth(e.target.value)}
        >
          {(month) => (
            <SelectItem key={month.key} value={month.key}>
              {month.label}
            </SelectItem>
          )}
        </Select>
      </div>
      <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
        <BudgetChart chartConfig={chartConfig} chartData={chartData} />
      </Skeleton>
      <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
        <BudgetTable fetchData={fetchData} filteredData={filteredData} />
      </Skeleton>
    </div>
  );
}
