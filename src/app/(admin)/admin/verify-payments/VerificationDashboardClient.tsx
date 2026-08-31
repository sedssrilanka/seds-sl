"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  FileText,
  ExternalLink,
  Loader2,
  Check,
  X,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

interface PaymentSlipMedia {
  id: string | number;
  url?: string;
  filename?: string;
  mimeType?: string;
}

interface RegistrationItem {
  id: string | number;
  registrationCode: string;
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  selectedLocation?: string;
  year?: string;
  attendanceMode?: string;
  equipment?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  mealPreference?: string;
  paymentStatus: "n/a" | "pending" | "verified" | "rejected";
  status: "pending" | "confirmed" | "cancelled";
  paymentSlip?: PaymentSlipMedia | string | number | null;
  createdAt: string;
}

interface VerificationDashboardClientProps {
  initialDocs: RegistrationItem[];
  currentUserEmail: string;
}

export function VerificationDashboardClient({
  initialDocs,
  currentUserEmail,
}: VerificationDashboardClientProps) {
  const [docs, setDocs] = useState<RegistrationItem[]>(initialDocs);
  const [filter, setFilter] = useState<
    "pending" | "all" | "verified" | "rejected"
  >("pending");
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<RegistrationItem | null>(null);
  const [processingId, setProcessingId] = useState<string | number | null>(
    null,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedDoc]);

  const pendingCount = docs.filter((d) => d.paymentStatus === "pending").length;
  const verifiedCount = docs.filter(
    (d) => d.paymentStatus === "verified",
  ).length;
  const rejectedCount = docs.filter(
    (d) => d.paymentStatus === "rejected",
  ).length;

  const filteredDocs = docs
    .filter((d) => {
      if (filter === "pending") return d.paymentStatus === "pending";
      if (filter === "verified") return d.paymentStatus === "verified";
      if (filter === "rejected") return d.paymentStatus === "rejected";
      return true;
    })
    .filter((d) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        d.registrationCode?.toLowerCase().includes(q) ||
        d.fullName?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q) ||
        d.institution?.toLowerCase().includes(q) ||
        d.selectedLocation?.toLowerCase().includes(q)
      );
    });

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/observe-moon-night/verify");
      const data = await res.json();
      if (res.ok && data.docs) {
        setDocs(data.docs);
        toast.success("Submissions refreshed");
      }
    } catch (e) {
      toast.error("Failed to refresh data");
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleVerify(
    id: string | number,
    action: "approve" | "reject",
  ) {
    setProcessingId(id);
    try {
      const res = await fetch("/api/observe-moon-night/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification action failed");
      }

      setDocs((prev) =>
        prev.map((doc) => {
          if (doc.id === id) {
            return {
              ...doc,
              paymentStatus: action === "approve" ? "verified" : "rejected",
              status: action === "approve" ? "confirmed" : "cancelled",
            };
          }
          return doc;
        }),
      );

      if (action === "approve") {
        toast.success("Payment verified & confirmation email sent!");
      } else {
        toast.error("Payment rejected & notification email sent.");
      }

      // Auto-close drawer on action
      setSelectedDoc(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to process action");
    } finally {
      setProcessingId(null);
    }
  }

  function getSlipUrl(slip: RegistrationItem["paymentSlip"]): string | null {
    if (!slip) return null;
    if (typeof slip === "object" && slip.url) {
      return slip.url;
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono py-8 px-4 md:px-8 relative overflow-x-hidden">
      {/* Background Vertical Guide Lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl border-x border-border/60 pointer-events-none z-0 opacity-60" />

      <div className="max-w-[1400px] mx-auto space-y-6 relative z-10">
        {/* Navigation Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Site</span>
          </Link>
        </div>

        {/* Main Surface Container */}
        <div className="relative">
          {/* Hairline Bleed Lines */}
          <div className="absolute -left-4 -right-4 top-0 border-t border-border/80 pointer-events-none" />
          <div className="absolute -left-4 -right-4 bottom-0 border-b border-border/80 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 left-0 border-l border-border/80 pointer-events-none" />
          <div className="absolute -top-4 -bottom-4 right-0 border-r border-border/80 pointer-events-none" />

          <div className="border border-border bg-card text-card-foreground shadow-2xl p-6 md:p-10 relative z-10 space-y-8 rounded-none">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground font-mono">
                  Payment Verification
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  Logged in as{" "}
                  <span className="text-primary font-bold">
                    {currentUserEmail}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border text-xs font-bold uppercase inline-flex items-center gap-2 transition-colors rounded-none"
                >
                  <RefreshCw
                    className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                  />{" "}
                  Refresh
                </button>
              </div>
            </div>

            {/* Metrics Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              {[
                {
                  label: "Pending",
                  count: pendingCount,
                  active: filter === "pending",
                  filterKey: "pending" as const,
                },
                {
                  label: "Verified",
                  count: verifiedCount,
                  active: filter === "verified",
                  filterKey: "verified" as const,
                },
                {
                  label: "Rejected",
                  count: rejectedCount,
                  active: filter === "rejected",
                  filterKey: "rejected" as const,
                },
                {
                  label: "All",
                  count: docs.length,
                  active: filter === "all",
                  filterKey: "all" as const,
                },
              ].map((card) => (
                <button
                  type="button"
                  key={card.label}
                  onClick={() => setFilter(card.filterKey)}
                  className={`p-4 text-left border rounded-none transition-all ${
                    card.active
                      ? "bg-primary/10 text-foreground border-primary font-extrabold"
                      : "bg-muted/30 text-card-foreground border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="text-2xl font-black tracking-tight mt-1">
                    {card.count}
                  </p>
                </button>
              ))}
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-muted/20 p-4 border border-border rounded-none font-mono">
              <div className="flex items-center gap-1 text-xs overflow-x-auto">
                {(["pending", "all", "verified", "rejected"] as const).map(
                  (tab) => (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-3.5 py-1.5 font-bold uppercase tracking-wider text-[11px] rounded-none border transition-colors ${
                        filter === tab
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-background border border-border pl-9 pr-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-full sm:w-64 rounded-none font-mono"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Data Table */}
            <div className="border border-border overflow-x-auto rounded-none">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                    <th className="py-3.5 px-4">Pass Code</th>
                    <th className="py-3.5 px-4">Participant</th>
                    <th className="py-3.5 px-4">Institution / Site</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-muted-foreground font-mono text-xs"
                      >
                        No registrations found.
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((item) => {
                      const isProcessing = processingId === item.id;

                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedDoc(item)}
                          className="hover:bg-muted/40 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-4 font-black text-primary whitespace-nowrap tracking-wider">
                            {item.registrationCode || `ID-${item.id}`}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-foreground">
                              {item.fullName}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {item.email}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-foreground font-bold">
                              {item.institution || "—"}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {item.selectedLocation || "—"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {item.paymentStatus === "verified" && (
                              <span className="font-bold text-[10px] uppercase text-emerald-500">
                                Verified
                              </span>
                            )}
                            {item.paymentStatus === "pending" && (
                              <span className="font-bold text-[10px] uppercase text-amber-500">
                                Pending
                              </span>
                            )}
                            {item.paymentStatus === "rejected" && (
                              <span className="font-bold text-[10px] uppercase text-destructive">
                                Rejected
                              </span>
                            )}
                            {item.paymentStatus === "n/a" && (
                              <span className="font-bold text-[10px] uppercase text-muted-foreground">
                                Free
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDoc(item);
                                }}
                                className="px-2.5 py-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border text-[10px] font-bold uppercase transition-colors rounded-none"
                              >
                                Review
                              </button>
                              {item.paymentStatus === "pending" && (
                                <>
                                  <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVerify(item.id, "approve");
                                    }}
                                    className="px-2.5 py-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-[10px] uppercase transition-colors disabled:opacity-50 rounded-none inline-flex items-center gap-1"
                                  >
                                    {isProcessing && (
                                      <Loader2 className="size-3 animate-spin" />
                                    )}
                                    Approve
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVerify(item.id, "reject");
                                    }}
                                    className="px-2.5 py-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold text-[10px] uppercase transition-colors disabled:opacity-50 rounded-none"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Right Slide-Over Drawer with Framer Motion */}
      <AnimatePresence>
        {selectedDoc && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedDoc(null)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs"
            />

            {/* Framer Motion Slide-Over Panel (Right Drawer) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[600px] max-w-full bg-card text-card-foreground border-l border-border shadow-2xl flex flex-col justify-between font-mono text-xs overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-muted text-foreground shrink-0">
                <div>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest block">
                    Registration Pass Code
                  </span>
                  <span className="text-xl font-black font-mono tracking-wider text-primary">
                    {selectedDoc.registrationCode}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase px-2 py-0.5 bg-background border border-border">
                    {selectedDoc.paymentStatus}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(null)}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-none"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-background">
                {/* Participant Info */}
                <div className="bg-card border border-border p-4 space-y-3">
                  <h3 className="text-xs font-black uppercase text-foreground tracking-wider border-b border-border/50 pb-2">
                    Participant Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Full Name
                      </span>
                      <span className="font-extrabold text-foreground">
                        {selectedDoc.fullName}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Email Address
                      </span>
                      <span className="font-bold text-primary break-all">
                        {selectedDoc.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Phone Number
                      </span>
                      <span className="text-foreground">
                        {selectedDoc.phone || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Institution
                      </span>
                      <span className="text-foreground font-bold">
                        {selectedDoc.institution}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Logistics */}
                <div className="bg-card border border-border p-4 space-y-3">
                  <h3 className="text-xs font-black uppercase text-foreground tracking-wider border-b border-border/50 pb-2">
                    Event Logistics & Preferences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Observation Location
                      </span>
                      <span className="text-foreground font-bold">
                        {selectedDoc.selectedLocation || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Attendance Mode
                      </span>
                      <span className="text-foreground uppercase">
                        {selectedDoc.attendanceMode || "in-person"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Equipment Brought
                      </span>
                      <span className="text-foreground">
                        {selectedDoc.equipment || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Meal Preference
                      </span>
                      <span className="text-foreground">
                        {selectedDoc.mealPreference || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-card border border-border p-4 space-y-3">
                  <h3 className="text-xs font-black uppercase text-foreground tracking-wider border-b border-border/50 pb-2">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Name
                      </span>
                      <span className="text-foreground font-bold">
                        {selectedDoc.emergencyContactName || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Phone
                      </span>
                      <span className="text-foreground">
                        {selectedDoc.emergencyContactPhone || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider block">
                        Relationship
                      </span>
                      <span className="text-foreground">
                        {selectedDoc.emergencyContactRelation || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Slip Receipt File */}
                <div className="bg-card border border-border p-4 space-y-3">
                  <h3 className="text-xs font-black uppercase text-foreground tracking-wider border-b border-border/50 pb-2">
                    Payment Slip Receipt File
                  </h3>

                  {getSlipUrl(selectedDoc.paymentSlip) ? (
                    <div className="space-y-3">
                      {getSlipUrl(selectedDoc.paymentSlip)?.match(
                        /\.(jpg|jpeg|png|webp|gif)$/i,
                      ) ||
                      (typeof selectedDoc.paymentSlip === "object" &&
                        selectedDoc.paymentSlip?.mimeType?.startsWith(
                          "image/",
                        )) ? (
                        <div className="relative max-h-96 overflow-auto flex items-center justify-center bg-background border border-border p-2">
                          <img
                            src={getSlipUrl(selectedDoc.paymentSlip)!}
                            alt="Payment Receipt Slip"
                            className="max-h-88 w-auto object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-muted border border-border">
                          <FileText className="size-8 text-primary" />
                          <div>
                            <p className="font-bold text-foreground">
                              PDF / Document File
                            </p>
                            <p className="text-muted-foreground text-[10px]">
                              Click link below to inspect
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <a
                          href={getSlipUrl(selectedDoc.paymentSlip)!}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-extrabold uppercase tracking-wider"
                        >
                          Open Original File{" "}
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 bg-muted/40 border border-border text-muted-foreground text-center text-xs">
                      No payment slip attached to this submission.
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Bottom Action Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted flex items-center justify-between gap-4 shrink-0">
                <div className="text-xs font-mono">
                  <span className="text-muted-foreground uppercase">
                    Status:{" "}
                  </span>
                  <span className="font-extrabold uppercase text-foreground">
                    {selectedDoc.paymentStatus}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={processingId === selectedDoc.id}
                    onClick={() => handleVerify(selectedDoc.id, "reject")}
                    className="px-5 py-2.5 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold text-xs uppercase border border-border transition-colors disabled:opacity-50 rounded-none"
                  >
                    Reject Payment
                  </button>
                  <button
                    type="button"
                    disabled={processingId === selectedDoc.id}
                    onClick={() => handleVerify(selectedDoc.id, "approve")}
                    className="px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs uppercase inline-flex items-center gap-2 transition-colors disabled:opacity-50 rounded-none"
                  >
                    {processingId === selectedDoc.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                    Approve & Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
