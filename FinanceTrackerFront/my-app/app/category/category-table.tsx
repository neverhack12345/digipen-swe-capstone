"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

import { title } from "@/components/primitives";
import { PlusIcon, EditIcon } from "@/template/resource/icons";
import { users } from "@/template/resource/data";
import { categoryColumns } from "@/lib/data";

export default function CategoryTable() {
  const [data, setData] = useState([
    {
      catId: 0,
      catName: "string",
    },
  ]);

  const headerColumns = React.useMemo(() => {
    return categoryColumns;
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/category/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);

          return data;
        } else {
          throw new Error("Response data is not an array");
        }
      })
      .catch((error) => {
        throw new Error("Error: ", error);
      });
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    return filteredUsers;
  }, [data]);

  const renderCell = React.useCallback(
    (user: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = user[columnKey];

      if (columnKey === "actions") {
        return (
          <div className="relative flex items-center justify-center	gap-2">
            <Tooltip content="Edit category">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      }

      return cellValue;
    },
    [],
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Category Table</h1>
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Button
              color="primary"
              endContent={<PlusIcon height={undefined} width={undefined} />}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [users.length]);

  return (
    <Table
      isStriped
      aria-label="Example table with custom cells, pagination and sorting"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
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
      <TableBody emptyContent={"No category found"} items={filteredItems}>
        {(item) => (
          <TableRow key={item.catId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
