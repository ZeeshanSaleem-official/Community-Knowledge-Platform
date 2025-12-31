"use client";

import { useActionState } from "react";
import * as actions from "@/actions/sign-in";
// Optional: Use NextUI Divider and Button
import { Button, Divider } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [state, action] = useActionState(actions.SignInCredentials, {
    errors: {},
  });
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-white w-full max-w-md shadow-sm">
      <h2 className="text-xl font-bold">Sign In</h2>
      {isRegistered && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm">
          <span className="block sm:inline">
            Registration successful! Please sign in.
          </span>
        </div>
      )}

      {/* 1. Existing Credentials Form */}
      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            name="email"
            placeholder="name@example.com"
            className="border p-2 rounded bg-gray-50"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Password</label>
          <input
            name="password"
            type="password"
            placeholder="******"
            className="border p-2 rounded bg-gray-50"
            required
          />
        </div>

        {state?.error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {state.error}
          </div>
        )}

        <Button type="submit" color="primary">
          Login
        </Button>
      </form>

      {/* 2. Divider */}
      <div className="flex items-center gap-4 my-2">
        <Divider className="flex-1" />
        <span className="text-gray-400 text-sm">OR</span>
        <Divider className="flex-1" />
      </div>

      {/* 3. GitHub Button  */}
      <form action={actions.SignIn}>
        <Button type="submit" variant="bordered" className="w-full">
          Sign in with GitHub
        </Button>
      </form>
    </div>
  );
}
