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
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button"
import { PlusIcon, EditIcon, DeleteIcon } from "@/template/resource/icons";
import { users, categoryColumns } from "@/template/resource/data";

export default function CategoryTable() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{"catId": 1, "catName": "cat"}]);

  const headerColumns = React.useMemo(() => {
    return categoryColumns
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/category/getAll').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      if (Array.isArray(data)) {
        setData(data);
        return data;
        // data.forEach(item => {
        //   console.log(item); // Access individual JSON objects
        // });
      } else {
        throw new Error('Response data is not an array');
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  },[])

  const filteredItems = React.useMemo(() => {
    // let filteredUsers = [...data];
    let filteredUsers = [...data];
    return filteredUsers;
  }, [data]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((user: { [x: string]: any; }, columnKey: string | number) => {
    const cellValue = user[columnKey];
    if (columnKey === "actions" ) {
      return (
        <div className="relative flex items-center justify-center	gap-2">
          <Tooltip content="Edit category">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete category">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    return cellValue;
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: { target: { value: any; }; }) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className={title()}>Category Table</h1>
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon width={undefined} height={undefined} />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {filteredItems.length} categories</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    onRowsPerPageChange,
    users.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [filteredItems.length, page, pages]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
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
      <TableBody emptyContent={"No users found"} items={filteredItems}>
        {(item) => (
          <TableRow key={item.catId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
