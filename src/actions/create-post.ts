"use server";

import { z } from "zod";
import { getDataSource } from "@/db/connect";
import { Post } from "@/entities/Post";
import { revalidatePath } from "next/cache";
import path from "@/path";
import { auth } from "@/auth";
import { Topic } from "@/entities/Topic";
import { redirect } from "next/navigation";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});
interface createPostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function createPost(
  slug: string,
  formState: createPostFormState,
  formData: FormData
): Promise<createPostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
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
        _form: ["You must be signed in to create a post"],
      },
    };
  }

  const db = await getDataSource();
  const posts = db.getRepository(Topic);

  const topic = await posts.findOne({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      },
    };
  }
  const postRepo = db.getRepository(Post);
  let post: Post;
  try {
    post = await postRepo.save({
      title: result.data.title,
      content: result.data.content,
      userId: session.user.id,
      topicId: (await topic).id,
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
          _form: ["Failed to create Post"],
        },
      };
    }
  }
  // TODO: REVALIDATE on  topic show as well as home page(but time based)
  revalidatePath(path.topicShow(slug));
  redirect(path.postShow(slug, post.id));
}
