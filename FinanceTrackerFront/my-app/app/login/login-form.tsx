"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"; 
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import NextLink from "next/link"
import { FormEvent } from "react";
import { authenticateUser } from "../api/route";

export default function LoginForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await authenticateUser(formData);
  }

  return (
      <Card className="border-solid border-indigo-500 bg-background/60 dark:bg-default-100/50 max-w-[610px]" 
      shadow="sm" isBlurred>
        <CardBody>
        <Divider />
        <form onSubmit={onSubmit} className="space-y-3">
            <p className="text-primary">Please log in to continue.</p>
            <div
              className="items-start space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
            </div>
            <div className="w-full flex-wrap gap-4">
              <Input className="gap-2" type="Email" label="Email" placeholder="Enter your email" 
              color='default' variant='bordered' size='md'  radius='full'/>
              <Input className="gap-2" type="Password" label="Password" placeholder="Enter your password" 
              color='default' variant='bordered' size='md' radius='full'/>
            </div>
            <div className="w-full flex-wrap gap-4">
                <Button className="mt-2 w-full" color="primary" variant='solid' size='md' radius='full'>
                    Log-in
                </Button>
            </div>
          
          </form>
          <div className="w-full flex-wrap gap-4">
            <NextLink href='/signup'>
              <Button className="mt-2 w-full" color="default" variant='solid' size='md' radius='full'>
                Sign-up
              </Button>
            </NextLink>
          </div>
          <Divider />
        </CardBody>
    </Card>
  );
}