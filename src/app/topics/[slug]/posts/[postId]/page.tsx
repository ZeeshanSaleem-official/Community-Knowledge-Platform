import Link from "next/link";
import ShowPost from "@/components/posts/post-show";
import paths from "@/path";
import CommentCreateForm from "@/components/comments/comment-create-form";
import fetchCommentsByPostId from "@/db/queries/comments";
import CommentList from "@/components/comments/comment-list";
interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <ShowPost postId={postId} />
      <CommentCreateForm postId={postId} startOpen="true" />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}
