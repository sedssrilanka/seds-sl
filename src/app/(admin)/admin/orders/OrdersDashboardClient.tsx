"use client";

import {
  Package,
  ExternalLink,
  Mail,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  total_amount_lkr: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  payment_status: "unpaid" | "receipt_uploaded" | "paid" | "refunded";
  payment_receipt_url?: string;
  items: { title: string; quantity: number; price: number }[];
}

export function OrdersDashboardClient({
  initialOrders = [],
}: {
  initialOrders?: Order[];
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-400" /> Store & Order Management
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Merchandise orders are captured directly via Tally and automated notification emails are dispatched via Resend.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              onClick={() => window.open("/admin/emails", "_blank")}
            >
              <Mail className="w-4 h-4 mr-2" /> Email Templates Studio
            </Button>
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              onClick={() => window.open("https://tally.so/forms", "_blank")}
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Open Tally Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              onClick={() => window.open("/keystatic/collection/products", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Manage Products (Keystatic)
            </Button>
          </div>
        </div>

        {/* Tally / Resend Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                T
              </div>
              <div>
                <h3 className="font-semibold text-white">Tally Form Orders</h3>
                <p className="text-xs text-zinc-400">Direct order submissions & uploaded slips</p>
              </div>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Every merchandise order submitted on the website goes directly into your Tally workspace. You can export responses to CSV, Excel, or Google Sheets anytime.
            </p>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto"
              onClick={() => window.open("https://tally.so/forms", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> View Submissions on Tally
            </Button>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Resend Email Delivery</h3>
                <p className="text-xs text-zinc-400">Automated buyer & team alerts</p>
              </div>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              When an order webhook arrives from Tally, an order summary is sent to the customer and an instant notification with payment slip link is sent to the team inbox.
            </p>
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 w-full sm:w-auto"
              onClick={() => window.open("https://resend.com/emails", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Open Resend Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
