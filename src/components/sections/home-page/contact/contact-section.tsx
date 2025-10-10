"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  fullName: string;
  email: string;
  reasons: string[];
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  reasons?: string;
  message?: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    reasons: [],
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const reasonOptions = [
    { id: "contribution", label: "Contribution" },
    { id: "membership", label: "Membership" },
    { id: "event", label: "Event participation" },
    { id: "others", label: "Others" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.reasons.length === 0) {
      newErrors.reasons = "Please select at least one reason";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (reasonId: string) => {
    setFormData((prev) => {
      const newReasons = prev.reasons.includes(reasonId)
        ? prev.reasons.filter((r) => r !== reasonId)
        : [...prev.reasons, reasonId];
      return { ...prev, reasons: newReasons };
    });
    if (errors.reasons) {
      setErrors((prev) => ({ ...prev, reasons: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setFormData({ fullName: "", email: "", reasons: [], message: "" });

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
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 border border-border rounded-md p-4">
                <Label
                  htmlFor="fullName"
                  className="text-foreground mb-3 block"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Type here"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`bg-background border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary ${
                    errors.fullName
                      ? "text-destructive border-b-destructive"
                      : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-3 border border-border rounded-md p-4">
                <Label htmlFor="email" className="text-foreground mb-3 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Type here"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`bg-background border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary ${
                    errors.email ? "text-destructive border-b-destructive" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 border border-border rounded-md p-5">
              <Label className="text-foreground text-base block mb-6">
                Why are you contacting us?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reasonOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.reasons.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                      disabled={isSubmitting}
                      className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                    />
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.reasons && (
                <p className="text-sm text-destructive">{errors.reasons}</p>
              )}
            </div>

            <div className="space-y-3 border border-border rounded-md p-4">
              <Label htmlFor="message" className="text-foreground mb-3 block">
                Your Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type here"
                value={formData.message}
                onChange={handleInputChange}
                className={`bg-background border-0 px-0 rounded-none min-h-[150px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary ${
                  errors.message ? "text-destructive border-b-destructive" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>

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
                Sorry, there was an error sending your message. Please try again
                later.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
