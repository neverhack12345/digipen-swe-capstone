export const categoryColumns = [
  { name: "CATEGORY", uid: "catName", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const subCategoryColumns = [
  { name: "SUBCATEGORY", uid: "subName", sortable: true },
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
  { name: "DATE", uid: "date", sortable: true },
  { name: "SOURCE", uid: "sourceName", sortable: true },
  { name: "SUBCATEGORY", uid: "subName", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "REMARK", uid: "remark", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const monthRange = [
  { key: "1", label: "January" },
  { key: "2", label: "Feburary" },
  { key: "3", label: "March" },
  { key: "4", label: "April" },
  { key: "5", label: "May" },
  { key: "6", label: "June" },
  { key: "7", label: "July" },
  { key: "8", label: "August" },
  { key: "9", label: "September" },
  { key: "10", label: "October" },
  { key: "11", label: "November" },
  { key: "12", label: "December" },
];

export const yearRange = Array.from({ length: 200 }, (_, i) => ({
  key: String(i + 1900),
  label: String(i + 1900),
}));
