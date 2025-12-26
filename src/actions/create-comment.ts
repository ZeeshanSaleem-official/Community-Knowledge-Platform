"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import paths from "@/path";
import { auth } from "@/auth";
import { getDataSource } from "@/db/connect";
import { Comment } from "@/entities/Comment";
import { Topic } from "@/entities/Topic";

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
  const db = await getDataSource();
  const TopicRepo = db.getRepository(Topic);
  const topic = await TopicRepo.findOne({
    where: { posts: { id: postId } },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }
  const commentRepo = await db.getRepository(Comment);
  let comment: Comment;
  try {
    comment = await commentRepo.save({
      content: result.data.content,
      postId: postId,
      parentId: parentId,
      userId: session.user.id,
    });
  } catch {}
  revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
