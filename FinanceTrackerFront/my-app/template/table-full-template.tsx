// "use client";

// import useSWR from "swr";
// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/table";
// import { Chip } from "@nextui-org/chip";
// import { User } from "@nextui-org/user";
// import { Pagination } from "@nextui-org/pagination";
// import { Input } from "@nextui-org/input";
// import { Button } from "@nextui-org/button";
// import {
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
// } from "@nextui-org/dropdown";

// import {
//   PlusIcon,
//   VerticalDotsIcon,
//   SearchIcon,
//   ChevronDownIcon,
// } from "@/template/resource/icons";
// import { columns, users, statusOptions } from "@/template/resource/data";
// import { capitalize } from "@/template/resource/utils";

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

// export default function FullTableTemplate() {
//   const [filterValue, setFilterValue] = React.useState("");
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
//   const [visibleColumns, setVisibleColumns] = React.useState(
//     new Set(INITIAL_VISIBLE_COLUMNS),
//   );
//   const [statusFilter, setStatusFilter] = React.useState("all");
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState({
//     column: "age",
//     direction: "ascending",
//   });
//   const [page, setPage] = React.useState(1);
//   const { data, error, isLoading } = useSWR("", fetch);

//   if (error) return <div>failed to load</div>;
//   if (isLoading) return <div>loading...</div>;

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     // if (visibleColumns === "all") return columns;
//     if (visibleColumns) return columns;

//     return columns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid),
//     );
//   }, [visibleColumns]);

//   const filteredItems = React.useMemo(() => {
//     let filteredUsers = [...users];

//     if (hasSearchFilter) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.name.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }
//     if (
//       statusFilter !== "all" &&
//       Array.from(statusFilter).length !== statusOptions.length
//     ) {
//       filteredUsers = filteredUsers.filter((user) =>
//         Array.from(statusFilter).includes(user.status),
//       );
//     }

//     return filteredUsers;
//   }, [users, filterValue, statusFilter]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a, b) => {
//       // const first = a[sortDescriptor.column];
//       // const second = b[sortDescriptor.column];
//       const first = a["age"];
//       const second = b["age"];
//       const cmp = first < second ? -1 : first > second ? 1 : 0;

//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const renderCell = React.useCallback(
//     (
//       user: {
//         [x: string]: any;
//         avatar: any;
//         email:
//           | string
//           | number
//           | bigint
//           | boolean
//           | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//           | Iterable<React.ReactNode>
//           | Promise<React.AwaitedReactNode>
//           | null
//           | undefined;
//         team:
//           | string
//           | number
//           | bigint
//           | boolean
//           | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//           | Iterable<React.ReactNode>
//           | React.ReactPortal
//           | Promise<React.AwaitedReactNode>
//           | null
//           | undefined;
//         status: string | number;
//       },
//       columnKey: string | number,
//     ) => {
//       const cellValue = user[columnKey];

//       switch (columnKey) {
//         case "name":
//           return (
//             <User
//               avatarProps={{ radius: "lg", src: user.avatar }}
//               description={user.email}
//               name={cellValue}
//             >
//               {user.email}
//             </User>
//           );
//         case "role":
//           return (
//             <div className="flex flex-col">
//               <p className="text-bold text-small capitalize">{cellValue}</p>
//               <p className="text-bold text-tiny capitalize text-default-400">
//                 {user.team}
//               </p>
//             </div>
//           );
//         case "status":
//           return (
//             // <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
//             <Chip
//               className="capitalize"
//               color="success"
//               size="sm"
//               variant="flat"
//             >
//               {cellValue}
//             </Chip>
//           );
//         case "actions":
//           return (
//             <div className="relative flex justify-end items-center gap-2">
//               <Dropdown>
//                 <DropdownTrigger>
//                   <Button isIconOnly size="sm" variant="light">
//                     <VerticalDotsIcon
//                       className="text-default-300"
//                       height={undefined}
//                       width={undefined}
//                     />
//                   </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu>
//                   <DropdownItem>View</DropdownItem>
//                   <DropdownItem>Edit</DropdownItem>
//                   <DropdownItem>Delete</DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           );
//         default:
//           return cellValue;
//       }
//     },
//     [],
//   );

//   const onNextPage = React.useCallback(() => {
//     if (page < pages) {
//       setPage(page + 1);
//     }
//   }, [page, pages]);

//   const onPreviousPage = React.useCallback(() => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   }, [page]);

//   const onRowsPerPageChange = React.useCallback(
//     (e: { target: { value: any } }) => {
//       setRowsPerPage(Number(e.target.value));
//       setPage(1);
//     },
//     [],
//   );

//   const onSearchChange = React.useCallback(
//     (value: React.SetStateAction<string>) => {
//       if (value) {
//         setFilterValue(value);
//         setPage(1);
//       } else {
//         setFilterValue("");
//       }
//     },
//     [],
//   );

//   const onClear = React.useCallback(() => {
//     setFilterValue("");
//     setPage(1);
//   }, []);

//   const topContent = React.useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             className="w-full sm:max-w-[44%]"
//             placeholder="Search by name..."
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={() => onClear()}
//             onValueChange={onSearchChange}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Status
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 // onSelectionChange={setStatusFilter}
//               >
//                 {statusOptions.map((status) => (
//                   <DropdownItem key={status.uid} className="capitalize">
//                     {capitalize(status.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 // onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((column) => (
//                   <DropdownItem key={column.uid} className="capitalize">
//                     {capitalize(column.name)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Button
//               color="primary"
//               endContent={<PlusIcon height={undefined} width={undefined} />}
//             >
//               Add New
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-default-400 text-small">
//             Total {users.length} users
//           </span>
//           <label className="flex items-center text-default-400 text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-default-400 text-small"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [
//     filterValue,
//     statusFilter,
//     visibleColumns,
//     onRowsPerPageChange,
//     users.length,
//     onSearchChange,
//     hasSearchFilter,
//   ]);

//   const bottomContent = React.useMemo(() => {
//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <span className="w-[30%] text-small text-default-400">
//           {selectedKeys.keys.length === filteredItems.length
//             ? "All items selected"
//             : `${selectedKeys.size} of ${filteredItems.length} selected`}
//         </span>
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="primary"
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />
//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onPreviousPage}
//           >
//             Previous
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onNextPage}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

//   return (
//     <Table
//       isHeaderSticky
//       aria-label="Example table with custom cells, pagination and sorting"
//       bottomContent={bottomContent}
//       bottomContentPlacement="outside"
//       classNames={{
//         wrapper: "max-h-[382px]",
//       }}
//       selectedKeys={selectedKeys}
//       selectionMode="multiple"
//       // sortDescriptor={sortDescriptor}
//       topContent={topContent}
//       topContentPlacement="outside"
//       // onSelectionChange={setSelectedKeys}
//       // onSortChange={setSortDescriptor}
//     >
//       <TableHeader columns={headerColumns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === "actions" ? "center" : "start"}
//             allowsSorting={column.sortable}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody emptyContent={"No users found"} items={sortedItems}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => (
//               <TableCell>{renderCell(item, columnKey)}</TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
