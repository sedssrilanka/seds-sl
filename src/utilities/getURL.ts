import { canUseDOM } from "./canUseDOM";

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL || process.env.WEBSITE_URL;

  // In production, if url is empty or localhost, force official domain
  if (
    process.env.NODE_ENV === "production" &&
    (!url || url.includes("localhost"))
  ) {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://sedssl.org";
  }

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    return "https://sedssl.org";
  }

  return url;
};

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.WEBSITE_URL ||
    "https://sedssl.org"
  );
};
