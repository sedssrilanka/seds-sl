"use client";

import { useEffect, useState } from "react";
import { Timer, Sparkles, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface EventCountdownTimerProps {
  targetDate?: string;
  formattedDateDisplay?: string;
}

export function EventCountdownTimer({
  targetDate,
  formattedDateDisplay,
}: EventCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isEnded: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  });

  useEffect(() => {
    // Default to September 19, 2026 18:30:00 IST (+05:30) if targetDate not passed
    const defaultDateString = "2026-09-19T18:30:00+05:30";
    const target = new Date(targetDate || defaultDateString).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isEnded: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds, isPrimary: true },
  ];

  return (
    <div className="w-full border-b border-border/60 py-12 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        {/* Header Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-widest">
            <Timer className="size-4 text-primary animate-pulse" />
            <span>COUNTDOWN TO LUNAR KICKOFF (SRI LANKA TIME +05:30)</span>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground uppercase hidden sm:block border border-border/60 px-2 py-0.5 bg-background">
            OFFICIAL NASA OBSERVE MOON NIGHT
          </div>
        </div>

        {/* Full Width Segmented Grid Container with Bleeding Lines */}
        <div className="relative w-full">
          {/* Extended Bleeding Lines */}
          <div className="absolute -left-6 -right-6 top-0 border-t border-border/60 pointer-events-none" />
          <div className="absolute -left-6 -right-6 bottom-0 border-b border-border/60 pointer-events-none" />
          <div className="absolute -top-6 -bottom-6 left-0 border-l border-border/60 pointer-events-none" />
          <div className="absolute -top-6 -bottom-6 right-0 border-r border-border/60 pointer-events-none" />

          {timeLeft.isEnded ? (
            <div className="p-8 bg-background text-center border border-border/60 flex items-center justify-center gap-3">
              <Sparkles className="size-6 text-primary animate-spin" />
              <span className="text-xl font-mono font-extrabold uppercase text-primary tracking-wider">
                EVENT IS LIVE NOW IN SRI LANKA!
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/60 border border-border/60 bg-background relative z-10">
              {units.map((unit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 md:p-8 text-center flex flex-col items-center justify-center space-y-2 bg-background hover:bg-muted/10 transition-colors"
                >
                  <div
                    className={`text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono leading-none tracking-tight ${
                      unit.isPrimary
                        ? "text-primary drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                        : "text-foreground"
                    }`}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground pt-1">
                    {unit.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
