import { Post } from "@/entities/Post";
import { getDataSource } from "../connect";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
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
    .addSelect(["u.name"])
    .where("topic.slug = :slug", { slug })
    .loadRelationCountAndMap("post.commentsCount", "post.comments")
    .getMany() as Promise<PostWithData[]>;
}
