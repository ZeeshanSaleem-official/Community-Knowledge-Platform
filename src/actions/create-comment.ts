"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import paths from "@/path";
import { auth } from "@/auth";
import { getDataSource } from "@/db/connect";

const createCommentSchema = z.object({
  content: z.string().min(5),
});

interface createCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  {
    postId,
    parentId,
  }: {
    postId: string;
    parentId: string;
  },
  formState: createCommentFormState,
  formData: FormData
): Promise<createCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  try {
    const db = await getDataSource();

    // RAW SQL: Get topic slug without using getRepository
    const topicResult = await db.query(
      `SELECT t.slug FROM topics t 
       INNER JOIN posts p ON p."topicId" = t.id 
       WHERE p.id = $1`,
      [postId]
    );

    if (!topicResult || topicResult.length === 0) {
      return {
        errors: {
          _form: ["Cannot find topic"],
        },
      };
    }

    const topicSlug = topicResult[0].slug;

    // RAW SQL: Insert comment without using getRepository(Comment)
    await db.query(
      `INSERT INTO comments (id, content, "postId", "userId", "parentId", "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())`,
      [result.data.content, postId, session.user.id, parentId || null]
    );

    revalidatePath(paths.postShow(topicSlug, postId));
    return {
      errors: {},
      success: true,
    };
  } catch (err) {
    console.error("Failed to create comment:", err);

    if (err instanceof Error) {
      return {
        errors: { _form: [err.message] },
      };
    } else {
      return {
        errors: { _form: ["Something went wrong saving the comment."] },
      };
    }
  }
}