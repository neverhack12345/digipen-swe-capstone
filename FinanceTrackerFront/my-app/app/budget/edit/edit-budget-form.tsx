"use client";

import { useSearchParams } from 'next/navigation'
import { title } from "@/components/primitives";
import { Button, Card, CardBody, Input, Divider, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { editBudget, fetchCategory, fetchBudgetById } from "@/app/api/route";
import { FormErrors, EditBudget, Category } from '@/types/definitions'; 
import { z } from "zod"

const UpdateBudgetSchema = z.object({
  budgetId: z.coerce.number().int().min(1, "Budget id cannot be less than 1"),
  categoryId: z.coerce.number().int().min(1, "Category id cannot be less than 1"),
  year: z.coerce.number().int().min(1800, "Year cannot be before 1800"),
  month: z.coerce.number().int().min(1, "Month cannot be less than 1").max(12, "Month cannot be more than 12"),
  amount: z.coerce.number()
});  

export default function EditBudgetForm() {
  const [errors, setErrors] = useState<FormErrors<EditBudget>>({});
  const monthRange = Array.from({ length: 12 }, (_, i) => ({key: String(i + 1), label: String(i + 1)}));
  const yearRange = Array.from({ length: 200 }, (_, i) => ({key: String(i + 1900), label: String(i + 1900)}));
  const searchParams = useSearchParams() 
  const [formData, setFormData] = useState<EditBudget>({
    "budgetId": "Loading...",
    "categoryId": "Loading...",
    "year": "Loading...",
    "month": "Loading...",
    "amount": "Loading...",
  });
  const [category, setCategory] = useState<Array<Category>>([{"catId": -1, "catName": "Loading..."}]);
  const getData = useCallback(async () => {
    const categories = await fetchCategory();
    setCategory(categories)
    const budgetId = searchParams.get('budgetId');
    if (budgetId) {
      const budgets = await fetchBudgetById(budgetId);
      console.log({
        "budgetId": budgets.budgetId.toString(),
        "categoryId": budgets.catId.toString(),
        "year": budgets.year.toString(),
        "month": budgets.month.toString(),
        "amount": budgets.amount.toString() 
      })
      setFormData({
        "budgetId": budgets.budgetId.toString(),
        "categoryId": budgets.catId.toString(),
        "year": budgets.year.toString(),
        "month": budgets.month.toString(),
        "amount": budgets.amount.toString() 
      })
    }
  }, []);
  useEffect(() => {
    getData();
  }, [])

  const validateForm = (data: EditBudget): FormErrors<EditBudget> => {
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
        <h1 className={title()}>Edit Budget</h1>
        <div className="w-full flex-wrap gap-4">
          <Input isDisabled key="budgetId" name="budgetId" value={formData.budgetId} type="Text" 
          label="Budget Id" placeholder="Enter budget budeget id" color='default' variant='bordered' size='md' radius='full'/>
          {errors.budgetId && errors.budgetId.length > 0 && (
            <div className="form-msg">{errors.budgetId[0]}</div>
          )}
          {category && <Select
            items={category}
            label="Category"
            placeholder="Select a category"
            color='default' variant='bordered' size='md' radius='full'
            selectedKeys={[formData["categoryId"]]}
            onChange={(e) => handleSelectionChange("categoryId", e.target.value)}
          >
            {(cat) => <SelectItem key={cat.catId} value={cat.catId}>{cat.catName}</SelectItem>}
          </Select>}
          {errors.categoryId && errors.categoryId.length > 0 && (
            <div className="form-msg">{errors.categoryId[0]}</div>
          )}
          <Select
            items={yearRange}
            label="Year"
            placeholder="Select a year"
            color='default' variant='bordered' size='md' radius='full'
            selectedKeys={[formData["year"]]}
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
            color='default' variant='bordered' size='md' radius='full'
            selectedKeys={[formData["month"]]}
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
            Edit
          </Button>
        </div>
      </form>
      <Divider />
      </CardBody>
    </Card>
  );
}