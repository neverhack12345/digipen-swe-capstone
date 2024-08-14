"use client";

import { useSearchParams } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  Input,
  Divider,
  Select,
  SelectItem,
  Spacer,
  Skeleton,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editBudget, fetchCategory, fetchBudgetById } from "@/lib/backend";
import { Category } from "@/types/definitions";
import { monthRange, yearRange } from "@/lib/data";
import { title } from "@/components/primitives";

const UpdateBudgetSchema = z.object({
  budgetId: z.coerce.number().int().min(1, "Budget id cannot be less than 1"),
  categoryId: z.coerce
    .number()
    .int()
    .min(1, "Category id cannot be less than 1"),
  year: z.coerce.number().int().min(1800, "Year cannot be before 1800"),
  month: z.coerce
    .number()
    .int()
    .min(1, "Month cannot be less than 1")
    .max(12, "Month cannot be more than 12"),
  amount: z.coerce.number(),
});

export default function EditBudgetForm() {
  const TITLE = "Edit Budget";
  const SUBMIT_BUTTON_TEXT = "Edit Budget";
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<Array<Category>>([
    { catId: -1, catName: "Loading..." },
  ]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);
  const getData = useCallback(async () => {
    const budgetId = searchParams.get("budgetId");

    if (budgetId) {
      const [budgets, categories] = await Promise.all([
        fetchBudgetById(budgetId),
        fetchCategory(),
      ]);

      setCategory(categories);
      if (budgets !== undefined) {
        setValue("budgetId", budgets.budgetId);
        setValue("categoryId", budgets.catId);
        setValue("year", budgets.year);
        setValue("month", budgets.month);
        setValue("amount", budgets.amount);
        setIsCompleteLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateBudgetSchema),
    defaultValues: {
      budgetId: "",
      categoryId: "",
      year: "",
      month: "",
      amount: "",
    },
  });
  const onSubmit = (data: any) => {
    editBudget(data);
  };

  return (
    <Card
      isBlurred
      className="border-solid border-indigo-500 bg-background/60 dark:bg-default-100/50 w-[400px]"
      shadow="sm"
    >
      <CardBody>
        <Divider />
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div
            aria-atomic="true"
            aria-live="polite"
            className="flex items-end space-x-1"
          />
          <h1 className={title()}>{TITLE}</h1>
          <div className="w-full flex-wrap gap-4">
            <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
              <div
                key="yearMonthKey"
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1"
              >
                <Controller
                  control={control}
                  name="year"
                  render={({ field: { onChange } }) => (
                    <Select
                      {...register("year")}
                      isRequired
                      aria-label="Year"
                      color="default"
                      errorMessage={
                        errors.year !== undefined ? errors.year?.message : ""
                      }
                      isInvalid={errors?.year !== undefined}
                      items={yearRange}
                      label="Year"
                      radius="full"
                      selectedKeys={[getValues("year").toString()]}
                      size="md"
                      variant="bordered"
                      onChange={onChange}
                    >
                      {(year) => (
                        <SelectItem key={year.key} value={year.key}>
                          {year.label}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="month"
                  render={({ field: { onChange } }) => (
                    <Select
                      {...register("month")}
                      isRequired
                      aria-label="Month"
                      color="default"
                      errorMessage={
                        errors.month !== undefined ? errors.month?.message : ""
                      }
                      isInvalid={errors?.month !== undefined}
                      items={monthRange}
                      label="Month"
                      radius="full"
                      selectedKeys={[getValues("month").toString()]}
                      size="md"
                      variant="bordered"
                      onChange={onChange}
                    >
                      {(month) => (
                        <SelectItem key={month.key} value={month.key}>
                          {month.label}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
              </div>
            </Skeleton>
            <Spacer y={1} />
            <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
              <Controller
                control={control}
                name="categoryId"
                render={({ field: { onChange } }) => (
                  <Select
                    {...register("categoryId")}
                    isRequired
                    aria-label="Category"
                    color="default"
                    errorMessage={
                      errors.categoryId !== undefined
                        ? errors.categoryId?.message
                        : ""
                    }
                    isInvalid={errors?.categoryId !== undefined}
                    items={category}
                    label="Category"
                    placeholder="Select a category"
                    radius="full"
                    selectedKeys={[getValues("categoryId").toString()]}
                    size="md"
                    variant="bordered"
                    onChange={onChange}
                  >
                    {(cat) => (
                      <SelectItem key={cat.catId} value={cat.catId}>
                        {cat.catName}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />
            </Skeleton>
            <Spacer y={1} />
            <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange } }) => (
                  <Input
                    {...register("amount")}
                    isRequired
                    aria-label="Amount"
                    color="default"
                    defaultValue={getValues("amount").toString()}
                    errorMessage={
                      errors.amount !== undefined ? errors.amount?.message : ""
                    }
                    isInvalid={errors?.amount !== undefined}
                    label="Amount"
                    placeholder="Enter the amount"
                    radius="full"
                    size="md"
                    type="Text"
                    value={getValues("amount").toString()}
                    variant="bordered"
                    onChange={onChange}
                  />
                )}
              />
            </Skeleton>
          </div>
          <div className="w-full flex-wrap">
            <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
              <Button
                className="w-full"
                color="primary"
                radius="full"
                size="md"
                type="submit"
                variant="solid"
              >
                {SUBMIT_BUTTON_TEXT}
              </Button>
            </Skeleton>
          </div>
        </form>
        <Spacer y={1} />
        <Divider />
      </CardBody>
    </Card>
  );
}
