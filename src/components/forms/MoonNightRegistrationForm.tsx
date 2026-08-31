"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Loader2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Telescope,
  Camera,
  Eye,
  Salad,
  Drumstick,
  Ban,
  FileCheck2,
} from "lucide-react";
import { Turnstile } from "@/components/Turnstile";
import type { ObserveMoonEventResult } from "@/utilities/getObserveMoonNightProject";

const registrationSchema = z.object({
  // Step 1: Equipment
  attendanceMode: z.string().default("in-person"),
  equipment: z.string().default("observer"),

  // Step 2: Location
  selectedLocation: z.string().optional(),

  // Step 3: Meals
  mealPreference: z.string().default("no-meal"),
  dietaryRestrictions: z.string().optional(),

  // Step 4: Identity
  fullName: z.string().min(2, "Full name is required"),
  institution: z
    .string()
    .min(2, "University, school, or organization is required"),

  // Step 5: Contact Info
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Valid contact phone number is required"),

  // Step 6: Emergency Contact
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(6, "Valid emergency contact phone number is required"),
  emergencyContactRelation: z
    .string()
    .min(2, "Emergency contact relationship is required"),

  // Step 7: Notes
  notes: z.string().optional(),

  // Step 8: Payment & Terms
  termsAccepted: z.literal(true, {
    message: "You must accept the event safety guidelines to proceed",
  }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface MoonNightRegistrationFormProps {
  year?: string;
  eventSlug?: string;
  eventData?: ObserveMoonEventResult;
}

export function MoonNightRegistrationForm({
  year = "2026",
  eventData,
}: MoonNightRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passCode, setPassCode] = useState<string | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [copiedAccount, setCopiedAccount] = useState(false);

  const totalSteps = 8;
  const isPaidEvent = Boolean(eventData?.isPaid);
  const locations = eventData?.locations || [
    { name: "Galle Face Green", city: "Colombo" },
    { name: "University of Peradeniya", city: "Kandy" },
    { name: "Jaffna Public Grounds", city: "Jaffna" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: {
      attendanceMode: "in-person",
      equipment: "observer",
      selectedLocation: locations[0]?.name || "Galle Face Green, Colombo",
      mealPreference: "no-meal",
      emergencyContactRelation: "Parent",
      phone: "+94",
      emergencyContactPhone: "+94",
    },
  });

  const formValues = watch();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNextStep = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await trigger(["equipment"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["selectedLocation"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["mealPreference"]);
    } else if (currentStep === 4) {
      isValid = await trigger(["fullName", "institution"]);
    } else if (currentStep === 5) {
      isValid = await trigger(["email", "phone"]);
    } else if (currentStep === 6) {
      isValid = await trigger([
        "emergencyContactName",
        "emergencyContactPhone",
        "emergencyContactRelation",
      ]);
    } else if (currentStep === 7) {
      isValid = true;
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      toast.error("Please fill in all required fields accurately.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (isPaidEvent && !paymentFile) {
      toast.error("Please upload your payment receipt before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone || "");
      formData.append("institution", data.institution);
      formData.append(
        "selectedLocation",
        data.selectedLocation || locations[0]?.name || "Galle Face Green",
      );
      formData.append("attendanceMode", "in-person");
      formData.append("equipment", data.equipment);
      formData.append("emergencyContactName", data.emergencyContactName);
      formData.append("emergencyContactPhone", data.emergencyContactPhone);
      formData.append(
        "emergencyContactRelation",
        data.emergencyContactRelation,
      );
      formData.append("mealPreference", data.mealPreference);
      formData.append("dietaryRestrictions", data.dietaryRestrictions || "");
      formData.append("notes", data.notes || "");
      formData.append("year", year);
      formData.append("eventTitle", eventData?.title || `Observe Moon ${year}`);
      formData.append("isPaid", isPaidEvent ? "true" : "false");

      if (turnstileToken) {
        formData.append("turnstileToken", turnstileToken);
      }

      if (paymentFile) {
        formData.append("paymentSlip", paymentFile);
      }

      const res = await fetch("/api/observe-moon-night", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Registration failed");
      }

      if (resData.registrationCode || resData.registrationId) {
        setPassCode(resData.registrationCode || resData.registrationId);
      }

      setIsSubmitted(true);
      toast.success("Registration submitted! Check your email for details.");
      setPaymentFile(null);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative">
        <div className="absolute -left-4 -right-4 top-0 border-t border-slate-300 pointer-events-none" />
        <div className="absolute -left-4 -right-4 bottom-0 border-b border-slate-300 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 left-0 border-l border-slate-300 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 right-0 border-r border-slate-300 pointer-events-none" />

        <div className="p-8 md:p-14 border border-slate-300 bg-white text-slate-900 text-center space-y-6 relative z-10">
          <div className="inline-flex p-4 bg-blue-50 border border-blue-200 text-blue-600">
            <CheckCircle2 className="size-12" />
          </div>
          <div className="space-y-3 max-w-lg mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold font-mono uppercase tracking-tight text-slate-900">
              Registration Submitted
            </h3>
            {passCode && (
              <div className="inline-block px-4 py-1.5 bg-slate-900 text-white font-mono text-sm font-bold uppercase tracking-wider border border-slate-700">
                CODE: {passCode}
              </div>
            )}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-mono">
              Your registration has been received. We have sent a confirmation
              email to your inbox.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            bleed={true}
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="mt-4 bg-white text-slate-900 hover:bg-slate-100 border-slate-300 font-mono text-sm font-bold"
          >
            Register Another Person
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (val?: string) => {
    if (!val) return "";
    const numMatch = val.replace(/[^0-9.]/g, "");
    const cleanNum = parseFloat(numMatch);
    if (isNaN(cleanNum)) return val;
    return `LKR ${cleanNum.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const equipmentOptions = [
    {
      id: "observer",
      title: "No Equipment",
      desc: "Coming to observe with naked eye",
      icon: Eye,
    },
    {
      id: "bringing-equipment",
      title: "Telescope / Binoculars",
      desc: "Bringing observation gear",
      icon: Telescope,
    },
    {
      id: "astrophotography",
      title: "Camera Setup",
      desc: "Bringing camera gear",
      icon: Camera,
    },
  ];

  const mealOptions = [
    {
      id: "vegetarian",
      title: "Vegetarian",
      desc: "Vegetarian meal",
      icon: Salad,
    },
    {
      id: "non-vegetarian",
      title: "Non-Vegetarian",
      desc: "Non-vegetarian meal",
      icon: Drumstick,
    },
    {
      id: "no-meal",
      title: "No Meal",
      desc: "No meal needed",
      icon: Ban,
    },
  ];

  const getEquipmentTitle = (id: string) => {
    const found = equipmentOptions.find((e) => e.id === id);
    return found ? found.title : id;
  };

  const getMealTitle = (id: string) => {
    const found = mealOptions.find((m) => m.id === id);
    return found ? found.title : id;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto"
    >
      {/* Main Form Box Surface with Corner Bleed Lines */}
      <div ref={containerRef} className="relative scroll-mt-28">
        <div className="absolute -left-4 -right-4 top-0 border-t border-slate-300 pointer-events-none" />
        <div className="absolute -left-4 -right-4 bottom-0 border-b border-slate-300 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 left-0 border-l border-slate-300 pointer-events-none" />
        <div className="absolute -top-4 -bottom-4 right-0 border-r border-slate-300 pointer-events-none" />

        <div className="border border-slate-300 bg-white text-slate-900 shadow-2xl p-6 md:p-10 relative z-10 min-h-0 md:min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* ================= STEP 1: EQUIPMENT ================= */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    What equipment are you bringing?
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    Select your equipment setup.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900">
                    Select Equipment <span className="text-blue-600">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {equipmentOptions.map((opt) => {
                      const isSelected = formValues.equipment === opt.id;
                      const Icon = opt.icon;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setValue("equipment", opt.id)}
                          className={`relative p-5 border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between space-y-4 rounded-none ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50/80 text-slate-900 font-semibold"
                              : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-blue-600 text-white p-1">
                              <Check className="size-3.5" />
                            </div>
                          )}
                          <div
                            className={`size-10 flex items-center justify-center border ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            <Icon className="size-5" />
                          </div>
                          <div>
                            <div className="font-mono font-bold text-slate-900 text-sm uppercase">
                              {opt.title}
                            </div>
                            <div className="text-xs text-slate-600 mt-1 leading-snug">
                              {opt.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: LOCATION ================= */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Which location will you attend?
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    Select your preferred observation site.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900">
                    Select Location <span className="text-blue-600">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {locations.map((loc: any, idx: number) => {
                      const isSelected =
                        formValues.selectedLocation === loc.name ||
                        (!formValues.selectedLocation && idx === 0);
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setValue("selectedLocation", loc.name)}
                          className={`relative p-5 border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between space-y-3 rounded-none ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50/80 font-bold text-slate-900 shadow-sm"
                              : "border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-blue-600 text-white p-1">
                              <Check className="size-3.5" />
                            </div>
                          )}
                          <div>
                            <div className="font-mono font-bold text-slate-900 text-sm uppercase">
                              {loc.name}
                            </div>
                            {loc.city && (
                              <div className="text-xs text-slate-500 font-mono mt-1">
                                {loc.city}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: MEALS ================= */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Meal Preference
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    Select your meal choice for the event.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900">
                    Select Meal <span className="text-blue-600">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mealOptions.map((opt) => {
                      const isSelected = formValues.mealPreference === opt.id;
                      const Icon = opt.icon;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setValue("mealPreference", opt.id)}
                          className={`relative p-5 border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between space-y-4 rounded-none ${
                            isSelected
                              ? "border-2 border-blue-600 bg-blue-50/80 text-slate-900 font-semibold"
                              : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-blue-600 text-white p-1">
                              <Check className="size-3.5" />
                            </div>
                          )}
                          <div
                            className={`size-10 flex items-center justify-center border ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            <Icon className="size-5" />
                          </div>
                          <div>
                            <div className="font-mono font-bold text-slate-900 text-sm uppercase">
                              {opt.title}
                            </div>
                            <div className="text-xs text-slate-600 mt-1 leading-snug">
                              {opt.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="dietaryRestrictions"
                    className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                  >
                    Dietary Restrictions / Food Allergies (Optional)
                  </Label>
                  <Input
                    id="dietaryRestrictions"
                    placeholder="e.g. Peanut allergy, lactose intolerance"
                    {...register("dietaryRestrictions")}
                    className="bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white font-mono text-sm h-11 rounded-none"
                  />
                </div>
              </motion.div>
            )}

            {/* ================= STEP 4: IDENTITY ================= */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Your Name & Organization
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    Please enter your full name and university, school, or
                    organization.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                    >
                      Full Name <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="e.g. Kasun Perera"
                      {...register("fullName")}
                      className="bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white font-mono text-sm h-11 rounded-none"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 font-mono font-semibold">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="institution"
                      className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                    >
                      University / School / Organization{" "}
                      <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="institution"
                      placeholder="e.g. University of Colombo"
                      {...register("institution")}
                      className="bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white font-mono text-sm h-11 rounded-none"
                    />
                    {errors.institution && (
                      <p className="text-xs text-red-600 font-mono font-semibold">
                        {errors.institution.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 5: CONTACT INFO ================= */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Your Email & Phone
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    We will send your confirmation and ticket pass to this
                    email.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                    >
                      Email Address <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="kasun@example.com"
                      {...register("email")}
                      className="bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white font-mono text-sm h-11 rounded-none"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 font-mono font-semibold">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                    >
                      Phone Number <span className="text-blue-600">*</span>
                    </Label>
                    <PhoneInput
                      defaultCountry="LK"
                      international={true}
                      value={watch("phone") || "+94"}
                      onChange={(val) => setValue("phone", val)}
                      className="bg-slate-50 border-slate-300 text-slate-900 focus-within:border-blue-600 focus-within:bg-white font-mono text-sm h-11 px-3 items-center rounded-none"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 font-mono font-semibold">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 6: EMERGENCY CONTACT ================= */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Emergency Contact
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    Who should we contact in case of an emergency?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="emergencyContactName"
                      className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                    >
                      Emergency Contact Name{" "}
                      <span className="text-blue-600">*</span>
                    </Label>
                    <Input
                      id="emergencyContactName"
                      placeholder="e.g. Nimal Perera"
                      {...register("emergencyContactName")}
                      className="bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 font-mono text-sm h-11 rounded-none"
                    />
                    {errors.emergencyContactName && (
                      <p className="text-xs text-red-600 font-mono font-semibold">
                        {errors.emergencyContactName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="emergencyContactPhone"
                        className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                      >
                        Emergency Phone Number{" "}
                        <span className="text-blue-600">*</span>
                      </Label>
                      <PhoneInput
                        defaultCountry="LK"
                        international={true}
                        value={watch("emergencyContactPhone") || "+94"}
                        onChange={(val) =>
                          setValue("emergencyContactPhone", val)
                        }
                        className="bg-slate-50 border-slate-300 text-slate-900 focus-within:border-blue-600 focus-within:bg-white font-mono text-sm h-11 px-3 items-center rounded-none"
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-xs text-red-600 font-mono font-semibold">
                          {errors.emergencyContactPhone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="emergencyContactRelation"
                        className="text-sm md:text-base font-mono font-extrabold uppercase tracking-wider text-slate-900"
                      >
                        Relationship <span className="text-blue-600">*</span>
                      </Label>
                      <Input
                        id="emergencyContactRelation"
                        placeholder="e.g. Parent / Spouse / Friend"
                        {...register("emergencyContactRelation")}
                        className="bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600 font-mono text-sm h-11 rounded-none"
                      />
                      {errors.emergencyContactRelation && (
                        <p className="text-xs text-red-600 font-mono font-semibold">
                          {errors.emergencyContactRelation.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 7: SUMMARY & NOTES ================= */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Your Registration Ticket
                  </h2>
                  <p className="text-sm text-slate-500">
                    Review before proceeding to payment.
                  </p>
                </div>

                {/* ── Ticket ── */}
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ background: "#0a0a0f" }}
                >
                  {/* Ticket header */}
                  <div
                    className="relative px-6 py-6 flex flex-col items-center text-center space-y-3 overflow-hidden"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 30%, #1a1a3e 0%, #0a0a0f 80%)",
                      borderBottom: "1px dashed rgba(255,255,255,0.15)",
                    }}
                  >
                    {/* Star dots */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      aria-hidden
                    >
                      {[
                        { top: "12%", left: "8%", size: 1.5 },
                        { top: "60%", left: "15%", size: 1 },
                        { top: "30%", left: "42%", size: 1 },
                        { top: "75%", left: "55%", size: 1.5 },
                        { top: "20%", left: "72%", size: 1 },
                        { top: "55%", left: "82%", size: 1 },
                        { top: "85%", left: "28%", size: 1 },
                        { top: "10%", left: "90%", size: 1.5 },
                      ].map((s, i) => (
                        <span
                          key={i}
                          className="absolute rounded-full bg-white opacity-60"
                          style={{
                            top: s.top,
                            left: s.left,
                            width: s.size,
                            height: s.size,
                          }}
                        />
                      ))}
                    </div>

                    {/* Centered Moon logo */}
                    <img
                      src="/logo/moon-seds.png"
                      alt="Observe the Moon Night"
                      className="relative shrink-0 z-10 h-10 md:h-12 w-auto object-contain select-none opacity-95 mx-auto"
                    />

                    <div className="relative space-y-1.5 z-10 w-full max-w-full">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        Observe the Moon Night · {year}
                      </p>
                      <h3 className="text-lg md:text-2xl font-extrabold font-mono leading-tight text-white tracking-tight break-words max-w-full">
                        {formValues.fullName || "—"}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono break-words">
                        {formValues.institution || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Perforated tear line */}
                  <div
                    className="relative h-0"
                    style={{ borderTop: "1.5px dashed rgba(255,255,255,0.18)" }}
                  >
                    <span className="absolute -left-3 -top-3 size-6 rounded-full inline-block bg-white" />
                    <span className="absolute -right-3 -top-3 size-6 rounded-full inline-block bg-white" />
                  </div>

                  {/* Ticket body */}
                  <div className="flex flex-col sm:flex-row">
                    {/* Main fields (Single column on mobile, 2 columns on desktop) */}
                    <div className="flex-1 px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {[
                        { label: "Email", value: formValues.email },
                        { label: "Phone", value: formValues.phone },
                        {
                          label: "Location",
                          value: formValues.selectedLocation,
                        },
                        {
                          label: "Equipment",
                          value: getEquipmentTitle(formValues.equipment),
                        },
                        {
                          label: "Meal",
                          value: getMealTitle(formValues.mealPreference),
                        },
                        { label: "Attendance", value: "In-Person" },
                      ].map((f) => (
                        <div key={f.label} className="min-w-0">
                          <p
                            className="text-[9px] font-mono font-bold uppercase tracking-widest mb-0.5"
                            style={{ color: "rgba(255,255,255,0.35)" }}
                          >
                            {f.label}
                          </p>
                          <p
                            className="text-xs font-bold font-mono leading-snug break-all"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {f.value || "—"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Vertical dashed divider */}
                    <div className="hidden sm:flex flex-col items-center">
                      <div
                        className="relative w-0 h-full"
                        style={{
                          borderLeft: "1.5px dashed rgba(255,255,255,0.18)",
                        }}
                      >
                        <span className="absolute -top-3 -left-3 size-6 rounded-full inline-block bg-white" />
                        <span className="absolute -bottom-3 -left-3 size-6 rounded-full inline-block bg-white" />
                      </div>
                    </div>

                    {/* Stub */}
                    <div
                      className="sm:w-36 md:w-44 px-5 py-5 flex flex-col justify-between gap-4"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="space-y-1">
                        <p
                          className="text-[9px] font-mono font-bold uppercase tracking-widest"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          Emergency
                        </p>
                        <p
                          className="text-xs font-black font-mono leading-snug"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {formValues.emergencyContactName || "—"}
                        </p>
                        <p
                          className="text-[10px] font-mono"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          {formValues.emergencyContactRelation || "—"}
                        </p>
                        <p
                          className="text-[10px] font-mono"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          {formValues.emergencyContactPhone || "—"}
                        </p>
                      </div>

                      {/* Barcode strip */}
                      <div className="space-y-[2px]">
                        {[7, 4, 9, 6, 3, 8, 5, 10, 4, 7, 6, 3].map((w, i) => (
                          <div
                            key={i}
                            className="h-[3px]"
                            style={{
                              width: `${w * 9}%`,
                              background:
                                i % 3 === 0
                                  ? "rgba(255,255,255,0.7)"
                                  : i % 3 === 1
                                    ? "rgba(255,255,255,0.4)"
                                    : "rgba(255,255,255,0.55)",
                            }}
                          />
                        ))}
                        <p
                          className="text-[8px] font-mono tracking-widest pt-1 uppercase"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          SEDS · OBS PASS
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes below the ticket */}
                <div className="space-y-2">
                  <Label
                    htmlFor="notes"
                    className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-600"
                  >
                    Anything else? (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Questions, group info, special requirements..."
                    {...register("notes")}
                    className="bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600 focus:bg-white font-mono text-sm min-h-[72px] rounded-none"
                  />
                </div>
              </motion.div>
            )}

            {/* ================= STEP 8: PAYMENT & SUBMIT ================= */}
            {currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-900 font-mono">
                    Payment & Submit
                  </h2>
                  <p className="text-sm text-slate-500">
                    {isPaidEvent
                      ? "Transfer the fee and upload your receipt to confirm your spot."
                      : "This is a free event. Just agree to the guidelines and submit."}
                  </p>
                </div>

                {isPaidEvent ? (
                  <div className="space-y-4">
                    {/* Bank details card — bleeding edge */}
                    <div className="relative">
                      {/* Corner bleed lines */}
                      <div className="absolute -left-4 -right-4 top-0 border-t border-slate-300 pointer-events-none" />
                      <div className="absolute -left-4 -right-4 bottom-0 border-b border-slate-300 pointer-events-none" />
                      <div className="absolute -top-4 -bottom-4 left-0 border-l border-slate-300 pointer-events-none" />
                      <div className="absolute -top-4 -bottom-4 right-0 border-r border-slate-300 pointer-events-none" />

                      <div
                        className="overflow-hidden"
                        style={{ background: "#0a0a0f" }}
                      >
                        {/* Amount header */}
                        {eventData?.ticketPrice && (
                          <div
                            className="px-6 py-4 flex items-center justify-between gap-4"
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <div>
                              <p
                                className="text-[10px] font-mono font-bold uppercase tracking-widest"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                              >
                                Amount Due
                              </p>
                              <p className="text-2xl font-black font-mono text-white tracking-tight mt-0.5">
                                {formatCurrency(eventData.ticketPrice)}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Copyable account number */}
                        {eventData?.bankAccountNumber && (
                          <div
                            className="px-6 py-4 flex items-center justify-between gap-3"
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <div className="min-w-0">
                              <p
                                className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1"
                                style={{ color: "rgba(255,255,255,0.35)" }}
                              >
                                Account Number
                              </p>
                              <p className="text-sm font-mono font-bold tracking-widest text-white truncate">
                                {eventData.bankAccountNumber}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  eventData.bankAccountNumber || "",
                                );
                                setCopiedAccount(true);
                                setTimeout(() => setCopiedAccount(false), 2000);
                              }}
                              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"
                              style={{
                                background: copiedAccount
                                  ? "rgba(34,197,94,0.15)"
                                  : "rgba(255,255,255,0.08)",
                                color: copiedAccount
                                  ? "rgba(134,239,172,0.9)"
                                  : "rgba(255,255,255,0.5)",
                              }}
                            >
                              {copiedAccount ? (
                                <>
                                  <Check className="size-3" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" /> Copy
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Bank details rows */}
                        {eventData?.paymentDetails && (
                          <div className="px-6 py-4">
                            <p
                              className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3"
                              style={{ color: "rgba(255,255,255,0.35)" }}
                            >
                              Bank Details
                            </p>
                            <p
                              className="text-xs font-mono leading-loose whitespace-pre-wrap"
                              style={{ color: "rgba(255,255,255,0.75)" }}
                            >
                              {eventData.paymentDetails}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Upload zone */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="paymentSlip"
                        className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-900"
                      >
                        Upload Payment Receipt{" "}
                        <span className="text-blue-600">*</span>
                      </Label>

                      <label
                        htmlFor="paymentSlip"
                        className={`group flex flex-col items-center justify-center gap-3 border-2 border-dashed cursor-pointer transition-all duration-200 py-8 px-6 ${
                          paymentFile
                            ? "border-blue-400 bg-blue-50"
                            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
                        }`}
                      >
                        {paymentFile ? (
                          <>
                            <div className="size-10 bg-blue-100 flex items-center justify-center">
                              <FileCheck2 className="size-5 text-blue-600" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold font-mono text-slate-900">
                                {paymentFile.name}
                              </p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">
                                {(paymentFile.size / 1024).toFixed(1)} KB ·
                                Ready to upload
                              </p>
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600">
                              Click to change file
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="size-10 bg-slate-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                              <Upload className="size-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold font-mono text-slate-900">
                                Click to upload or drag & drop
                              </p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">
                                JPG, PNG or PDF — bank slip / receipt
                              </p>
                            </div>
                          </>
                        )}
                        <input
                          id="paymentSlip"
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setPaymentFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 border border-slate-200">
                    <div className="size-2 rounded-full bg-green-500 shrink-0" />
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      Free Event — No Payment Required
                    </p>
                  </div>
                )}

                {/* Safety Terms */}
                <div className="space-y-1.5">
                  <div
                    className={`flex items-start gap-3 p-4 border transition-colors ${
                      watch("termsAccepted")
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <Checkbox
                      id="termsAccepted"
                      checked={Boolean(watch("termsAccepted"))}
                      onCheckedChange={(checked) =>
                        setValue("termsAccepted", (checked === true) as true)
                      }
                      className="mt-0.5 border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white rounded-none shrink-0"
                    />
                    <Label
                      htmlFor="termsAccepted"
                      className="text-xs text-slate-700 leading-relaxed cursor-pointer font-sans"
                    >
                      I agree to follow the event safety guidelines and site
                      rules.
                    </Label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-xs text-red-600 font-mono font-semibold">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                {/* Turnstile */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                      Bot Verification
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Powered by Cloudflare Turnstile
                    </p>
                  </div>
                  <Turnstile
                    theme="light"
                    align="left"
                    onVerify={(token) => setTurnstileToken(token)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Navigation Buttons */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4 mt-auto">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                bleed={true}
                className="bg-white border-slate-300 text-slate-900 hover:bg-slate-100 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNextStep}
                bleed={true}
                className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 px-8 py-3.5 cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                bleed={true}
                className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-3.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting...</span>
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
