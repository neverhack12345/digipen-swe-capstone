"use client";

import NextLink from "next/link"
import { EditIcon } from "@/template/resource/icons";
export const EditBudgetButton = (prop: { budget: any}) => {
    // const url = `/budget/edit?budgetId=${prop.budget.budgetId}&categoryId=${prop.budget.catId}`+
    // `&year=${prop.budget.year}&month=${prop.budget.month}&amount=${prop.budget.amount}`;
    const url = `/budget/edit?budgetId=${prop.budget.budgetId}`;
    return (
        <NextLink className="text-lg text-default-400 cursor-pointer active:opacity-50" type="button" href={url}>
            <EditIcon />
        </NextLink>
    )
}