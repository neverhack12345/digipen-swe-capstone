// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Budget = {
  budgetId: string,
  year: number,
  month: number,
  amount: number,
  catId: number,
  catName: string,
  userId: number
};

export type AddBudget = {
  userId: string,
  categoryId: string,
  year: string,
  month: string,
  amount: string
};

export type EditBudget = {
  budgetId: string,
  categoryId: string,
  year: string,
  month: string,
  amount: string
};