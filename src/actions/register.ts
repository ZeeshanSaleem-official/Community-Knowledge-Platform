"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getDataSource } from "@/db/connect";
import { User } from "@/entities";

interface registerFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/,
      {
        message:
          "Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&). No spaces allowed.",
      }
    ),
});

export async function register(
  formState: registerFormState,
  formData: FormData
): Promise<registerFormState> {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  const db = await getDataSource();
  if (!db) {
    return {
      errors: {
        _form: ["Something went wrong with the database connection"],
      },
    };
  }
  const userRepo = db.getRepository(User);
  const existingUser = await userRepo.findOne({
    where: { email: result.data.email },
  });
  if (existingUser) {
    return {
      errors: {
        email: ["Email is already in use"],
        _form: ["Registration failed"],
      },
    };
  }
  const hashPassword = await bcrypt.hash(result.data.password, 10);
  try {
    await userRepo.save({
      name: result.data.name,
      email: result.data.email,
      password: hashPassword,
      image: "",
    });
  } catch (err) {
    return {
      errors: {
        _form: ["Something went wrong with Account Creation"],
      },
    };
  }
  redirect("/");

  return {
    errors: {},
  };
}
