import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots.ts metadata route", () => {
  it("returns valid robots rules and sitemap URL", () => {
    const config = robots();

    expect(config).toBeDefined();
    expect(config.rules).toEqual([
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ]);
    expect(config.sitemap).toContain("/sitemap.xml");
  });
});
