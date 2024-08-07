"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function sampleAPI(formData: FormData) {
    // const response = await fetch('/api/submit', {
    //     method: 'POST',
    //     body: formData,
    //   })
    // revalidatePath("/signup")
    // redirect("/login");
}

export async function createUser(formData: FormData) {
    // const response = await fetch('/api/submit', {
    //     method: 'POST',
    //     body: formData,
    //   })
    revalidatePath("/signup")
    redirect("/login");
}

export async function authenticateUser(formData: FormData) {
    // const response = await fetch('/api/submit', {
    //     method: 'POST',
    //     body: formData,
    //   })
    revalidatePath("/login")
    redirect("/category");
}