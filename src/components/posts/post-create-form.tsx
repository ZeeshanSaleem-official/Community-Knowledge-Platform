"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  Input,
  Divider,
} from "@nextui-org/react";
import { useActionState } from "react";
import * as actions from "@/actions";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {} as any,
    }
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary"> Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-bold">Create a Post</h3>
            <Divider />
            <Input
              name="title"
              label="Title"
              placeholder="Enter a title..."
              labelPlacement="outside"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              placeholder="What are your thoughts?"
              labelPlacement="outside"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded-lg p-3 bg-danger/10 border border-danger-200 text-danger text-sm">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <Button type="submit" isLoading={isPending} color="primary" variant="shadow">
              Create Post
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
