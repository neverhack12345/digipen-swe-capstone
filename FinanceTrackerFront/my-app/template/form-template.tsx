"use client";

import { getLocalTimeZone, today} from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"; 
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { FormEvent } from "react";
import { sampleAPI } from "@/app/api/route";

export default function FormTemplate() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await sampleAPI(formData);
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
            color='default' variant='bordered' size='md'  radius='full'/>
            <Input type="Password" label="Password" placeholder="Enter your password" 
            color='default' variant='bordered' size='md' radius='full'/>
            <Input type="Text" label="First Name" placeholder="Enter your first name" 
            color='default' variant='bordered' size='md' radius='full'/>
            <Input type="Text" label="Last Name" placeholder="Enter your last name" 
            color='default' variant='bordered' size='md' radius='full'/>
            <DatePicker
              label="Birthday"
              maxValue={today(getLocalTimeZone())}
              color='default' variant='bordered' size='md' radius='full'
            />
            <Select
              items={gender}
              label="Gender"
              placeholder="Select an gender"
              className="max-w-xs"
              color='default' variant='bordered' size='md' radius='full'
            >
              {(gender) => <SelectItem key={gender.key}>{gender.label}</SelectItem>}
            </Select>
          </div>
          <div className="w-full flex-wrap">
            <Button type="submit" className="w-full" color="primary" variant='solid' size='md' radius='full'>
              Sign-up
            </Button>
          </div>
        </form>
        <Divider />
        </CardBody>
      </Card>
  );
}