"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import type React from "react";

import { getClientSideURL } from "../../utilities/getURL";

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || getClientSideURL()}
    />
  );
};
