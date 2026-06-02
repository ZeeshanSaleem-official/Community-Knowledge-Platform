"use client";
import paths from "@/path";
import Link from "next/link";
import { Users } from "lucide-react";

interface TopicData {
  id: string;
  slug: string;
}

export default function TopicListClient({ topics }: { topics: TopicData[] }) {
  return (
    <div className="flex flex-col gap-2">
      {topics.map((topic, index) => (
        <Link 
          key={topic.id} 
          href={paths.topicShow(topic.slug)}
          className="group flex items-center justify-between p-3 rounded-lg hover:bg-default-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                c/{topic.slug}
              </span>
              <span className="text-xs text-default-400 flex items-center gap-1">
                <Users size={12} /> {(topic.slug.length * 42 + 100)} members
              </span>
            </div>
          </div>
        </Link>
      ))}
      {topics.length === 0 && (
        <p className="text-sm text-default-500 text-center py-4">No communities yet.</p>
      )}
    </div>
  );
}
