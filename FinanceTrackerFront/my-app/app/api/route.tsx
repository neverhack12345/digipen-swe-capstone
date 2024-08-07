"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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
    cookies().set("isLoggedin", "true")
    revalidatePath("/login")
    redirect("/category");
}

export async function logoutUser() {
    // cookies().delete("isLoggedin");
    // revalidatePath("/")
    // redirect("/login");
}