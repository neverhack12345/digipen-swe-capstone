
import EditBudgetForm from "./edit-budget-form";

export default async function EditBudgetPage({
  searchParams,
}: {
  searchParams?: {
    budgetId?: string;
    categoryId?: string,
    year?: string,
    month?: string,
    amount?: string
  };
}) {

  return (
    <div className="relative mx-auto flex w-full space-y-2.5 p-4">
      <EditBudgetForm budget={searchParams} />
    </div>
  );
}
