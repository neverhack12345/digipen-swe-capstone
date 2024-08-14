"use client";

import {
  Button,
  Card,
  CardBody,
  Input,
  Divider,
  Select,
  SelectItem,
  DatePicker,
  Spacer,
} from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { createUser } from "../../lib/backend";

import { title } from "@/components/primitives";

const AddUserSchema = z.object({
  email: z
    .string()
    .email()
    .max(255, "Email cannot be more than 255 characters"),
  password: z.string(),
  firstName: z
    .string()
    .max(255, "First name cannot be more than 255 characters"),
  lastName: z.string().max(255, "Last name cannot be more than 255 characters"),
  dob: z.coerce.date(),
  gender: z.string(),
});

export default function SignUp() {
  const TITLE = "Sign Up";
  const SUBMIT_BUTTON_TEXT = "Sign Up";
  const gender = [
    { key: "Unknown", label: "N/A" },
    { key: "F", label: "F" },
    { key: "M", label: "M" },
  ];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
    },
  });

  const onSubmit = (data: any) => {
    createUser({
      ...data,
      dob: new Date(data.dob).toLocaleDateString("en-CA"),
    });
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
            <div
              key="firstLastName"
              className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1"
            >
              <Input
                {...register("firstName")}
                aria-label="First Name"
                color="default"
                errorMessage={
                  errors.firstName !== undefined
                    ? errors.firstName?.message
                    : ""
                }
                isInvalid={errors?.firstName !== undefined}
                label="First Name"
                placeholder="Enter your first name"
                radius="full"
                size="md"
                type="Text"
                variant="bordered"
              />
              <Input
                {...register("lastName")}
                aria-label="Last Name"
                color="default"
                errorMessage={
                  errors.lastName !== undefined ? errors.lastName?.message : ""
                }
                isInvalid={errors?.lastName !== undefined}
                label="Last Name"
                placeholder="Enter your last name"
                radius="full"
                size="md"
                type="Text"
                variant="bordered"
              />
            </div>
            <Spacer y={1} />
            <Input
              {...register("email")}
              aria-label="Email"
              color="default"
              errorMessage={
                errors.email !== undefined ? errors.email?.message : ""
              }
              isInvalid={errors.email && errors.email?.message !== undefined}
              label="Email"
              placeholder="finance@example.com"
              radius="full"
              size="md"
              type="Email"
              variant="bordered"
            />
            <Spacer y={1} />
            <Input
              {...register("password")}
              aria-label="Password"
              color="default"
              errorMessage={
                errors.password !== undefined ? errors.password?.message : ""
              }
              isInvalid={errors?.password !== undefined}
              label="Password"
              placeholder="Enter your password"
              radius="full"
              size="md"
              type="Password"
              variant="bordered"
            />
            <Spacer y={1} />
            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange } }) => (
                <DatePicker
                  aria-label="Date of Birth"
                  color="default"
                  label="Date of Birth"
                  radius="full"
                  size="md"
                  variant="bordered"
                  onChange={onChange}
                />
              )}
            />
            <Spacer y={1} />
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange } }) => (
                <Select
                  {...register("gender")}
                  aria-label="Gender"
                  color="default"
                  errorMessage={
                    errors.gender !== undefined ? errors.gender?.message : ""
                  }
                  isInvalid={errors?.gender !== undefined}
                  items={gender}
                  label="Gender"
                  placeholder="Select an gender"
                  radius="full"
                  size="md"
                  variant="bordered"
                  onChange={onChange}
                >
                  {(gender) => (
                    <SelectItem key={gender.key}>{gender.label}</SelectItem>
                  )}
                </Select>
              )}
            />
          </div>
          <div className="w-full flex-wrap">
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
          </div>
        </form>
        <Spacer y={1} />
        <Divider />
      </CardBody>
    </Card>
  );
}
