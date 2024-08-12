export const categoryColumns = [
  { name: "ID", uid: "catId", sortable: true },
  { name: "CATEGORY", uid: "catName", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const subCategoryColumns = [
  { name: "ID", uid: "subId", sortable: true },
  { name: "SUBCATEGORY", uid: "subName", sortable: true },
  { name: "CATEGORY", uid: "catName", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const budgetColumns = [
  { name: "YEAR", uid: "year", sortable: true },
  { name: "MONTH", uid: "month", sortable: true },
  { name: "CATEGORY", uid: "catName", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const cashFlowColumns = [
  { name: "ID", uid: "flowId", sortable: true },
  { name: "SOURCE", uid: "sourceName", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "REMARK", uid: "remark", sortable: true },
  { name: "SUBCATEGORY ID", uid: "subId", sortable: true },
  { name: "SUBCATEGORY", uid: "subName", sortable: true },
  { name: "USER ID", uid: "userId", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
