"use client";

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"; 
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { ChangeEvent, FormEvent, useState } from "react";
import { addBudget } from "@/app/api/route";
import { FormErrors, AddBudget } from "@/types/definitions";
import { z } from "zod";

export default function AddBudgetForm() {
  const [errors, setErrors] = useState<FormErrors<AddBudget>>({});
  const monthRange = Array.from({ length: 12 }, (_, i) => ({key: String(i + 1), label: String(i + 1)}));
  const yearRange = Array.from({ length: 200 }, (_, i) => ({key: String(i + 1900), label: String(i + 1900)}));
  const [formData, setFormData] = useState<AddBudget>({
    "userId": "1",
    "categoryId": "1",
    "year": "2000",
    "month": "1",
    "amount": "1000"
  });
  
  
  const AddBudgetSchema = z.object({
    userId: z.coerce.number().int().min(1, "User id cannot be less than 1"),
    categoryId: z.coerce.number().int().min(1, "Category id cannot be less than 1"),
    year: z.coerce.number().int().min(1800, "Year cannot be before 1800"),
    month: z.coerce.number().int().min(1, "Month cannot be less than 1").max(12, "Month cannot be more than 12"),
    amount: z.coerce.number()
  });  

  const validateForm = (data: AddBudget): FormErrors<AddBudget> => {
    try {
      AddBudgetSchema.parse(data);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      return {};
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0 && formData !== undefined) {
      addBudget(formData);
    }
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e?.target?.name != undefined && e?.target?.value != undefined) {
      if (formData !== undefined) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    }
  }
  const handleSelectionChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  return (
    <Card className="border-solid border-indigo-500 bg-background/60 dark:bg-default-100/50 w-[300px]" 
    shadow="sm" isBlurred>
      <CardBody>
      <Divider />
      <form onSubmit={onSubmit} className="space-y-3">
        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
        </div>
        <h1 className={title()}>Add Budget</h1>
        <div className="w-full flex-wrap gap-4">
          <Input key="userId" name="userId" value={formData.userId} type="Text" 
          label="User Id" placeholder="Enter your user id" color='default' variant='bordered' size='md'  radius='full'/>
          {errors.userId && errors.userId.length > 0 && (
            <div className="form-msg">{errors.userId[0]}</div>
          )}
          <Input key="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} type="Text" 
          label="Category Id" placeholder="Enter budget category id" color='default' variant='bordered' size='md' radius='full'/>
          {errors.categoryId && errors.categoryId.length > 0 && (
            <div className="form-msg">{errors.categoryId[0]}</div>
          )}
          <Select
            items={yearRange}
            label="Year"
            placeholder="Select a year"
            className="max-w-xs"
            color='default' variant='bordered' size='md' radius='full'
            defaultSelectedKeys={["2000"]}
            onChange={(e) => handleSelectionChange("year", e.target.value)}
          >
            {(year) => <SelectItem key={year.key} value={year.key}>{year.label}</SelectItem>}
          </Select>
          {errors.year && errors.year.length > 0 && (
            <div className="form-msg">{errors.year[0]}</div>
          )}
          <Select
            items={monthRange}
            label="Month"
            placeholder="Select a month"
            className="max-w-xs"
            color='default' variant='bordered' size='md' radius='full'
            defaultSelectedKeys={["1"]}
            onChange={(e) => handleSelectionChange("month", e.target.value)}
          >
            {(month) => <SelectItem key={month.key} value={month.key}>{month.label}</SelectItem>}
          </Select>
          {errors.month && errors.month.length > 0 && (
            <div className="form-msg">{errors.month[0]}</div>
          )}
          <Input key="amount" name="amount" value={formData.amount} onChange={handleChange} type="Text" label="Amount" 
          placeholder="Enter budget amount" color='default' variant='bordered' size='md' radius='full'/>
          {errors.amount && errors.amount.length > 0 && (
            <div className="form-msg">{errors.amount[0]}</div>
          )}
        </div>
        <div className="w-full flex-wrap">
          <Button type="submit" className="w-full" color="primary" variant='solid' size='md' radius='full'>
            Add
          </Button>
        </div>
      </form>
      <Divider />
      </CardBody>
    </Card>
  );
}