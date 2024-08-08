"use client";

import { Button } from "@nextui-org/button";
import { deleteBudget } from "@/app/api/route";
import { DeleteIcon } from "@/template/resource/icons";
export const DeleteBudgetButton = (prop: { budgetId: any , refreshData: () => void}) => {
    return (
        <Button className="text-lg text-danger cursor-pointer active:opacity-50" type="button" onClick={async () => {
            await deleteBudget(prop.budgetId);
            prop.refreshData();
        }}><DeleteIcon /></Button>
    )
}