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
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";
  const redirect = useRef(searchParams.get("redirect"));
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = React.useState<null | string>(null);

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data);
        if (redirect?.current) router.push(redirect.current);
        else router.push("/account");
      } catch (_) {
        setError(
          "There was an error with the credentials provided. Please try again.",
        );
      }
    },
    [login, router],
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Message className="classes.message mb-4" error={error} />
      <div className="space-y-5">
        <FormItem>
          <Label htmlFor="email" className="font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="rounded-xl h-12 px-4 shadow-sm"
            {...register("email", { required: "Email is required." })}
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-medium">
              Password
            </Label>
            <Link
              href={`/forgot-password${allParams}`}
              className="text-xs text-primary hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="rounded-xl h-12 px-4 shadow-sm mt-2"
            {...register("password", {
              required: "Please provide a password.",
            })}
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>
      </div>

      <div className="pt-4 space-y-4">
        <Button
          className="w-full rounded-xl h-12 font-medium text-base shadow-sm"
          disabled={isLoading}
          size="lg"
          type="submit"
          variant="default"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">
              Or
            </span>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full rounded-xl h-12 font-medium text-base shadow-sm"
        >
          <Link href={`/create-account${allParams}`}>Create a new account</Link>
        </Button>
      </div>
    </form>
  );
};
