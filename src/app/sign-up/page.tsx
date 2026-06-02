import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-background">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}
