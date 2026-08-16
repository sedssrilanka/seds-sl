import type { OrderStatus as StatusOptions } from "@/payload-types";
import { cn } from "@/utilities/cn";

type Props = {
  status?: StatusOptions | "pending" | string | null;
  className?: string;
};

export const OrderStatus: React.FC<Props> = ({ status, className }) => {
  if (!status) return null;

  const labelMap: Record<string, string> = {
    pending: "Pending Review",
    processing: "Processing",
    completed: "Completed",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };

  const currentStatus = String(status);

  return (
    <div
      className={cn(
        "text-xs tracking-wider font-medium px-2.5 py-1 rounded-md w-fit border inline-flex items-center gap-1.5",
        className,
        {
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20":
            currentStatus === "pending",
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20":
            currentStatus === "processing",
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20":
            currentStatus === "completed",
          "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20":
            currentStatus === "cancelled",
        },
      )}
    >
      {labelMap[currentStatus] || currentStatus}
    </div>
  );
};
