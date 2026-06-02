import { PostWithData } from "@/db/queries/posts";
import PostListClient from "./post-list-client";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  
  // Serialize TypeORM entities to plain JavaScript objects
  // This is required because Next.js cannot pass Class instances from Server to Client components.
  const serializedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    commentsCount: post.commentsCount,
    topic: {
      slug: post.topic.slug
    },
    user: {
      id: post.user.id,
      name: post.user.name
    }
  })) as PostWithData[];

  return <PostListClient posts={serializedPosts} />;
}
