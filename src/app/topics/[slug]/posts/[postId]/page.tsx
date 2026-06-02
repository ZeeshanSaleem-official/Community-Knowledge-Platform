import Link from "next/link";
import ShowPost from "@/components/posts/post-show";
import paths from "@/path";
import CommentCreateForm from "@/components/comments/comment-create-form";
// import { fetchCommentsByPostId } from "@/db/queries/comments";
import CommentList from "@/components/comments/comment-list";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";
interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <Link href={paths.topicShow(slug)} className="inline-block px-3 py-1.5 rounded-lg bg-content2 hover:bg-content3 text-default-500 font-medium text-sm transition-colors">
        {"< "}Back to c/{slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <ShowPost postId={postId} />
      </Suspense>
      <div className="mt-8 pt-4 border-t border-divider">
        <CommentCreateForm postId={postId} startOpen={true} />
        <CommentList postId={postId} />
      </div>
    </div>
  );
}
