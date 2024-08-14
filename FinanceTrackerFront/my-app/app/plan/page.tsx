"use client";
import { useState } from "react";
import { Plan } from "@/types/definitions";
import PlanTable from "./plan-table";
import PlanForm from "./plan-form";
import { Skeleton } from "@nextui-org/react";

export default function PlanPage() {
  const [data, setData] = useState<Array<Plan>>([]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);

  return (
    <div className="relative mx-auto flex-nowrap gap-x-10 w-full space-y-2.5 p-4">
      <PlanForm setData={setData} setIsCompleteLoaded={setIsCompleteLoaded}/>
      <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
        <PlanTable filteredData={data} />
      </Skeleton>
    </div>

  );
}
