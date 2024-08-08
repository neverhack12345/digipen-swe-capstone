"use client";

import { useSearchParams } from 'next/navigation'
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"; 
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import { editBudget } from "@/app/api/route";

export default function EditBudgetForm(budget: any) {
  const onSubmit = (e: { preventDefault: () => void; }) => {
    console.log(formData)
    e.preventDefault();
    editBudget(formData);
  }
  const searchParams = useSearchParams() 
  const [formData, setFormData] = useState({
    "budgetId": searchParams.get('budgetId'),
    "categoryId": searchParams.get('categoryId'),
    "year": searchParams.get('year'),
    "month": searchParams.get('month'),
    "amount": searchParams.get('amount')
  });
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <Input key="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} type="Text" 
          label="Category Id" placeholder="Enter budget category id" color='default' variant='bordered' size='md' radius='full'/>
          <Input key="year" name="year" value={formData.year} onChange={handleChange} type="Text" label="Year" 
          placeholder="Enter budget year" color='default' variant='bordered' size='md' radius='full'/>
          <Input key="month" name="month" value={formData.month} onChange={handleChange} type="Text" label="Month" 
          placeholder="Enter budget month" color='default' variant='bordered' size='md' radius='full'/>
          <Input key="amount" name="amount" value={formData.amount} onChange={handleChange} type="Text" label="Amount" 
          placeholder="Enter budget amount" color='default' variant='bordered' size='md' radius='full'/>
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