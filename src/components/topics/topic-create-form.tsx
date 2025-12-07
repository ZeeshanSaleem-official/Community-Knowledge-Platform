"use client";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className=" flex flex-col gap-4 p-4 w-80">
            <h3> Create a Topic</h3>
            <Input
              name="Name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            ></Input>
            <Textarea
              name="Description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your Topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.name?.join(", ")}
            ></Textarea>
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <Button isLoading={isPending} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
