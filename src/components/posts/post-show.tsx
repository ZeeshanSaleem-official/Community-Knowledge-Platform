import { getDataSource } from "@/db/connect";
import { Post } from "@/entities/Post";
import { notFound } from "next/navigation";
interface PostShowProps {
  postId: string;
}

export default async function ShowPost({ postId }: PostShowProps) {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const db = await getDataSource();
  const postRepo = db.getRepository(Post);
  const post = await postRepo.findOne({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }
  return (
    <div className="bg-content1 shadow-sm border border-divider rounded-xl overflow-hidden">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-default-900">{post.title}</h1>
      </div>
      <hr className="border-divider" />
      <div className="px-6 py-4">
        <p className="text-default-700 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
}


