"use client"

import { title } from "@/components/primitives";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/table";
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from "@nextui-org/button"
import { PlusIcon, EditIcon, DeleteIcon } from "@/template/resource/icons";
import { users, cashFlowColumns } from "@/template/resource/data";

export default function CashFlowTable() {
  const [data, setData] = useState([
    {
      "flowId": 0,
      "sourceName": "string",
      "date": "2024-08-08",
      "amount": 0,
      "remark": "string",
      "subId": 0,
      "subName": "string",
      "userId": 0
    }
  ]);

  const headerColumns = React.useMemo(() => {
    return cashFlowColumns
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/cashflow/getAll').then(response => {
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
  },[])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];
    return filteredUsers;
  }, [data]);

  const renderCell = React.useCallback((user: { [x: string]: any; }, columnKey: string | number) => {
    const cellValue = user[columnKey];
    if (columnKey === "actions" ) {
      return (
        <div className="relative flex items-center justify-center	gap-2">
          <Tooltip content="Edit cash flow">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete cash flow">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    return cellValue;
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Cash Flow Table</h1>
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon width={undefined} height={undefined} />}>
              Add New
            </Button>
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
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No cash flow found"} items={filteredItems}>
        {(item) => (
          <TableRow key={item.flowId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
