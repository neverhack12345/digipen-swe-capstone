"use client";

import { getLocalTimeZone, today} from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"; 
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { createUser } from "../api/route";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { AddUser, FormErrors } from "@/types/definitions";

export default function SignUp() {
  const [errors, setErrors] = useState<FormErrors<AddUser>>({});
  const [formData, setFormData] = useState<AddUser>({
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "dob": "",
    "gender": "",
  });
  
  
  const AddBudgetSchema = z.object({
    userId: z.coerce.number().int().min(1, "User id cannot be less than 1"),
    categoryId: z.coerce.number().int().min(1, "Category id cannot be less than 1"),
    year: z.coerce.number().int().min(1800, "Year cannot be before 1800"),
    month: z.coerce.number().int().min(1, "Month cannot be less than 1").max(12, "Month cannot be more than 12"),
    amount: z.coerce.number()
  });  

  const validateForm = (data: AddUser): FormErrors<AddUser> => {
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
      createUser(formData);
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

  const gender = [
    {key: "unkown", label: "N/A"},
    {key: "female", label: "F"},
    {key: "male", label: "M"},
  ];

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
          <p className="text-primary">Sign-up</p>
          <div className="w-full flex-wrap gap-4">
            <Input type="Email" label="Email" placeholder="Enter your email" 
            name="email" value={formData.email} onChange={handleChange}
            color='default' variant='bordered' size='md'  radius='full'/>
            <Input type="Password" label="Password" placeholder="Enter your password" 
            name="password" value={formData.password} onChange={handleChange}
            color='default' variant='bordered' size='md' radius='full'/>
            <Input type="Text" label="First Name" placeholder="Enter your first name" 
            name="firstName" value={formData.firstName} onChange={handleChange}
            color='default' variant='bordered' size='md' radius='full'/>
            <Input type="Text" label="Last Name" placeholder="Enter your last name" 
            name="lastName" value={formData.lastName} onChange={handleChange}
            color='default' variant='bordered' size='md' radius='full'/>
            <DatePicker
              label="Birthday"
              maxValue={today(getLocalTimeZone())}
              onChange={(e) => (setFormData({
                ...formData,
                "dob": e.toString(),
              }))}
              color='default' variant='bordered' size='md' radius='full'
            />
            <Select
              items={gender}
              label="Gender"
              placeholder="Select an gender"
              className="max-w-xs"
              color='default' variant='bordered' size='md' radius='full'
              onChange={(e) => handleSelectionChange("gender", e.target.value)}
            >
              {(gender) => <SelectItem key={gender.key}>{gender.label}</SelectItem>}
            </Select>
          </div>
          <div className="w-full flex-wrap">
            <Button className="w-full" type="submit" color="primary" variant='solid' size='md' radius='full'>
              Sign-up
            </Button>
          </div>
        </form>
        <Divider />
        </CardBody>
      </Card>
  );
}