import PostCreateForm from "@/components/posts/post-create-form";

interface TopicShowPageProps {
  params: {
    slug;
  };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        </div>
        <div className="">
          <PostCreateForm slug={slug} />
        </div>
      </div>
    </>
  );
}
