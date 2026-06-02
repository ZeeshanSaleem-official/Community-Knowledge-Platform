"use client";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Divider,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useActionState } from "react";
export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" fullWidth variant="shadow">Create a Community</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-bold">Create a Community</h3>
            <Divider />
            <Input
              name="Name"
              label="Name"
              labelPlacement="outside"
              placeholder="e.g. NextJS"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="Description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your community..."
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="rounded-lg p-3 bg-danger/10 border border-danger-200 text-danger text-sm">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <Button isLoading={isPending} type="submit" color="primary" variant="shadow">
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
