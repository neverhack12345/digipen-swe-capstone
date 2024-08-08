"use client"

import { title } from "@/components/primitives";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/table";
import { PlusIcon } from "@/template/resource/icons";
import { users, budgetColumns } from "@/template/resource/data";
import NextLink from "next/link"
import { DeleteBudgetButton } from "./delete-budget-button";
import { EditBudgetButton } from "./edit-budget-button";
import { Budget } from "@/types/definitions";

export default function BudgetTable() {
  const [data , setData] = useState<Array<Budget>>();
  const fetchData = useCallback(() => {
    fetch('http://localhost:8080/api/budget/getAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
          return data;
        } else {
          throw new Error('Response data is not an array');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    if (data !== undefined) {
      return [...data];
    } else {
      return [];
    }
  }, [data]);

  const renderCell = useCallback((user: Budget, columnKey: keyof Budget | 'actions' ) => {
    if (columnKey === "actions" ) {
      return (
        <div className="relative flex items-center justify-center	gap-2">
          <EditBudgetButton budget={user} />
          <DeleteBudgetButton budgetId={user["budgetId"]} refreshData={fetchData} />
        </div>
      );
    }
    return user[columnKey];
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Budget Table</h1>
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
          <NextLink type="button" href="/budget/add" >
            <PlusIcon width={undefined} height={undefined} />
          </NextLink>
          </div>
        </div>
      </div>
    );
  }, [
    users.length,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      isStriped
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
      <TableBody emptyContent={"No budget found"} items={filteredItems}>
        {(item) => (
          <TableRow key={item.budgetId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Budget | 'actions')}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
