"use client"
import CategoryTable from "./category-table"
import SubCategoryTable from "./sub-category-table"

const CategoryPage = () => {
  return (
    <div className="relative mx-auto flex-nowrap gap-x-10 w-full space-y-2.5 p-4">
      <CategoryTable />
      <SubCategoryTable />
    </div>
  );
}

export default CategoryPage;