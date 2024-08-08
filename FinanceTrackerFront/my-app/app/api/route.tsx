"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LOGIN_TAG = "isLoggedin";

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
    cookies().set(LOGIN_TAG, "true")
    revalidatePath("/login")
    redirect("/category");
}

export async function logoutUser() {
    cookies().delete(LOGIN_TAG);
    revalidatePath("/")
    redirect("/login");
}

export async function isLoggedin() {
    return cookies().has(LOGIN_TAG);
}