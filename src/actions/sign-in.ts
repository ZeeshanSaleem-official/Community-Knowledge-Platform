"use server";
import * as auth from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function SignIn() {
  return auth.signIn("github");
}
export async function SignInCredentials(prevState: any, formData: FormData) {
  try {
    await auth.signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
    revalidatePath("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
