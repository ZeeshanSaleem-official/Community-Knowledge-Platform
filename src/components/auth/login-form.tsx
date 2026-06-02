"use client";

import { useActionState } from "react";
import * as actions from "@/actions/sign-in";
// Optional: Use NextUI Divider and Button
import { Button, Divider, Input, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(actions.SignInCredentials, {
    errors: {},
  });
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  return (
    <Card className="w-full max-w-md shadow-sm border border-divider">
      <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-2 items-start">
        <h2 className="text-xl font-bold">Sign In</h2>
        {isRegistered && (
          <div className="bg-success/10 border border-success-400 text-success px-4 py-3 rounded-lg relative text-sm w-full mt-2">
            <span className="block sm:inline">
              Registration successful! Please sign in.
            </span>
          </div>
        )}
      </CardHeader>

      <CardBody className="px-6 pb-6 pt-2">
        {/* 1. Existing Credentials Form */}
        <form action={action} className="flex flex-col gap-4">
          <Input
            name="email"
            label="Email"
            placeholder="name@example.com"
            labelPlacement="outside"
            isRequired
            variant="bordered"
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            labelPlacement="outside"
            isRequired
            variant="bordered"
          />

          {state?.error && (
            <div className="bg-danger/10 text-danger p-3 rounded-lg text-sm border border-danger-200">
              {state.error}
            </div>
          )}

          <Button isLoading={isPending} type="submit" color="primary" variant="shadow">
            Login
          </Button>
        </form>

        {/* 2. Divider */}
        <div className="flex items-center gap-4 my-4">
          <Divider className="flex-1" />
          <span className="text-default-400 text-sm">OR</span>
          <Divider className="flex-1" />
        </div>

        {/* 3. GitHub Button  */}
        <form action={actions.SignIn}>
          <Button
            type="submit"
            variant="flat"
            color="default"
            className="w-full font-medium"
          >
            Sign in with GitHub
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
