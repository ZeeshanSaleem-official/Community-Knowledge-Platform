import { Comment } from "@/entities/Comment";
import { getDataSource } from "../connect";
import { cache } from "react";

export type CommentWithAuthor = {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
};

export const fetchCommentsByPostId = cache(
  async (postId: string): Promise<CommentWithAuthor[]> => {
    console.log("For the query");

    const db = await getDataSource();
    const CommentRepo = db.getRepository(Comment);
    const comments = await CommentRepo.createQueryBuilder("comment")
      .leftJoin("comment.user", "user")
      .addSelect(["user.name", "user.image"])
      .where("comment.postId = :postId", { postId })
      .getMany();

    // Serialize TypeORM entities to plain objects for Next.js Client Components
    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      userId: comment.userId,
      parentId: comment.parentId,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      user: {
        name: (comment as any).user?.name || null,
        image: (comment as any).user?.image || null,
      },
    }));
  }
);
