"use client";
import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);

  // 1. Define the initial state with a Type Assertion ("as ...")
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    {
      errors: {},
      success: false,
    } as {
      errors: {
        content?: string[];
        _form?: string[];
      };
      success?: boolean;
    }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action}>
      <div>
        <Textarea
          label="Reply"
          name="content"
          labelPlacement="outside"
          // 2. Now TypeScript knows 'content' exists
          errorMessage={formState.errors.content?.join(", ")}
          isInvalid={!!formState.errors.content}
        ></Textarea>
        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <Button type="submit" isLoading={isPending}>
          Submit
        </Button>
      </div>
    </form>
  );
  return (
    <div>
      <div>
        <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
          Reply
        </Button>
        {open && form}
      </div>
    </div>
  );
}
