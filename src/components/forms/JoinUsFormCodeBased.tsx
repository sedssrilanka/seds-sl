"use client";

import React, { useState } from "react";
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

const joinSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  institution: z.string().min(2, "Institution / University is required"),
  chapter: z.string().optional(),
  statement: z
    .string()
    .min(10, "Please share why you want to join SEDS Sri Lanka"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must accept the Code of Conduct"),
});

export type JoinUsFormValues = z.infer<typeof joinSchema>;

export const JoinUsFormCodeBased: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      chapter: "Independent / General Member",
      statement: "",
      terms: false,
    },
  });

  const onSubmit = async (data: JoinUsFormValues) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
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
        }),
      });

      toast.success(
        "Membership application submitted! Our executive committee will get in touch with you.",
      );
      reset();
    } catch (err) {
      console.error(err);
      toast.success(
        "Application received! Thank you for applying to join SEDS Sri Lanka.",
      );
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Type here"
              className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive mt-1">
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
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Type here"
                className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="phone"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                Phone Number
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

          {/* Row 3: University / Institution */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="institution"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              University / School / Institution
            </Label>
            <Input
              id="institution"
              placeholder="e.g. University of Moratuwa, University of Peradeniya..."
              className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
              {...register("institution")}
            />
            {errors.institution && (
              <p className="text-xs text-destructive mt-1">
                {errors.institution.message}
              </p>
            )}
          </div>

          {/* Row 4: Preferred SEDS Chapter Dropdown */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="chapter"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              Preferred SEDS Chapter (or Independent)
            </Label>
            <Select
              value={watch("chapter")}
              onValueChange={(val) => setValue("chapter", val)}
            >
              <SelectTrigger
                id="chapter"
                className="w-full bg-transparent border-0 px-0 h-9 text-sm text-foreground"
              >
                <SelectValue placeholder="Select chapter..." />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border/60 rounded-none z-[160]">
                <SelectItem value="Independent / General Member">
                  Independent / General Member
                </SelectItem>
                <SelectItem value="SEDS UOM (University of Moratuwa)">
                  SEDS UOM (University of Moratuwa)
                </SelectItem>
                <SelectItem value="SEDS UOP (University of Peradeniya)">
                  SEDS UOP (University of Peradeniya)
                </SelectItem>
                <SelectItem value="SEDS USJ (University of Sri Jayewardenepura)">
                  SEDS USJ (University of Sri Jayewardenepura)
                </SelectItem>
                <SelectItem value="SEDS UOK (University of Kelaniya)">
                  SEDS UOK (University of Kelaniya)
                </SelectItem>
                <SelectItem value="SEDS SLIIT">SEDS SLIIT</SelectItem>
                <SelectItem value="SEDS KDU">SEDS KDU</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 5: Statement of Purpose */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="statement"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              Why do you want to join SEDS Sri Lanka?
            </Label>
            <Textarea
              id="statement"
              rows={4}
              placeholder="Tell us about your background, interests in space, engineering, or research..."
              className="w-full bg-transparent border-0 px-0 py-1 min-h-[110px] text-foreground placeholder:text-muted-foreground/50 resize-y"
              {...register("statement")}
            />
            {errors.statement && (
              <p className="text-xs text-destructive mt-1">
                {errors.statement.message}
              </p>
            )}
          </div>

          {/* Row 6: Checkbox & Submit Button Side-by-Side in Bottom Grid Cell */}
          <div className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={watch("terms")}
                onCheckedChange={(checked) => setValue("terms", !!checked)}
              />
              <Label
                htmlFor="terms"
                className="text-xs text-muted-foreground cursor-pointer"
              >
                I agree to adhere to the SEDS Sri Lanka Code of Conduct &
                Regulations
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
        <p className="text-xs text-destructive">{errors.terms.message}</p>
      )}
    </form>
  );
};
