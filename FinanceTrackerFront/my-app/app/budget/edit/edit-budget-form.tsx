"use client";

import { useSearchParams } from 'next/navigation'
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"; 
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { ChangeEvent, FormEvent, useState } from "react";
import { editBudget } from "@/app/api/route";
import { EditBudget } from '@/types/definitions'; 
import { z } from "zod"

export default function EditBudgetForm() {
  type FormErrors = Partial<Record<keyof EditBudget, string[]>>;
  const [errors, setErrors] = useState<FormErrors>({});
  const searchParams = useSearchParams() 
  const [formData, setFormData] = useState<EditBudget>({
    "budgetId": searchParams.get('budgetId') || "1",
    "categoryId": searchParams.get('categoryId') || "1",
    "year": searchParams.get('year') || "2000",
    "month": searchParams.get('month') || "1",
    "amount": searchParams.get('amount') || "1000"
  });

  const UpdateBudgetSchema = z.object({
    budgetId: z.coerce.number().int().min(1, "Budget id cannot be less than 1"),
    categoryId: z.coerce.number().int().min(1, "Category id cannot be less than 1"),
    year: z.coerce.number().int().min(1800, "Year cannot be before 1800"),
    month: z.coerce.number().int().min(1, "Month cannot be less than 1").max(12, "Month cannot be more than 12"),
    amount: z.coerce.number()
  });  

  const validateForm = (data: EditBudget): FormErrors => {
    try {
      UpdateBudgetSchema.parse(data);
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
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      editBudget(formData);
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

  return (
    <Card className="border-solid border-indigo-500 bg-background/60 dark:bg-default-100/50 max-w-[610px]" 
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
        <h1 className={title()}>Edit Budget</h1>
        <div className="w-full flex-wrap gap-4">
          <Input isDisabled key="budgetId" name="budgetId" value={formData.budgetId} type="Text" 
          label="Category Id" placeholder="Enter budget category id" color='default' variant='bordered' size='md' radius='full'/>
          {errors.budgetId && errors.budgetId.length > 0 && (
            <div className="form-msg">{errors.budgetId[0]}</div>
          )}
          <Input key="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} type="Text" 
          label="Category Id" placeholder="Enter budget category id" color='default' variant='bordered' size='md' radius='full'/>
          {errors.categoryId && errors.categoryId.length > 0 && (
            <div className="form-msg">{errors.categoryId[0]}</div>
          )}
          <Input key="year" name="year" value={formData.year} onChange={handleChange} type="Text" label="Year" 
          placeholder="Enter budget year" color='default' variant='bordered' size='md' radius='full'/>
          {errors.year && errors.year.length > 0 && (
            <div className="form-msg">{errors.year[0]}</div>
          )}
          <Input key="month" name="month" value={formData.month} onChange={handleChange} type="Text" label="Month" 
          placeholder="Enter budget month" color='default' variant='bordered' size='md' radius='full'/>
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
            Edit
          </Button>
        </div>
      </form>
      <Divider />
      </CardBody>
    </Card>
  );
}