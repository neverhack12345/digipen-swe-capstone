"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, permanentRedirect } from "next/navigation";
import { AddBudget } from "@/types/definitions";

const LOGIN_TAG = "isLoggedin";

export async function addBudget(formData: AddBudget) {
    try {
        const response = await fetch('http://localhost:8080/api/budget/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
        } else {
          const errorData = await response.json();
          console.log(errorData.message || 'There was an error submitting the form.');
        }
    } catch (error) {
        console.log('There was an error submitting the form.');
        console.error('Form submission error:', error);
    }
    revalidatePath("/budget")
    redirect("/budget")
}

export async function deleteBudget(budgetId: any) {
  try {
      const response = await fetch(`http://localhost:8080/api/budget/delete?id=${budgetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.log(errorData.message || 'There was an error submitting the form.');
      }
  } catch (error) {
      console.log('There was an error submitting the form.');
      console.error('Form submission error:', error);
  }
  revalidatePath("/budget")
  permanentRedirect("/budget")
}

export async function editBudget(formData: { budgetId: string | null; categoryId: string 
  | null; year: string | null; month: string | null; amount: string | null; }) {
    console.log(formData);
  try {
      const response = await fetch('http://localhost:8080/api/budget/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.log(errorData.message || 'There was an error submitting the form.');
      }
  } catch (error) {
      console.log('There was an error submitting the form.');
      console.error('Form submission error:', error);
  }
  revalidatePath("/budget")
  redirect("/budget")
}

export async function sampleAPI(formData: FormData) {
    // const response = await fetch('/api/submit', {
    //     method: 'POST',
    //     body: formData,
    //   })
    // revalidatePath("/signup")
    // redirect("/login");
}

export async function createUser(formData: FormData) {
    revalidatePath("/signup")
    redirect("/login");
}

export async function authenticateUser(formData: FormData) {
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