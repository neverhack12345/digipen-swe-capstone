"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, permanentRedirect } from "next/navigation";
import { AddBudget, EditBudget } from "@/types/definitions";

const LOGIN_TAG = "isLoggedin";
const USER_ID = "userId";

export async function fetchBudgets() {
  try {
    const response = await fetch('http://localhost:8080/api/budget/getAll');

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data; // Return the fetched data
    } else {
      throw new Error('Response data is not an array');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return []; // You can return null or any fallback value here
  }
}

export async function addBudget(formData: AddBudget) {
    try {
        const response = await fetch('http://localhost:8080/api/budget/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            [USER_ID]: cookies().get(USER_ID),
          },),
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

export async function editBudget(formData: EditBudget) {
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

export async function createUser() {
    revalidatePath("/signup")
    redirect("/login");
}

export async function authenticateUser() {
    cookies().set(LOGIN_TAG, "true")
    cookies().set(USER_ID, "1")
    revalidatePath("/login")
    redirect("/category");
}

export async function logoutUser() {
    cookies().delete(LOGIN_TAG);
    cookies().delete(USER_ID);
    revalidatePath("/")
    redirect("/login");
}

export async function isLoggedin() {
    return cookies().has(LOGIN_TAG);
}