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
import NextLink from "next/link";

import { DeleteBudgetButton } from "./delete-budget-button";
import { EditBudgetButton } from "./edit-budget-button";

import { budgetColumns } from "@/lib/data";
import { PlusIcon } from "@/template/resource/icons";
import { title } from "@/components/primitives";
import { Budget } from "@/types/definitions";

export default function BudgetTable({
  filteredData,
  fetchData,
}: {
  filteredData: Array<Budget>;
  fetchData: () => Promise<void>;
}) {
  const TABLE_NAME = "Budget Table";

  const renderCell = useCallback(
    (item: Budget, columnKey: keyof Budget | "actions") => {
      if (columnKey === "actions") {
        return (
          <div className="relative flex items-center justify-center	gap-2">
            <EditBudgetButton budget={item} />
            <DeleteBudgetButton
              budgetId={item["budgetId"]}
              refreshData={fetchData}
            />
          </div>
        );
      }

      return item[columnKey];
    },
    [],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>{TABLE_NAME}</h1>
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <NextLink href="/budget/add" type="button">
              <PlusIcon height={undefined} width={undefined} />
            </NextLink>
          </div>
        </div>
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
      <TableHeader columns={budgetColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No budget found"} items={filteredData}>
        {(item: Budget) => (
          <TableRow key={item.budgetId}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof Budget | "actions")}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
