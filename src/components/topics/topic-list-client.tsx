"use client";
import paths from "@/path";
import { Divider } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
interface TopicData {
  id: string;
  slug: string;
}
export default function TopicListClient({ topics }: { topics: TopicData[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {topics.map((topic) => (
        <div key={topic.id}>
          <Link href={paths.topicShow(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  );
}
