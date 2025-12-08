"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { getDataSource } from "@/db/connect";
import { Topic } from "@/entities/Topic";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "@/path";
interface createTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces.",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
});
export async function createTopic(
  formState: createTopicFormState,
  formData: FormData
): Promise<createTopicFormState> {
  // TODO: REVALIDATE on HOME PAGE

  await new Promise((resolve) => setTimeout(resolve, 2500));
  const result = createTopicSchema.safeParse({
    name: formData.get("Name"),
    description: formData.get("Description"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in "],
      },
    };
  }
  const db = await getDataSource();
  if (!db) {
    return {
      errors: {
        _form: ["Error while intializing connection"],
      },
    };
  }
  const topicRepo = db.getRepository(Topic);
  let topic: Topic;
  try {
    topic = await topicRepo.save({
      slug: result.data.name,
      description: result.data.description,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(path.topicShow(topic.slug));
  return {
    errors: {},
  };
}
