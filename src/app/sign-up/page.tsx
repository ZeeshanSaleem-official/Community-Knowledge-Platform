import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}
