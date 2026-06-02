import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import fetchPostsByTopicSlug from "@/db/queries/posts";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
      <div className="md:col-span-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-default-900 mb-2 tracking-tight">c/{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div className="md:col-span-4 flex flex-col gap-6">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
