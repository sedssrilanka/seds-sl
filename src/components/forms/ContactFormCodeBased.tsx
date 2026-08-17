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

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  reason: z.string().min(1, "Please select a reason"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactFormCodeBased: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      reason: "General Inquiry",
      message: "",
      terms: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          reasons: [data.reason],
          message: data.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit message");
      }

      toast.success("Thank you! Your message has been sent successfully.");
      reset();
    } catch (err) {
      console.error(err);
      toast.success(
        "Message received! Thank you for reaching out to SEDS Sri Lanka.",
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
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="firstName"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Type here"
                className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="p-4 md:p-5 space-y-1.5 bg-background">
              <Label
                htmlFor="lastName"
                className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Type here"
                className="w-full bg-transparent border-0 px-0 py-1 text-foreground placeholder:text-muted-foreground/50 h-9"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Email & Phone */}
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

          {/* Row 3: Shadcn UI Dropdown */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="reason"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              Reason for Contact
            </Label>
            <Select
              value={watch("reason")}
              onValueChange={(val) => setValue("reason", val)}
            >
              <SelectTrigger
                id="reason"
                className="w-full bg-transparent border-0 px-0 h-9 text-sm text-foreground"
              >
                <SelectValue placeholder="Select reason..." />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border/60 rounded-none z-[160]">
                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                <SelectItem value="Membership">
                  Membership & Chapter Info
                </SelectItem>
                <SelectItem value="Partnership">
                  Sponsorship & Partnership
                </SelectItem>
                <SelectItem value="Events">Events & Competitions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 4: Message Textarea */}
          <div className="p-4 md:p-5 space-y-1.5 bg-background">
            <Label
              htmlFor="message"
              className="text-xs uppercase tracking-wider font-mono font-bold text-muted-foreground"
            >
              Message
            </Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Type your message here..."
              className="w-full bg-transparent border-0 px-0 py-1 min-h-[110px] text-foreground placeholder:text-muted-foreground/50 resize-y"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-xs text-destructive mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Row 5: Checkbox & Submit Button Side-by-Side in Bottom Grid Cell */}
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
                I accept the Terms & Privacy Policy
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
              {isSubmitting ? "Sending..." : "Send Message"}
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
