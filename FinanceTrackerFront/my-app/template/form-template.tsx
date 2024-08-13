// "use client";

// import { getLocalTimeZone, today } from "@internationalized/date";
// import { Button } from "@nextui-org/button";
// import { Card, CardBody } from "@nextui-org/card";
// import { Input } from "@nextui-org/input";
// import { Divider } from "@nextui-org/divider";
// import { Select, SelectItem } from "@nextui-org/select";
// import { DatePicker } from "@nextui-org/date-picker";
// import { FormEvent } from "react";

// import { sampleAPI } from "@/app/api/route";

// export default function FormTemplate() {
//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     await sampleAPI(formData);
//   }
//   const gender = [
//     { key: "unkown", label: "N/A" },
//     { key: "female", label: "F" },
//     { key: "male", label: "M" },
//   ];

//   return (
//     <Card
//       isBlurred
//       className="border-solid border-indigo-500 bg-background/60 dark:bg-default-100/50 max-w-[610px]"
//       shadow="sm"
//     >
//       <CardBody>
//         <Divider />
//         <form className="space-y-3" onSubmit={onSubmit}>
//           <div
//             aria-atomic="true"
//             aria-live="polite"
//             className="flex items-end space-x-1"
//           />
//           <p className="text-primary">Sign-up</p>
//           <div className="w-full flex-wrap gap-4">
//             <Input
//               color="default"
//               label="Email"
//               placeholder="Enter your email"
//               radius="full"
//               size="md"
//               type="Email"
//               variant="bordered"
//             />
//             <Input
//               color="default"
//               label="Password"
//               placeholder="Enter your password"
//               radius="full"
//               size="md"
//               type="Password"
//               variant="bordered"
//             />
//             <Input
//               color="default"
//               label="First Name"
//               placeholder="Enter your first name"
//               radius="full"
//               size="md"
//               type="Text"
//               variant="bordered"
//             />
//             <Input
//               color="default"
//               label="Last Name"
//               placeholder="Enter your last name"
//               radius="full"
//               size="md"
//               type="Text"
//               variant="bordered"
//             />
//             <DatePicker
//               color="default"
//               label="Birthday"
//               maxValue={today(getLocalTimeZone())}
//               radius="full"
//               size="md"
//               variant="bordered"
//             />
//             <Select
//               className="max-w-xs"
//               color="default"
//               items={gender}
//               label="Gender"
//               placeholder="Select an gender"
//               radius="full"
//               size="md"
//               variant="bordered"
//             >
//               {(gender) => (
//                 <SelectItem key={gender.key}>{gender.label}</SelectItem>
//               )}
//             </Select>
//           </div>
//           <div className="w-full flex-wrap">
//             <Button
//               className="w-full"
//               color="primary"
//               radius="full"
//               size="md"
//               type="submit"
//               variant="solid"
//             >
//               Sign-up
//             </Button>
//           </div>
//         </form>
//         <Divider />
//       </CardBody>
//     </Card>
//   );
// }
