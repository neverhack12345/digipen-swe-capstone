"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useCallback, useMemo } from "react";

import { planColumns } from "@/lib/data";
import { title } from "@/components/primitives";
import { Plan } from "@/types/definitions";

export default function PlanTable({
  filteredData,
  fetchData,
}: {
  filteredData: Array<Plan>;
  fetchData?: () => Promise<void>;
}) {
  const TABLE_NAME = "Plan Table";

  const renderCell = useCallback((item: Plan, columnKey: keyof Plan) => {
    return item[columnKey];
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>{TABLE_NAME}</h1>
      </div>
    );
  }, []);

  return (
    <Table
      isStriped
      aria-label={TABLE_NAME}
      classNames={{
        wrapper: "",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={planColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No plan found"} items={filteredData}>
        {(item: Plan) => (
          <TableRow key={item.year}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as keyof Plan)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
