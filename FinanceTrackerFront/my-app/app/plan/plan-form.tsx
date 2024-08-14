"use client";

import {
  Button,
  Card,
  CardBody,
  Input,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { fetchPlan } from "@/lib/backend";
import { Plan, PlanFormType } from "@/types/definitions";
import { title } from "@/components/primitives";

const PlanSchema = z.object({
  principal: z.coerce.number(),
  interestPerYear: z.coerce.number(),
  yearlyContribution: z.coerce.number(),
  yearsContributing: z.coerce.number().int(),
  yearStartWithdraw: z.coerce.number().int(),
  yearsProjected: z.coerce
    .number()
    .int()
    .min(1, "Year projected cannot be less than 1"),
});

export default function PlanForm({
  setData,
  setIsCompleteLoaded,
}: {
  setData: Dispatch<SetStateAction<Plan[]>>;
  setIsCompleteLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const TITLE = "Plan";
  const SUBMIT_BUTTON_TEXT = "Generate";

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      principal: "10000",
      interestPerYear: "0.04",
      yearlyContribution: "24000",
      yearsContributing: "10",
      yearlyWithdrawAmount: "12000",
      yearStartWithdraw: "20",
      yearsProjected: "40",
    },
  });
  const fetchData = useCallback(async (data: PlanFormType) => {
    const planResult = await fetchPlan(data);

    setData(planResult);
    setIsCompleteLoaded(true);
  }, []);

  const onSubmit = () => {
    fetchData({
      principal: getValues("principal"),
      interestPerYear: getValues("interestPerYear"),
      yearlyContribution: getValues("yearlyContribution"),
      yearsContributing: getValues("yearsContributing"),
      yearlyWithdrawAmount: getValues("yearlyWithdrawAmount"),
      yearStartWithdraw: getValues("yearStartWithdraw"),
      yearsProjected: getValues("yearsProjected"),
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
        <div
          aria-atomic="true"
          aria-live="polite"
          className="flex items-end space-x-1"
        />
        <h1 className={title()}>{TITLE}</h1>
        <div className="w-full flex-wrap gap-4">
          <Input
            {...register("principal")}
            isRequired
            aria-label="principal"
            color="default"
            defaultValue="10000"
            errorMessage={
              errors.principal !== undefined ? errors.principal?.message : ""
            }
            isInvalid={errors?.principal !== undefined}
            label="Principal"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
          <Spacer y={1} />
          <Input
            {...register("interestPerYear")}
            isRequired
            aria-label="interestPerYear"
            color="default"
            defaultValue="0.04"
            errorMessage={
              errors.interestPerYear !== undefined
                ? errors.interestPerYear?.message
                : ""
            }
            isInvalid={errors?.interestPerYear !== undefined}
            label="Interest Per Year"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
          <Spacer y={1} />
          <Input
            {...register("yearlyContribution")}
            isRequired
            aria-label="yearlyContribution"
            color="default"
            defaultValue="24000"
            errorMessage={
              errors.yearlyContribution !== undefined
                ? errors.yearlyContribution?.message
                : ""
            }
            isInvalid={errors?.yearlyContribution !== undefined}
            label="Yearly Contribution"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
          <Spacer y={1} />
          <Input
            {...register("yearsContributing")}
            isRequired
            aria-label="yearsContributing"
            color="default"
            defaultValue="10"
            errorMessage={
              errors.yearsContributing !== undefined
                ? errors.yearsContributing?.message
                : ""
            }
            isInvalid={errors?.yearsContributing !== undefined}
            label="Years Contribution"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
          <Spacer y={1} />
          <Input
            {...register("yearlyWithdrawAmount")}
            isRequired
            aria-label="yearlyWithdrawAmount"
            color="default"
            defaultValue="12000"
            errorMessage={
              errors.yearlyWithdrawAmount !== undefined
                ? errors.yearlyWithdrawAmount?.message
                : ""
            }
            isInvalid={errors?.yearlyWithdrawAmount !== undefined}
            label="Yearly Withdrawl Amount"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
          <Spacer y={1} />
          <Input
            {...register("yearStartWithdraw")}
            isRequired
            aria-label="yearStartWithdraw"
            color="default"
            defaultValue="20"
            errorMessage={
              errors.yearStartWithdraw !== undefined
                ? errors.yearStartWithdraw?.message
                : ""
            }
            isInvalid={errors?.yearStartWithdraw !== undefined}
            label="Year Start Withdrawl"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
          <Spacer y={1} />
          <Input
            {...register("yearsProjected")}
            isRequired
            aria-label="yearsProjected"
            color="default"
            defaultValue="40"
            errorMessage={
              errors.yearsProjected !== undefined
                ? errors.yearsProjected?.message
                : ""
            }
            isInvalid={errors?.yearsProjected !== undefined}
            label="Years Projected"
            radius="full"
            size="md"
            type="Text"
            variant="bordered"
          />
        </div>
        <div className="w-full flex-wrap">
          <Button
            className="w-full"
            color="primary"
            radius="full"
            size="md"
            type="button"
            variant="solid"
            onClick={onSubmit}
          >
            {SUBMIT_BUTTON_TEXT}
          </Button>
        </div>
        <Spacer y={1} />
        <Divider />
      </CardBody>
    </Card>
  );
}
