// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
export type FormErrors<T> = Partial<Record<keyof T, string[]>>;

export type Category = {
  catId: number;
  catName: string;
};

export type SubCategory = {
  subId: number;
  subName: string;
  catName: string;
};

export type Budget = {
  budgetId: string;
  year: number;
  month: number;
  amount: number;
  catId: number;
  catName: string;
  userId: number;
};

export type CashFlow = {
  flowId: number;
  sourceName: string;
  date: string;
  amount: number;
  remark: string;
  subId: number;
  subName: string;
  userId: number;
};

export type Plan = {
  year: number;
  yearlyPrincipal: number;
  yearlyContribution: number;
  yearlyWithdraw: number;
  yearlyInterest: number;
};

export type PlanFormType = {
  principal: string;
  interestPerYear: string;
  yearlyContribution: string;
  yearsContributing: string;
  yearlyWithdrawAmount: string;
  yearStartWithdraw: string;
  yearsProjected: string;
};

export type AddBudget = {
  userId: string;
  categoryId: string;
  year: string;
  month: string;
  amount: string;
};

export type EditBudget = {
  budgetId: string;
  categoryId: string;
  year: string;
  month: string;
  amount: string;
};
