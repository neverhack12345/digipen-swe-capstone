"use client";

import { title } from "@/components/primitives";
import { Button, Card, CardBody, Input, Divider, Select, SelectItem, Spacer, Skeleton } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { fetchCategory, addBudget, getUser } from "@/app/api/route";
import { Category } from '@/types/definitions'; 
import { monthRange, yearRange } from '@/lib/data';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const AddBudgetSchema = z.object({
  userId: z.coerce.number().int().min(1, "User id cannot be less than 1"),
  categoryId: z.coerce.number().int().min(1, "Category id cannot be less than 1"),
  year: z.coerce.number().int().min(1800, "Year cannot be before 1800"),
  month: z.coerce.number().int().min(1, "Month cannot be less than 1").max(12, "Month cannot be more than 12"),
  amount: z.coerce.number()
});  

export default function AddBudgetForm() {
  const TITLE = "Add Budget";
  const SUBMIT_BUTTON_TEXT = "Add Budget";
  const [category, setCategory] = useState<Array<Category>>([{"catId": -1, "catName": "Loading..."}]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);
  const getData = useCallback(async () => {
      const categories = await fetchCategory();
      const currentUser = await getUser();
      setCategory(categories)
      if (currentUser !== undefined) {
        setValue("userId", currentUser);
      }
      setIsCompleteLoaded(true);
  }, []);
  useEffect(() => {
    getData();
  }, [])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddBudgetSchema),
    defaultValues: {
      "userId": "",
      "categoryId": "",
      "year": (new Date().getFullYear()),
      "month": (new Date().getMonth() + 1),
      "amount": "" 
    },
  })
  const onSubmit = (data: any) => { addBudget(data); }

  return (
    <Card className="border-solid border-indigo-500 bg-background/60 dark:bg-default-100/50 w-[400px]" 
    shadow="sm" isBlurred>
      <CardBody>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
        </div>
        <h1 className={title()}>{TITLE}</h1>
        <div className="w-full flex-wrap gap-4">
          <Skeleton isLoaded={isCompleteLoaded} className="rounded-lg">
          <div key="yearMonthKey" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1">
          <Controller
            control={control}
            name="year"
            render={({ field: { onChange } }) => (
              <Select {...register("year")}
                isRequired
                items={yearRange} label="Year" aria-label="Year"
                onChange={onChange}
                selectedKeys={[getValues("year").toString()]}
                isInvalid={errors?.year!== undefined} 
                errorMessage={(errors.year !== undefined) ? errors.year?.message : ""}
                color='default' variant='bordered' size='md' radius='full'
              >
                {(year) => <SelectItem key={year.key} value={year.key}>{year.label}</SelectItem>}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="month"
            render={({ field: { onChange } }) => (
              <Select {...register("month")}
                isRequired
                items={monthRange} label="Month" aria-label="Month"
                onChange={onChange}
                selectedKeys={[getValues("month").toString()]}
                isInvalid={errors?.month!== undefined} 
                errorMessage={(errors.month !== undefined) ? errors.month?.message : ""}
                color='default' variant='bordered' size='md' radius='full'
              >
                {(month) => <SelectItem key={month.key} value={month.key}>{month.label}</SelectItem>}
              </Select>
            )}
          />
          </div>
          </Skeleton>
          <Spacer y={1} />
          <Skeleton isLoaded={isCompleteLoaded} className="rounded-lg">
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange } }) => (
              <Select {...register("categoryId")}
                isRequired
                items={category} label="Category" aria-label="Category" placeholder="Select a category" 
                onChange={onChange}
                selectedKeys={[getValues("categoryId").toString()]}
                isInvalid={errors?.categoryId!== undefined} 
                errorMessage={(errors.categoryId !== undefined) ? errors.categoryId?.message : ""}
                color='default' variant='bordered' size='md' radius='full'
              >
                {(cat) => <SelectItem key={cat.catId} value={cat.catId}>{cat.catName}</SelectItem>}
              </Select>
            )}
          />
          </Skeleton>
          <Spacer y={1} />
          <Skeleton isLoaded={isCompleteLoaded} className="rounded-lg">
          <Input {...register("amount")}
          isRequired
          type="Text" label="Amount" aria-label="Amount" placeholder="Enter the amount" 
          isInvalid={errors?.amount !== undefined} 
          errorMessage={(errors.amount !== undefined) ? errors.amount?.message : ""}
          color='default' variant='bordered' size='md' radius='full'/>
          </Skeleton>
        </div>
        <div className="w-full flex-wrap">
          <Skeleton isLoaded={isCompleteLoaded} className="rounded-lg">
          <Button className="w-full" type="submit" color="primary" variant='solid' size='md' radius='full'>
            {SUBMIT_BUTTON_TEXT}
          </Button>
          </Skeleton>
        </div>
      </form>
      <Spacer y={1} />
      <Divider />
      </CardBody>
    </Card>
  )
}