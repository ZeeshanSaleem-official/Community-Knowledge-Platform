import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Flame } from "lucide-react";

export default async function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
      {/* Main Feed */}
      <div className="col-span-1 md:col-span-3 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-500" />
          <h1 className="text-2xl font-bold tracking-tight">Top Posts</h1>
        </div>
        <PostList fetchData={fetchTopPosts} />
      </div>

      {/* Sidebar */}
      <div className="col-span-1 space-y-6 sticky top-24 h-fit">
        <div className="rounded-xl border bg-content1 shadow-sm p-4 flex flex-col gap-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Create Topic
          </h3>
          <p className="text-sm text-default-500">
            Start a new community and discuss your favorite subjects!
          </p>
          <TopicCreateForm />
        </div>

        <div className="rounded-xl border bg-content1 shadow-sm p-4">
          <h3 className="font-semibold text-lg mb-4">Popular Communities</h3>
          <TopicList />
        </div>
      </div>
    </div>
  );
}
