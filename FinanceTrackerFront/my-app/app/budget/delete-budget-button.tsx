"use client";

import { deleteBudget } from "@/app/api/route";
import { DeleteIcon } from "@/template/resource/icons";
import { 
  Button, Popover, PopoverContent, PopoverTrigger 
} from "@nextui-org/react";

export const DeleteBudgetButton = (prop: { budgetId: string , refreshData: () => void}) => {
    return (
        <Popover placement="top">
          <PopoverTrigger>
          <Button className="text-lg text-danger cursor-pointer active:opacity-50" type="button" >            
            <DeleteIcon />
          </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              color="danger"
              onClick={async () => {
                await deleteBudget(prop.budgetId);
                prop.refreshData();
              }}
            >
              Delete
            </Button>
          </PopoverContent>
        </Popover>
    )
}