"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  reasons: z.array(z.string()).min(1, "Please select at least one reason"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      reasons: [],
      message: "",
    },
  });

  const reasonOptions = [
    { id: "contribution", label: "Contribution" },
    { id: "membership", label: "Membership" },
    { id: "event", label: "Event participation" },
    { id: "others", label: "Others" },
  ];

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      form.reset();

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (_error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background relative w-full min-h-screen flex flex-col">
      <div className="relative flex flex-col items-center justify-center py-16 px-6 text-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/divisionimg/moon.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get in Touch with SEDS Sri Lanka
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a student looking to join, a partner interested in
            working with us, or simply curious about our projects, reach out and
            our team will get back to you soon.
          </p>
          <Button
            size="lg"
            variant="default"
            className="px-8 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Book an appointment
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
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
                          className="bg-background border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
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
                          className="bg-background border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
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
                        className="bg-background border-0 px-0 rounded-none min-h-[150px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
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
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>

              {submitStatus === "success" && (
                <div className="glass-3 rounded-md p-4 text-center text-sm text-primary">
                  Thank you! Your message has been sent successfully. We'll get
                  back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="glass-3 rounded-md p-4 text-center text-sm text-destructive">
                  Sorry, there was an error sending your message. Please try
                  again later.
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
