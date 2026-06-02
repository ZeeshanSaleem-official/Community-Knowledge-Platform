import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentShowProps {
  commentId: string;
  // comments: CommentWithAuthor[];
  postId: string;
}

// TODO: Get a list of comments
export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow
        key={child.id}
        commentId={child.id}
        postId={postId}
      // comments={comments}
      />
    );
  });

  return (
    <div className="p-3 border-l-2 border-divider mt-2 bg-content1/50 rounded-r-xl">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || `https://ui-avatars.com/api/?name=${comment.user.name || 'User'}&background=random`}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-2">
          <p className="text-sm font-semibold text-default-700">
            {comment.user.name}
          </p>
          <p className="text-default-800 text-sm">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
