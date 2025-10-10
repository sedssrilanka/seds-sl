"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// This component is for development/testing purposes only
export function EmailPreview() {
  const [isLoading, setIsLoading] = useState(false);

  const testEmailData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    reasons: ["membership", "contribution"],
    message:
      "Hello! I'm interested in joining SEDS Sri Lanka and contributing to your space exploration projects. I have a background in aerospace engineering and would love to get involved with your rocketry division.",
  };

  const sendTestEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testEmailData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Test email sent successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={sendTestEmail}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-border"
      >
        {isLoading ? "Sending..." : "📧 Test Email"}
      </Button>
    </div>
  );
}
