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

import { subCategoryColumns } from "@/lib/data";
import { PlusIcon, EditIcon } from "@/template/resource/icons";
import { title } from "@/components/primitives";
import { SubCategory } from "@/types/definitions";

export default function CategoryTable({
  filteredData,
  fetchData,
}: {
  filteredData: Array<SubCategory>;
  fetchData?: () => Promise<void>;
}) {
  const TABLE_NAME = "Sub-Category Table";

  const renderCell = useCallback(
    (item: SubCategory, columnKey: keyof SubCategory | "actions") => {
      if (columnKey === "actions") {
        return (
          <div className="relative flex items-center justify-center	gap-2">
            <Tooltip content="Edit sub-category">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      }
      if (columnKey === "subName") {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{item[columnKey]}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {item.catName}
            </p>
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
      <TableHeader columns={subCategoryColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No sub-category found"} items={filteredData}>
        {(item: SubCategory) => (
          <TableRow key={item.subId}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof SubCategory | "actions")}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
