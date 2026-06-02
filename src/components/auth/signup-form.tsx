"use client";

import { useActionState } from "react";
import * as actions from "@/actions/register";
import * as authActions from "@/actions/sign-in"; // Import the SignIn action for GitHub
import { Button, Divider, Input, Card, CardHeader, CardBody } from "@nextui-org/react";

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(actions.register, {
    errors: {},
  });

  return (
    <Card className="w-full max-w-md shadow-sm border border-divider">
      <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-2 items-start">
        <h2 className="text-xl font-bold">Create an Account</h2>
      </CardHeader>

      <CardBody className="px-6 pb-6 pt-2">
        {/* Manual Sign Up Form */}
        <form action={action} className="flex flex-col gap-4">
          <Input
            name="name"
            label="Name"
            placeholder="John Doe"
            labelPlacement="outside"
            isInvalid={!!state.errors?.name}
            errorMessage={state.errors?.name?.join(", ")}
            variant="bordered"
          />

          <Input
            name="email"
            label="Email"
            placeholder="name@example.com"
            labelPlacement="outside"
            isInvalid={!!state.errors?.email}
            errorMessage={state.errors?.email?.join(", ")}
            variant="bordered"
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            labelPlacement="outside"
            isInvalid={!!state.errors?.password}
            errorMessage={state.errors?.password?.join(", ")}
            variant="bordered"
          />

          <div className="flex flex-col gap-2 mt-1">
            <label className="text-sm font-medium text-foreground-500">Profile Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="border border-divider p-2 rounded-lg bg-content2 text-sm text-default-700 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-colors cursor-pointer"
            />
          </div>

          {state.errors?._form && (
            <div className="bg-danger/10 text-danger p-3 rounded-lg text-sm border border-danger-200 mt-2">
              {state.errors._form.join(", ")}
            </div>
          )}

          <Button
            isLoading={isPending}
            type="submit"
            color="primary"
            variant="shadow"
            className="mt-2 font-medium"
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <Divider className="flex-1" />
          <span className="text-default-400 text-sm">OR</span>
          <Divider className="flex-1" />
        </div>

        {/* GitHub Sign Up Button */}
        <form action={authActions.SignIn}>
          <Button
            type="submit"
            variant="flat"
            color="default"
            className="w-full font-medium"
          >
            Sign up with GitHub
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
