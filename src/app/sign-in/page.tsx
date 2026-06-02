import LoginForm from "@/components/auth/login-form";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-background">
      <div className="w-full max-w-md">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
