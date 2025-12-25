import { Post } from "@/entities/Post";
import { getDataSource } from "../connect";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null; image: string | null };
  commentsCount: number;
};

export default async function fetchPostsByTopicSlug(
  slug: string
): Promise<PostWithData[]> {
  const db = await getDataSource();
  const PostRepo = db.getRepository(Post);

  return PostRepo.createQueryBuilder("post")
    .leftJoin("post.topic", "topic")
    .addSelect(["topic.slug"])
    .leftJoin("post.user", "u")
    .addSelect(["u.name", "u.image"]) // Added image here too for consistency
    .where("topic.slug = :slug", { slug })
    .loadRelationCountAndMap("post.commentsCount", "post.comments")
    .getMany() as Promise<PostWithData[]>;
}

export async function fetchTopPosts(): Promise<PostWithData[]> {
  const db = await getDataSource();
  const PostRepo = db.getRepository(Post);

  const posts = (await PostRepo.createQueryBuilder("post")
    .leftJoin("post.topic", "topic")
    .addSelect(["topic.slug"])
    .leftJoin("post.user", "user")
    .addSelect(["user.name", "user.image"])
    .loadRelationCountAndMap("post.commentsCount", "post.comments")
    .getMany()) as PostWithData[];

  return posts.sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 3);
}
