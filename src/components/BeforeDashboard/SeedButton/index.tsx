"use client";

import type React from "react";
import { Fragment, useCallback, useState, type MouseEvent } from "react";
import { toast } from "@payloadcms/ui";

import "./index.scss";

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{" "}
    <a target="_blank" href="/" rel="noopener">
      visit your website
    </a>
  </div>
);

const collections = [
  "media",
  "forms",
  "pages",
  "divisions",
  "chapters",
  "projects",
];

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [currentStep, setCurrentStep] = useState<string>("");

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (seeded) {
        toast.info("Database already seeded.");
        return;
      }
      if (loading) {
        toast.info("Seeding already in progress.");
        return;
      }
      if (error) {
        toast.error("An error occurred, please refresh and try again.");
        return;
      }

      setLoading(true);
      setError(null);

      toast.promise(
        (async () => {
          try {
            for (let i = 0; i < collections.length; i++) {
              const coll = collections[i];
              setCurrentStep(
                `${i + 1}/${collections.length}: Seeding ${coll}...`,
              );
              const res = await fetch(`/next/seed?collection=${coll}`, {
                method: "POST",
                credentials: "include",
              });
              if (!res.ok) {
                throw new Error(`Failed to seed ${coll}`);
              }
            }
            setSeeded(true);
            setCurrentStep("Done!");
          } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
          }
        })(),
        {
          loading: "Starting sequential seeding process...",
          success: <SuccessMessage />,
          error: "An error occurred while seeding.",
        },
      );
    },
    [loading, seeded, error],
  );

  let message = "";
  if (loading && !seeded && !error) message = ` (${currentStep})`;
  else if (seeded) message = " (done!)";
  else if (error) message = ` (error: ${error})`;

  return (
    <Fragment>
      <button
        className="seedButton"
        type="button"
        onClick={handleClick}
        disabled={loading || seeded}
      >
        Seed your database
      </button>
      {message}
    </Fragment>
  );
};
