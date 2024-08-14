"use client"

import { CashFlow } from "@/types/definitions";
import CashFlowTable from "./cashflow-table";
import { fetchCashFlowsById } from "@/lib/backend";
import { useState, useCallback, useEffect } from "react";
import { Skeleton } from "@nextui-org/react";

export default function CashFlowPage() {
  const [data, setData] = useState<Array<CashFlow>>([]);
  const [filteredData, setFilteredData] = useState<Array<CashFlow>>([]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const cashFlowResult = await fetchCashFlowsById();
    setData(cashFlowResult)
    setIsCompleteLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filteredCashFlow = [...data];

    filteredCashFlow = [...filteredCashFlow].sort((a, b) => {
      const first = a["date"];
      const second = b["date"];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return -cmp;
    });
    setFilteredData(filteredCashFlow);
  }, [data]);

  return (
    <div className="relative mx-auto flex w-full space-y-2.5 p-4">
      <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
        <CashFlowTable filteredData={filteredData}/>
      </Skeleton>
    </div>
  );
}
