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
      <div className="space-y-2 mt-2">
        <Textarea
          name="content"
          labelPlacement="outside"
          placeholder="What are your thoughts?"
          errorMessage={formState.errors.content?.join(", ")}
          isInvalid={!!formState.errors.content}
          minRows={2}
        />
        {formState.errors._form ? (
          <div className="p-2 bg-danger/10 border rounded-lg border-danger-200 text-danger text-sm">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <Button type="submit" isLoading={isPending} color="primary" variant="flat" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
  return (
    <div className="mt-2">
      <Button size="sm" variant="light" color="default" className="text-default-500 font-medium" onClick={() => setOpen(!open)}>
        {open ? "Cancel" : "Reply"}
      </Button>
      {open && form}
    </div>
  );
}
