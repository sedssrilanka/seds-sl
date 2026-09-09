"use client";

import { useState } from "react";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  initialOrders: Order[];
}) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      order.id?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="w-3 h-3 mr-1" /> Processing
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
    }
  };

  const getPaymentBadge = (status: Order["payment_status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400">Paid</Badge>
        );
      case "receipt_uploaded":
        return (
          <Badge className="bg-purple-500/10 text-purple-400">Slip Uploaded</Badge>
        );
      default:
        return (
          <Badge className="bg-zinc-500/10 text-zinc-400">Unpaid</Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-400" /> Orders & Transactions
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage incoming merchandise orders, verify payment receipts, and update fulfillment status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              onClick={() => window.open("/keystatic/collection/products", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Manage Products (Keystatic)
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              placeholder="Search by customer name, email, or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-medium">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total (LKR)</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Order Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-900/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{order.customer_name}</div>
                        <div className="text-xs text-zinc-400">{order.customer_email}</div>
                        <div className="text-xs text-zinc-500">{order.city}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-zinc-300">
                          {Array.isArray(order.items) && order.items.length > 0
                            ? order.items.map((i, idx) => (
                                <span key={idx} className="block">
                                  {i.quantity}x {i.title}
                                </span>
                              ))
                            : "Merchandise item"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        Rs. {Number(order.total_amount_lkr || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {getPaymentBadge(order.payment_status)}
                        {order.payment_receipt_url && (
                          <a
                            href={order.payment_receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-indigo-400 hover:underline mt-1"
                          >
                            View Receipt Slip
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 text-xs text-zinc-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs text-zinc-400 hover:text-white"
                          onClick={() => alert(`Order ID: ${order.id}\nCustomer: ${order.customer_name}\nAddress: ${order.shipping_address}`)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
