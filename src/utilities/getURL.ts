import { canUseDOM } from "./canUseDOM";

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL || process.env.WEBSITE_URL;

  // In production, if url is empty or localhost, force official domain
  if (
    process.env.NODE_ENV === "production" &&
    (!url || url.includes("localhost"))
  ) {
    return "https://sedssl.org";
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

  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.WEBSITE_URL ||
    "https://sedssl.org"
  );
};
