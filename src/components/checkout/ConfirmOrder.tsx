"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ConfirmOrder: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const orderID = searchParams.get("orderID");
    const email = searchParams.get("email");

    if (orderID) {
      router.push(`/shop/order/${orderID}${email ? `?email=${email}` : ""}`);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="text-center w-full flex flex-col items-center justify-start gap-4">
      <h1 className="text-2xl">Confirming Order</h1>
      <LoadingSpinner className="w-12 h-6" />
    </div>
  );
};
