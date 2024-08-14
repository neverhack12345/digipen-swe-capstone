"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { useCallback, useMemo } from "react";
import NextLink from "next/link";

import { categoryColumns } from "@/lib/data";
import { PlusIcon, EditIcon } from "@/template/resource/icons";
import { title } from "@/components/primitives";
import { Category } from "@/types/definitions";

export default function CategoryTable({
  filteredData,
  fetchData,
}: {
  filteredData: Array<Category>;
  fetchData?: () => Promise<void>;
}) {
  const TABLE_NAME = "Category Table";

  const renderCell = useCallback(
    (item: Category, columnKey: keyof Category | "actions") => {
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
            <NextLink href="#" type="button">
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
      <TableHeader columns={categoryColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No category found"} items={filteredData}>
        {(item: Category) => (
          <TableRow key={item.catId}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof Category | "actions")}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
