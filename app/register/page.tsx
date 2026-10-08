"use client";

import type React from "react";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Password validation
  const passwordRequirements = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isPasswordValid) {
      setError("Please meet all password requirements");
      setLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Auto sign in after successful registration
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/dashboard");
        }
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      setError("Failed to sign in with Google");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border border-neutral-200 bg-white shadow-none rounded-none">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-black mb-2">
              Registration Successful!
            </h2>
            <p className="text-neutral-600 mb-6 text-sm">
              Your account has been created successfully. You're being signed
              in...
            </p>
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-black" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-serif font-bold text-black">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card className="border border-neutral-200 bg-white shadow-none rounded-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-serif text-black">
              Join The Black Silk
            </CardTitle>
            <CardDescription className="text-center text-neutral-500">
              Create your account to access exclusive legal tech content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="rounded-none border-black bg-neutral-900 text-white">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-black"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-neutral-600 mb-1">
                      Password must contain:
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div
                        className={`flex items-center ${
                          passwordRequirements.length
                            ? "text-black font-medium"
                            : "text-neutral-400"
                        }`}
                      >
                        {passwordRequirements.length ? (
                          <Check className="h-3 w-3 mr-1 text-black" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        8+ characters
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordRequirements.uppercase
                            ? "text-black font-medium"
                            : "text-neutral-400"
                        }`}
                      >
                        {passwordRequirements.uppercase ? (
                          <Check className="h-3 w-3 mr-1 text-black" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        Uppercase
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordRequirements.lowercase
                            ? "text-black font-medium"
                            : "text-neutral-400"
                        }`}
                      >
                        {passwordRequirements.lowercase ? (
                          <Check className="h-3 w-3 mr-1 text-black" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        Lowercase
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordRequirements.number
                            ? "text-black font-medium"
                            : "text-neutral-400"
                        }`}
                      >
                        {passwordRequirements.number ? (
                          <Check className="h-3 w-3 mr-1 text-black" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        Number
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordRequirements.special
                            ? "text-black font-medium"
                            : "text-neutral-400"
                        }`}
                      >
                        {passwordRequirements.special ? (
                          <Check className="h-3 w-3 mr-1 text-black" />
                        ) : (
                          <X className="h-3 w-3 mr-1" />
                        )}
                        Special char
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs uppercase font-mono tracking-wider text-neutral-700">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 rounded-none border-neutral-300 focus-visible:ring-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-black"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div
                    className={`text-xs flex items-center ${
                      passwordsMatch ? "text-black font-medium" : "text-neutral-500"
                    }`}
                  >
                    {passwordsMatch ? (
                      <Check className="h-3 w-3 mr-1 text-black" />
                    ) : (
                      <X className="h-3 w-3 mr-1" />
                    )}
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-black !text-white hover:bg-neutral-800 rounded-none h-11 text-sm font-medium tracking-wide uppercase"
                disabled={loading || !isPasswordValid || !passwordsMatch}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-400 font-mono">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full rounded-none border-neutral-300 hover:bg-neutral-50 h-11 text-sm font-medium"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="text-xs text-neutral-500 text-center">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-black">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-black">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
