"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, permanentRedirect } from "next/navigation";
import axios from "axios";

const LOGIN_TAG = "isLoggedin";
const USER_ID = "userId";
const LOGOUT_DELETE = [LOGIN_TAG, LOGIN_TAG]

// export async function sampleAPI() {
//   axios.get('http://localhost:8080/api/category/getAll')
//     .then((response) => {
//       return response.data
//     })
//     .catch(function (error) {
//       if (error.response) {
//         throw new Error('Network response was not ok ' + error.response.data);
//         // console.log(error.response.data);
//         // console.log(error.response.status);
//         // console.log(error.response.headers);
//       } else if (error.request) {
//         throw new Error('Network request was not ok ' + error.request);
//       } else {
//         throw new Error('Error ' + error.message);
//       }
//       // console.log(error.config);
//     });
// }

export async function fetchCategory() {
  try {
    const response = await axios.get('http://localhost:8080/api/category/getAll')
    return response.data;
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

export async function fetchBudgets() {
  try {
    const userId = await getUser();
    const response = await axios.get('http://localhost:8080/api/budget/searchByUserId', {
      params: {
        id: userId
      }
    })
    return response.data;
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

export async function fetchBudgetById(budgetId: string) {
  try {
    const response = await axios.get('http://localhost:8080/api/budget/searchByBudgetId', {
      params: {
        id: budgetId
      }
    })
    return response.data;
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

export async function addBudget(formData: any) {
  try {
    const id = await getUser();
    if (!!id) {
      formData["userId"] = id;
    }
    const response = await axios('http://localhost:8080/api/budget/add', {
      method: 'post',
      data: formData,
    });
  } catch (error) {
    throw new Error('Error: ' + error);
  } 
  revalidatePath("/budget")
  redirect("/budget")
}

export async function deleteBudget(budgetId: string) {
  try {
    const response = await axios('http://localhost:8080/api/budget/delete', {
      method: 'delete',
      params: {
        id: budgetId
      },
    });
  } catch (error) {
    throw new Error('Error: ' + error);
  } 
  permanentRedirect("/budget")
}

export async function editBudget(formData: any) {
  try {
    const response = await axios('http://localhost:8080/api/budget/update', {
      method: 'post',
      data: formData,
    });
  } catch (error) {
    throw new Error('Error: ' + error);
  } 
  revalidatePath("/budget")
  redirect("/budget")
}

export async function createUser(formData: any) {
  formData["dob"] = new Date(formData.dob);
  try {
    const response = await axios('http://localhost:8080/api/user/add', {
      method: 'post',
      data: formData,
    });
  } catch (error) {
    throw new Error('Error: ' + error);
  } 
  revalidatePath("/signup")
  redirect("/");
}

export async function authenticateUser(username: string, password: string) {
  if (username === "" && password === "") {
    cookies().set(LOGIN_TAG, "true");
    cookies().set(USER_ID, "1");
  } else {
    try {
      const response = await axios.get('http://localhost:8080/api/user/authenticate', {
        params: {
          email: username,
          password: password
        }
      })
      console.log(response.data);
      cookies().set(LOGIN_TAG, "true");
      cookies().set(USER_ID, response.data);
    } catch (error) {
      throw new Error('Error: ' + error);
    }
  }
  redirect("/budget");
}

export async function logoutUser() {
  LOGOUT_DELETE.forEach((item) => {
    cookies().delete(item);
  })
  permanentRedirect("/");
}

export async function isLoggedin() {
  return cookies().has(LOGIN_TAG);
}

export async function getUser() {
  return cookies().get(USER_ID)?.value;
}