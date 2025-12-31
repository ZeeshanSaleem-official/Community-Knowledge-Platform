import LoginForm from "@/components/auth/login-form";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
