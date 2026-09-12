"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Turnstile } from "@/components/Turnstile";

export interface ChapterOption {
  slug: string;
  name: string;
  university?: string | null;
}

const DEFAULT_CHAPTERS: ChapterOption[] = [
  { slug: "seds-mora", name: "SEDS Mora", university: "University of Moratuwa" },
  { slug: "seds-pera", name: "SEDS Pera", university: "University of Peradeniya" },
  { slug: "seds-colombo", name: "SEDS Colombo", university: "University of Colombo" },
  { slug: "seds-jpura", name: "SEDS J'pura", university: "University of Sri Jayewardenepura" },
  { slug: "seds-kdu", name: "SEDS KDU", university: "General Sir John Kotelawala Defence University" },
  { slug: "seds-sliit", name: "SEDS SLIIT", university: "Sri Lanka Institute of Information Technology (SLIIT)" },
  { slug: "seds-ruhuna", name: "SEDS Ruhuna", university: "University of Ruhuna" },
  { slug: "seds-kelaniya", name: "SEDS Kelaniya", university: "University of Kelaniya" },
  { slug: "seds-sabra", name: "SEDS Sabra", university: "Sabaragamuwa University of Sri Lanka" },
  { slug: "seds-ousl", name: "SEDS OUSL", university: "Open University of Sri Lanka" },
  { slug: "seds-sltc", name: "SEDS SLTC", university: "SLTC Research University" },
  { slug: "seds-wayamba", name: "SEDS Wayamba", university: "Wayamba University of Sri Lanka" },
  { slug: "seds-yarl", name: "SEDS Yarl", university: "University of Jaffna" },
  { slug: "seds-ocean", name: "SEDS Ocean", university: "Ocean University of Sri Lanka" },
  { slug: "seds-junior", name: "SEDS Junior", university: "SEDS Sri Lanka National School Initiative" },
];

const joinSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  institution: z.string().min(2, "Institution / University is required"),
  chapter: z.string().min(1, "Please select a chapter"),
  statement: z
    .string()
    .min(10, "Please share why you want to join SEDS Sri Lanka"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must accept the Code of Conduct"),
});

export type JoinUsFormValues = z.infer<typeof joinSchema>;

interface JoinUsFormProps {
  chapters?: ChapterOption[];
}

export const JoinUsFormCodeBased: React.FC<JoinUsFormProps> = ({ chapters = DEFAULT_CHAPTERS }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JoinUsFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      chapter: "Independent / General Member (National / Non-Affiliated)",
      statement: "",
      terms: false,
    },
  });

  const selectedChapter = watch("chapter");

  const onSubmit = async (data: JoinUsFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          reasons: [
            "Membership Application",
            `Institution: ${data.institution}`,
            `Chapter: ${data.chapter || "N/A"}`,
          ],
          message: `Phone: ${data.phone || "N/A"}\nStatement: ${data.statement}`,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to submit application");
      }

      toast.success(
        "Membership application submitted successfully! A confirmation email has been sent.",
      );
      reset();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.message || "Failed to submit application. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayChapters = chapters.length > 0 ? chapters : DEFAULT_CHAPTERS;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
      {/* High-Tech Bleeding Grid Lines Container */}
      <div className="relative my-2">
        {/* Extended Horizontal Bleed Lines */}
        <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
        <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />

        {/* Extended Vertical Bleed Lines */}
        <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
        <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />
        <div className="hidden md:block absolute -top-6 -bottom-6 left-1/2 border-l border-border/40 pointer-events-none" />

        {/* Inner Segmented Grid Layout */}
        <div className="border border-border/60 divide-y divide-border/60 bg-background relative z-0">
          {/* Row 1: Full Name */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="fullName"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="e.g. Thawshi Srikanth"
              className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive mt-1 font-mono">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Row 2: Email & Phone side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="email"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1 font-mono">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="phone"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                Phone / WhatsApp Number
              </Label>
              <PhoneInput
                defaultCountry="LK"
                value={watch("phone") || ""}
                onChange={(val) => setValue("phone", val)}
                id="phone"
                className="w-full bg-transparent border-0 h-9 px-0"
              />
            </div>
          </div>

          {/* Row 3: University / Institution & Preferred Chapter side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="institution"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                University / Institution *
              </Label>
              <Input
                id="institution"
                placeholder="e.g. University of Moratuwa"
                className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
                {...register("institution")}
              />
              {errors.institution && (
                <p className="text-xs text-destructive mt-1 font-mono">
                  {errors.institution.message}
                </p>
              )}
            </div>

            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="chapter"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                Preferred SEDS Chapter *
              </Label>
              <Select
                value={selectedChapter}
                onValueChange={(val) => setValue("chapter", val, { shouldValidate: true })}
              >
                <SelectTrigger
                  id="chapter"
                  className="w-full bg-transparent border-0 px-0 h-9 text-sm text-foreground focus:ring-0 focus:outline-none shadow-none rounded-none"
                >
                  <SelectValue placeholder="Select a chapter..." />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border/60 rounded-none max-h-72 z-[160]">
                  <SelectItem
                    value="Independent / General Member (National / Non-Affiliated)"
                    className="font-medium"
                  >
                    Independent / General Member (National / Non-Affiliated)
                  </SelectItem>
                  {displayChapters.map((ch) => (
                    <SelectItem key={ch.slug} value={`${ch.name}${ch.university ? ` (${ch.university})` : ""}`}>
                      <span className="font-semibold">{ch.name}</span>
                      {ch.university && (
                        <span className="text-xs text-muted-foreground ml-1.5">
                          – {ch.university}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.chapter && (
                <p className="text-xs text-destructive mt-1 font-mono">
                  {errors.chapter.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: Statement of Purpose */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="statement"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              Why do you want to join SEDS Sri Lanka? *
            </Label>
            <Textarea
              id="statement"
              rows={4}
              placeholder="Tell us about your background, skills, and what you hope to achieve with SEDS..."
              className="w-full bg-transparent border-0 px-0 py-1 min-h-[110px] text-foreground placeholder:text-muted-foreground/50 resize-y"
              {...register("statement")}
            />
            {errors.statement && (
              <p className="text-xs text-destructive mt-1 font-mono">
                {errors.statement.message}
              </p>
            )}
          </div>

          {/* Row 5: Turnstile Bot Protection */}
          <div className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background border-t border-border/60">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-mono font-bold text-foreground block">
                Secured by Cloudflare
              </span>
              <p className="text-xs text-muted-foreground font-mono">
                Smart Turnstile Bot Protection
              </p>
            </div>
            <Turnstile
              align="left"
              onVerify={(token) => setTurnstileToken(token)}
            />
          </div>

          {/* Row 6: Checkbox & Submit Button */}
          <div className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={watch("terms")}
                onCheckedChange={(checked) => setValue("terms", !!checked, { shouldValidate: true })}
                className="rounded-none"
              />
              <Label
                htmlFor="terms"
                className="text-xs text-muted-foreground cursor-pointer leading-relaxed"
              >
                I agree to adhere to the SEDS Sri Lanka{" "}
                <Link
                  href="/code-of-conduct"
                  prefetch={false}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-primary transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Code of Conduct
                </Link>{" "}
                &amp;{" "}
                <Link
                  href="/terms"
                  prefetch={false}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-primary transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Regulations
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              bleed={true}
              disabled={isSubmitting}
              className="w-full sm:w-auto cursor-pointer shrink-0"
            >
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Membership Application"}
            </Button>
          </div>
        </div>
      </div>

      {errors.terms && (
        <p className="text-xs text-destructive font-mono">{errors.terms.message}</p>
      )}
    </form>
  );
};
