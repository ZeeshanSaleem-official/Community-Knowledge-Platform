"use client";

import { useActionState } from "react";
import * as actions from "@/actions/register";
import * as authActions from "@/actions/sign-in"; // Import the SignIn action for GitHub
import { Button, Divider } from "@nextui-org/react";

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(actions.register, {
    errors: {},
  });

  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-white w-full max-w-md shadow-sm">
      <h2 className="text-xl font-bold">Create an Account</h2>

      {/* Manual Sign Up Form */}
      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Name</label>
          <input
            name="name"
            placeholder="Name"
            className="border p-2 rounded bg-gray-50"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-xs">
              {state.errors.name.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            name="email"
            placeholder="Email"
            className="border p-2 rounded bg-gray-50"
          />
          {state.errors?.email && (
            <p className="text-red-500 text-xs">
              {state.errors.email.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Password</label>
          <input
            name="password"
            type="password"
            placeholder="******"
            className="border p-2 rounded bg-gray-50"
          />
          {state.errors?.password && (
            <p className="text-red-500 text-xs">
              {state.errors.password.join(", ")}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Profile Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="border p-2 rounded bg-gray-50 text-sm"
          />
        </div>

        {state.errors?._form && (
          <p className="text-red-500 text-sm">
            {state.errors._form.join(", ")}
          </p>
        )}

        <Button
          isLoading={isPending}
          type="submit"
          color="success"
          className="text-white"
        >
          Sign Up
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-2">
        <Divider className="flex-1" />
        <span className="text-gray-400 text-sm">OR</span>
        <Divider className="flex-1" />
      </div>

      {/* GitHub Sign Up Button */}
      <form action={authActions.SignIn}>
        <Button
          isLoading={isPending}
          type="submit"
          variant="bordered"
          className="w-full"
        >
          Sign up with GitHub
        </Button>
      </form>
    </div>
  );
}
