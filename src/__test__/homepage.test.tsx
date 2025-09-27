import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionOne from "@/components/sections/home-page/section-one/";

describe("SectionOne", () => {
  it("renders the main heading", () => {
    render(<SectionOne />);
    const heading = screen.getByText(/Be a Part of the Largest/i);
    expect(heading).toBeDefined();
  });

  it("renders the two buttons", () => {
    render(<SectionOne />);
    const section = screen.getAllByTestId("section-one")[0];
    const projectsButton = within(section).getByRole("button", {
      name: /Our Projects/i,
    });
    const joinButton = within(section).getByRole("button", {
      name: /Join Us/i,
    });
    expect(projectsButton).toBeDefined();
    expect(joinButton).toBeDefined();
  });
});
