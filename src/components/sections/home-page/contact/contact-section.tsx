"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  contactFormSchema,
  type ContactFormData,
  reasonOptions,
} from "@/lib/schemas/contact";
import { SectionHeader } from "@/components/sections/section-header";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      reasons: [],
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Show success toast
      toast.success("Message sent successfully!", {
        description: "Thank you for contacting us. We'll get back to you soon.",
        duration: 5000,
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      // Show error toast
      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background relative w-full min-h-screen flex flex-col">
      <SectionHeader
        title="Get in Touch with SEDS Sri Lanka"
        description={
          <>
            Whether you're a student looking to join, a partner interested in
            working with us, or simply curious about our projects, reach out and
            our team will get back to you soon.
          </>
        }
        image="/divisionimg/moon.jpeg"
      >
        <Button
          asChild
          size="lg"
          variant="default"
          className="px-8 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <a href="#contact-form">Book an appointment</a>
        </Button>
      </SectionHeader>

      <div
        id="contact-form"
        className="flex-1 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-3xl border border-border rounded-lg p-10 md:p-16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="space-y-3 border border-border rounded-md p-4">
                      <FormLabel className="text-foreground mb-3 block">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type here"
                          className="!bg-transparent border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-3 border border-border rounded-md p-4">
                      <FormLabel className="text-foreground mb-3 block">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Type here"
                          className="!bg-transparent border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reasons"
                render={() => (
                  <FormItem className="space-y-4 border border-border rounded-md p-5">
                    <FormLabel className="text-foreground text-base block mb-6">
                      Why are you contacting us?
                    </FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reasonOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="reasons"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            option.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== option.id,
                                            ),
                                          );
                                    }}
                                    disabled={isSubmitting}
                                  />
                                </FormControl>
                                <FormLabel className="text-foreground group-hover:text-primary transition-colors cursor-pointer">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-3 border border-border rounded-md p-4">
                    <FormLabel className="text-foreground mb-3 block">
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type here"
                        className="!bg-transparent border-0 px-0 rounded-none min-h-[150px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  className="px-12 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Loading spinner"
                      >
                        <title>Loading spinner</title>
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
