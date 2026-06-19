"use client";
import React from "react";
import { Form, TextField, Label, Input, FieldError, Button, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { showToastError, showToastSuccess } from "@/components/Toasts";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Extract values using FormData as per your component structure
    const Data = new FormData(e.target);
    const Formdata = Object.fromEntries(Data.entries());

    // BetterAuth Login Logic
    const { data, error } = await authClient.signIn.email({
      email: Formdata.email, // required
      password: Formdata.password, // required
    })
    if (error) {
      showToastError(error.message || "Sign in failed. Please check your credentials.");
      return;
    } else {
      showToastSuccess("Signed in successfully!");
      router.push("/");
    }


  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log("Google Sign In Response:", data);
  };

  // Shared Styles
  const labelStyle = "text-sm text-[#8E8E93]";
  const errorStyle = "text-red-500 text-xs mt-1 block";
  const inputClasses = {
    inputWrapper: "border-[#232326] bg-[#0F0F11] hover:border-zinc-700 focus-within:!border-white data-[invalid=true]:!border-red-500 transition-colors",
    input: "text-white"
  };

  return (
    <div className="bg-[#09090B] min-h-screen flex flex-col justify-center items-center p-6 font-sans text-white">

      <div className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#3A3AF4] mb-8">
        <span>▪</span>
        <span className="text-[#8E8E93] uppercase font-semibold">Welcome Back</span>
        <span>▪</span>
      </div>

      <div className="w-full max-w-md bg-[#141416] border border-[#232326] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-medium tracking-tight mb-2">Sign in to your account</h2>
        <p className="text-[#8E8E93] text-sm mb-8">Enter your details to access your dashboard.</p>

        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!value || !value.trim()) return "Email is required to sign in.";
              return null;
            }}
            className="w-full flex flex-col gap-1.5"
          >
            <Label className={labelStyle}>Email</Label>
            <Input variant="bordered" placeholder="name@example.com" classnames={inputClasses} />
            <FieldError className={errorStyle} />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (!value || !value.trim()) return "Please enter your password.";
              return null;
            }}
            className="w-full flex flex-col gap-1.5"
          >
            <Label className={labelStyle}>Password</Label>
            <Input variant="bordered" placeholder="Enter your password" classnames={inputClasses} />
            <FieldError className={errorStyle} />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-white text-black font-medium text-sm py-6 rounded-xl mt-2 hover:bg-[#E5E5EA]"
          >
            Sign In
          </Button>
        </Form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#232326]"></div>
          <span className="text-xs text-[#8E8E93]">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-[#232326]"></div>
        </div>

        <Button
          variant="bordered"
          onPress={handleGoogleLogin}
          className="w-full bg-[#1D1D20] border-[#232326] text-white py-6 rounded-xl hover:bg-[#2C2C2E] hover:border-zinc-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </Button>

        <p className="text-center text-sm text-[#8E8E93] mt-8">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:text-[#BF5AF2] text-sm font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}