import Image from "next/image";

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="Seds SL Logo"
      className="max-w-[9.375rem] invert dark:invert-0"
      src="/logo/main-white.png"
    />
  );
};
