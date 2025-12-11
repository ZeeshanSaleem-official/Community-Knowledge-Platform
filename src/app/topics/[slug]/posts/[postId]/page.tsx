import Link from "next/link";
import ShowPost from "@/components/posts/post-show";
import paths from "@/path";

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
      {/* <ShowPost /> */}
      {/* <CommentCreateForm postId={postId} startOpen /> */}
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}
