"use client";

import { useState } from "react";
import {
  Mail,
  Smartphone,
  Monitor,
  ExternalLink,
  Send,
  Sparkles,
  Check,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TemplateMeta {
  id: string;
  name: string;
  category: "General" | "Membership" | "Store" | "Events";
  subject: string;
  recipient: "Customer / Attendee" | "Admin / Team";
  description: string;
}

const TEMPLATES: TemplateMeta[] = [
  {
    id: "contact",
    name: "Contact Form Submission",
    category: "General",
    subject: "New Contact Form Submission: Kavindu Perera",
    recipient: "Admin / Team",
    description: "Delivered to SEDS inbox when a user submits the main contact form.",
  },
  {
    id: "membership",
    name: "Membership (Team Alert)",
    category: "Membership",
    subject: "New Membership Application: Senura Wickramasinghe",
    recipient: "Admin / Team",
    description: "Detailed applicant profile sent to the executive team for review.",
  },
  {
    id: "membership-applicant",
    name: "Membership (Applicant Copy)",
    category: "Membership",
    subject: "Membership Application Received | SEDS Sri Lanka",
    recipient: "Customer / Attendee",
    description: "Confirmation copy sent directly to applicant upon form submission.",
  },
  {
    id: "order-receipt",
    name: "Store Order Receipt",
    category: "Store",
    subject: "Order Received: SEDS Sri Lanka Official T-Shirt 2026 | SEDS Sri Lanka",
    recipient: "Customer / Attendee",
    description: "Immediate purchase acknowledgment sent to customer upon Tally order submission.",
  },
  {
    id: "order-alert",
    name: "Store Order Team Alert",
    category: "Store",
    subject: "New Store Order: SEDS Sri Lanka Official T-Shirt 2026 (Dilani Fernando)",
    recipient: "Admin / Team",
    description: "Internal alert to merchandise team with customer info & slip link.",
  },
  {
    id: "order-shipped",
    name: "Order Shipped & Dispatched",
    category: "Store",
    subject: "Order Shipped: SEDS Sri Lanka Official T-Shirt 2026 | SEDS Sri Lanka",
    recipient: "Customer / Attendee",
    description: "Dispatched package notification with courier tracking number.",
  },
  {
    id: "moon-event",
    name: "Observe the Moon Night",
    category: "Events",
    subject: "Registration Confirmed: International Observe the Moon Night 2026",
    recipient: "Customer / Attendee",
    description: "Event pass with QR code and calendar invite (.ics).",
  },
];

export function EmailPreviewStudioClient() {
  const [selectedId, setSelectedId] = useState<string>("contact");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [testEmail, setTestEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedId) || TEMPLATES[0];
  const previewUrl = `/api/emails/preview?template=${currentTemplate.id}&v=${iframeKey}`;

  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Test Preview User",
          email: testEmail,
          reasons: [`Email Studio Test: ${currentTemplate.name}`],
          message: `This is a live test email sent from the SEDS Email Preview Studio for template '${currentTemplate.name}'.`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to dispatch test email.");
      }

      toast.success(`Test email dispatched to ${testEmail}! Check your inbox.`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to send test email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white flex items-center gap-2">
              Email Templates Studio <Sparkles className="w-4 h-4 text-amber-400" />
            </h1>
            <p className="text-xs text-zinc-400">
              Live visual previews & testing for all SEDS Sri Lanka transactional emails
            </p>
          </div>
        </div>

        {/* View Controls & Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("desktop")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === "desktop"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === "mobile"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs"
            onClick={() => setIframeKey((prev) => prev + 1)}
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs"
            onClick={() => window.open(previewUrl, "_blank")}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open in Tab
          </Button>
        </div>
      </header>

      {/* Main Studio Grid */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar: Template Directory */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 p-4 space-y-4 shrink-0 overflow-y-auto">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 px-2">
            Available Templates ({TEMPLATES.length})
          </div>

          <div className="space-y-1.5">
            {TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedId(tmpl.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-indigo-600/10 border-indigo-500/40 text-white shadow-sm"
                      : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                      {tmpl.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase font-mono px-1.5 py-0 border-zinc-700 ${
                        tmpl.recipient === "Admin / Team"
                          ? "text-purple-400 bg-purple-500/10"
                          : "text-emerald-400 bg-emerald-500/10"
                      }`}
                    >
                      {tmpl.recipient}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Test Send Box */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Send Live Test Email
            </div>
            <p className="text-xs text-zinc-500">
              Dispatch a test copy to your personal inbox using Resend.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-zinc-500 flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs shrink-0"
                disabled={isSending}
                onClick={handleSendTest}
              >
                {isSending ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
        </aside>

        {/* Center: Live Frame Preview */}
        <main className="flex-1 bg-zinc-950 p-4 md:p-8 flex flex-col items-center justify-start overflow-y-auto">
          {/* Email Subject Bar */}
          <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 mb-6 flex items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="text-xs font-mono font-bold uppercase text-zinc-500 shrink-0">
                Subject:
              </span>
              <span className="text-xs md:text-sm font-medium text-white truncate">
                {currentTemplate.subject}
              </span>
            </div>
            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 text-[11px] shrink-0">
              Template: {currentTemplate.id}
            </Badge>
          </div>

          {/* Iframe Viewport */}
          <div
            className={`transition-all duration-300 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black ${
              viewMode === "mobile" ? "w-[390px] h-[780px]" : "w-full max-w-[680px] h-[820px]"
            }`}
          >
            <iframe
              key={`${currentTemplate.id}-${iframeKey}`}
              src={previewUrl}
              title={currentTemplate.name}
              className="w-full h-full border-0 bg-zinc-950"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
