"use client";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";

import CategoryTable from "./category-table";
import SubCategoryTable from "./sub-category-table";

import { Category, SubCategory } from "@/types/definitions";
import { fetchCategory, fetchSubCategory } from "@/lib/backend";

const CategoryPage = () => {
  const [category, setCategory] = useState<Array<Category>>([]);
  const [subCategory, setSubCategory] = useState<Array<SubCategory>>([]);
  const [isCompleteLoaded, setIsCompleteLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const categoryResult = await fetchCategory();
    const subCategoryResult = await fetchSubCategory();

    setCategory(categoryResult);
    setSubCategory(subCategoryResult)
    setIsCompleteLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative mx-auto flex-nowrap gap-x-10 w-full space-y-2.5 p-4">
      <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
        <CategoryTable filteredData={category} />
      </Skeleton>
      <Skeleton className="rounded-lg" isLoaded={isCompleteLoaded}>
        <SubCategoryTable filteredData={subCategory} />
      </Skeleton>
    </div>
  );
};

export default CategoryPage;
