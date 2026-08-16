"use client";

import type { PayloadAdminBarProps } from "@payloadcms/admin-bar";

import { cn } from "@/utilities/cn";
import { useSelectedLayoutSegments } from "next/navigation";
import { PayloadAdminBar } from "@payloadcms/admin-bar";
import React, { useState } from "react";
import type { User } from "@/payload-types";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
  chapters: {
    plural: "Chapters",
    singular: "Chapter",
  },
  divisions: {
    plural: "Divisions",
    singular: "Division",
  },
  orders: {
    plural: "Orders",
    singular: "Order",
  },
  products: {
    plural: "Products",
    singular: "Product",
  },
  users: {
    plural: "Users",
    singular: "User",
  },
  categories: {
    plural: "Categories",
    singular: "Category",
  },
};

const Title: React.FC = () => (
  <div className="flex items-center gap-2 font-semibold text-xs text-white uppercase tracking-wider">
    <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded text-[10px] font-bold">
      SEDS
    </span>
    <span>Admin Bar</span>
  </div>
);

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error - todo fix, not sure why this is erroring
  const collection = collectionLabels?.[segments?.[1]]
    ? segments?.[1]
    : "pages";

  const onAuthChange = React.useCallback((user: User) => {
    const canSeeAdmin =
      user?.roles &&
      Array.isArray(user?.roles) &&
      user?.roles?.includes("admin");

    setShow(Boolean(canSeeAdmin));
  }, []);

  return (
    <div
      className={cn("py-2 bg-black text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
          collectionLabels={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error - todo fix, not sure why this is erroring
            plural: collectionLabels[collection]?.plural || "Pages",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error - todo fix, not sure why this is erroring
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Title />}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error - todo fix, not sure why this is erroring
          onAuthChange={onAuthChange}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
