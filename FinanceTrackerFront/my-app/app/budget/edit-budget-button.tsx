"use client";

import NextLink from "next/link";

import { EditIcon } from "@/template/resource/icons";
export const EditBudgetButton = (prop: { budget: any }) => {
  const url = `/budget/edit?budgetId=${prop.budget.budgetId}`;

  return (
    <NextLink
      className="text-lg text-default-400 cursor-pointer active:opacity-50"
      href={url}
      type="button"
    >
      <EditIcon />
    </NextLink>
  );
};
