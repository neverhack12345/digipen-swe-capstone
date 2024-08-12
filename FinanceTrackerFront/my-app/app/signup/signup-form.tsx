"use client";

import { title } from "@/components/primitives";
import { 
  Button, Card, CardBody, Input, Divider, 
  Select, SelectItem, DatePicker, Spacer 
} from "@nextui-org/react"
import { createUser } from "../api/route";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

const AddUserSchema = z.object({
  email: z.string().email().max(255, "Email cannot be more than 255 characters"),
  password: z.string(),
  firstName: z.string().max(255, "First name cannot be more than 255 characters"),
  lastName: z.string().max(255, "Last name cannot be more than 255 characters"),
  dob: z.coerce.date(),
  gender: z.string(),
});  

export default function SignUp() {
  const TITLE = "Sign Up";
  const SUBMIT_BUTTON_TEXT = "Sign Up";
  const gender = [
    {key: "Unknown", label: "N/A"},
    {key: "F", label: "F"},
    {key: "M", label: "M"},
  ];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      "email": "",
      "password": "",
      "firstName": "",
      "lastName": "",
      "dob": "",
      "gender": "",
    },
  })

  const onSubmit = (data: any) => {
    createUser({...data, "dob": new Date(data.dob).toLocaleDateString('en-CA')});
  }

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
          <div key="firstLastName" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1">
          <Input 
            {...register("firstName")}
            label="First Name" 
            placeholder="Enter your first name" 
            aria-label="First Name"
            isInvalid={errors?.firstName!== undefined} 
            errorMessage={(errors.firstName !== undefined) ? errors.firstName?.message : ""}
            color='default' variant='bordered' size='md' radius='full'
          />
          <Input 
            {...register("lastName")}
            label="Last Name" 
            placeholder="Enter your last name" 
            aria-label="Last Name"
            isInvalid={errors?.lastName!== undefined} 
            errorMessage={(errors.lastName !== undefined) ? errors.lastName?.message : ""}
            color='default' variant='bordered' size='md' radius='full'
          />
          </div>
          <Spacer y={1} />
          <Input {...register("email")}
          type="Email" label="Email" placeholder="finance@example.com" aria-label="Email"
          isInvalid={errors.email && errors.email?.message !== undefined} 
          errorMessage={(errors.email !== undefined) ? errors.email?.message : ""}
          color='default' variant='bordered' size='md'  radius='full'/>
          <Spacer y={1} />
          <Input {...register("password")}
          type="Password" label="Password" placeholder="Enter your password" aria-label="Password"
          isInvalid={errors?.password !== undefined} 
          errorMessage={(errors.password !== undefined) ? errors.password?.message : ""}
          color='default' variant='bordered' size='md' radius='full'/>
          <Spacer y={1} />
          <Controller
            control={control}
            name="dob"
            render={({ field: { onChange } }) => (
                <DatePicker label="Date of Birth" aria-label="Date of Birth" 
                onChange={onChange} 
                color='default' variant='bordered' size='md' radius='full'
                />
            )}
          />
          <Spacer y={1} />
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange } }) => (
              <Select {...register("gender")}
                items={gender} label="Gender" placeholder="Select an gender" aria-label="Gender"
                onChange={onChange}
                isInvalid={errors?.gender!== undefined} 
                errorMessage={(errors.gender !== undefined) ? errors.gender?.message : ""}
                color='default' variant='bordered' size='md' radius='full'
              >
                {(gender) => <SelectItem key={gender.key}>{gender.label}</SelectItem>}
              </Select>
            )}
          />
        </div>
        <div className="w-full flex-wrap">
          <Button className="w-full" type="submit" color="primary" variant='solid' size='md' radius='full'>
            {SUBMIT_BUTTON_TEXT}
          </Button>
        </div>
      </form>
      <Spacer y={1} />
      <Divider />
      </CardBody>
    </Card>
  );
}