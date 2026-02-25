"use client";

import { FormError } from "@/components/forms/FormError";
import { FormItem } from "@/components/forms/FormItem";
import { Message } from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );

    if (response.ok) {
      setSuccess(true);
      setError("");
    } else {
      setError(
        "There was a problem while attempting to send you a password reset email. Please try again.",
      );
    }
  }, []);

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              Forgot Password
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address to receive a secure password reset link.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Message className="mb-4" error={error} />

            <div className="space-y-4">
              <FormItem>
                <Label htmlFor="email" className="font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  className="rounded-xl h-12 px-4 shadow-sm"
                  {...register("email", {
                    required: "Please provide your email.",
                  })}
                  type="email"
                />
                {errors.email && <FormError message={errors.email.message} />}
              </FormItem>
            </div>

            <div className="pt-2 space-y-4">
              <Button
                type="submit"
                variant="default"
                className="w-full rounded-xl h-12 font-medium text-base shadow-sm"
              >
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </React.Fragment>
      )}

      {success && (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Success Icon"
            >
              <title>Success Icon</title>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-3">
            Check your email
          </h1>
          <p className="text-muted-foreground mb-8">
            We've sent a secure link to reset your password. Please check your
            inbox and spam folder.
          </p>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl h-12 font-medium text-base"
          >
            <Link href="/login">Return to login</Link>
          </Button>
        </div>
      )}
    </Fragment>
  );
};
