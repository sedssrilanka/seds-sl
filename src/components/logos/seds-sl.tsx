import Image from "next/image";

const SEDSSL = (
  props: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
    src?: string;
    alt?: string;
  },
) => (
  <Image
    width={120}
    height={120}
    alt={props.alt || "Logo"}
    src={props.src || "/logo/main-white.png"}
    {...props}
  />
);

export default SEDSSL;