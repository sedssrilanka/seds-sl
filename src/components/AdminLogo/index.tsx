import React from "react";
import Image from "next/image";

export const AdminLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 py-1">
      <Image
        alt="SEDS Sri Lanka Logo"
        src="/logo/main-white.png"
        width={120}
        height={36}
        className="h-9 w-auto object-contain"
        priority
      />
      <div className="flex flex-col border-l border-neutral-700 pl-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          SEDS SL
        </span>
        <span className="text-[10px] text-neutral-400 font-mono tracking-tight">
          Admin Portal
        </span>
      </div>
    </div>
  );
};

export const AdminIcon: React.FC = () => {
  return (
    <Image
      alt="SEDS Icon"
      src="/favicon.ico"
      width={24}
      height={24}
      className="size-6 object-contain"
    />
  );
};
