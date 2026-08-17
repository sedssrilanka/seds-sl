import Image from "next/image";
import { cn } from "@/lib/utils";

const SEDSSL = (
  props: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
    src?: string;
    alt?: string;
    className?: string;
  },
) => (
  <Image
    width={200}
    height={200}
    alt={props.alt || "Logo"}
    src={props.src || "/logo/main-white.png"}
    {...props}
    className={cn("w-auto h-full max-h-full object-contain", props.className)}
  />
);

export default SEDSSL;
