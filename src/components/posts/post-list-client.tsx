"use client";

import { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/path";
import { Card, Avatar } from "@nextui-org/react";
import { MessageSquare, ArrowBigUp, ArrowBigDown } from "lucide-react";

interface PostListClientProps {
  posts: PostWithData[];
}

export default function PostListClient({ posts }: PostListClientProps) {
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <Card 
        key={post.id} 
        isPressable 
        isHoverable 
        className="w-full bg-content1 shadow-sm border border-divider mb-4 transition-all hover:-translate-y-1"
        as={Link} 
        href={paths.postShow(topicSlug, post.id)}
      >
        <div className="flex flex-row">
          {/* Vote Column */}
          <div className="w-12 flex flex-col items-center py-4 bg-default-50 border-r border-divider rounded-l-lg gap-1">
            <button className="text-default-400 hover:text-orange-500 transition-colors">
              <ArrowBigUp size={24} />
            </button>
            <span className="font-bold text-sm">{(post.id.length * 3 + 12) % 100}</span>
            <button className="text-default-400 hover:text-blue-500 transition-colors">
              <ArrowBigDown size={24} />
            </button>
          </div>
          
          {/* Content Column */}
          <div className="flex-1 flex flex-col p-4 gap-2">
            <div className="flex items-center gap-2 text-xs text-default-500">
              <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${post.user.id}`} />
              <span className="font-medium">c/{topicSlug}</span>
              <span>•</span>
              <span>Posted by u/{post.user.name}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground text-left">{post.title}</h3>
            
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-default-500 bg-default-100 px-2.5 py-1 rounded-full hover:bg-default-200 transition-colors">
                <MessageSquare size={14} />
                {post.commentsCount} Comments
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  });

  return <div className="space-y-4">{renderedPosts}</div>;
}
