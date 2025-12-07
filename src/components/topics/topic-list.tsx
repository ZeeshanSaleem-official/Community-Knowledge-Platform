import { Topic } from "@/entities/Topic";
import { getDataSource } from "@/db/connect";
import TopicListClient from "./topic-list-client";
export default async function TopicList() {
  const db = await getDataSource();
  const topicRepo = db.getRepository(Topic);
  const topics = await topicRepo.find();
  // Only pass id and slug to client
  const topicsData = topics.map((topic) => ({
    id: topic.id,
    slug: topic.slug,
  }));
  return <TopicListClient topics={topicsData} />;
}
