"use client";

import { FormError } from "@/components/forms/FormError";
import { FormItem } from "@/components/forms/FormItem";
import { Message } from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/Auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
        {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        },
      );

      if (!response.ok) {
        const message =
          response.statusText || "There was an error creating the account.";
        setError(message);
        return;
      }

      const redirect = searchParams.get("redirect");

      const timer = setTimeout(() => {
        setLoading(true);
      }, 1000);

      try {
        await login(data);
        clearTimeout(timer);
        if (redirect) router.push(redirect);
        else
          router.push(
            `/account?success=${encodeURIComponent("Account created successfully")}`,
          );
      } catch (_) {
        clearTimeout(timer);
        setError(
          "There was an error with the credentials provided. Please try again.",
        );
      }
    },
    [login, router, searchParams],
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Message error={error} className="mb-4" />

      <div className="space-y-5">
        <FormItem>
          <Label htmlFor="email" className="font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            className="rounded-xl h-12 px-4 shadow-sm"
            {...register("email", { required: "Email is required." })}
            type="email"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="password" className="font-medium">
            New password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            className="rounded-xl h-12 px-4 shadow-sm"
            {...register("password", { required: "Password is required." })}
            type="password"
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="passwordConfirm" className="font-medium">
            Confirm Password
          </Label>
          <Input
            id="passwordConfirm"
            placeholder="••••••••"
            className="rounded-xl h-12 px-4 shadow-sm"
            {...register("passwordConfirm", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            type="password"
          />
          {errors.passwordConfirm && (
            <FormError message={errors.passwordConfirm.message} />
          )}
        </FormItem>
      </div>

      <div className="pt-4 space-y-4">
        <Button
          disabled={loading}
          type="submit"
          variant="default"
          className="w-full rounded-xl h-12 font-medium text-base shadow-sm"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={`/login${allParams}`}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
