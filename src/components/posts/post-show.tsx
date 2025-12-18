import { getDataSource } from "@/db/connect";
import { Post } from "@/entities/Post";
import { notFound } from "next/navigation";
interface PostShowProps {
  postId: string;
}

export default async function ShowPost({ postId }: PostShowProps) {
  const db = await getDataSource();
  const postRepo = db.getRepository(Post);
  const post = await postRepo.findOne({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
