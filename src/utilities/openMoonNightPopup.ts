"use client";

/**
 * Opens the Tally registration popup modal for Observe the Moon Night 2026.
 */
export function openMoonNightPopup() {
  if (typeof window === "undefined") return;

  // Ensure script is loaded
  const scriptSrc = "https://tally.so/widgets/embed.js";
  if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }

  const lockBodyScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.documentElement.style.overflow = "";
  };

  // Setup DOM observer to unlock scroll if user closes popup via ESC or backdrop click
  const observer = new MutationObserver(() => {
    const hasTallyPopup = Boolean(
      document.querySelector(
        "iframe[src*='tally.so'], [data-tally-popup], .tally-popup",
      ),
    );
    if (!hasTallyPopup) {
      unlockBodyScroll();
      observer.disconnect();
    }
  });

  const popupConfig = {
    layout: "default",
    width: 600,
    autoClose: 5000,
    hideTitle: true,
    emoji: {
      text: "🌙",
      animation: "none",
    },
    onOpen: () => {
      lockBodyScroll();
      observer.observe(document.body, { childList: true, subtree: true });
    },
    onClose: () => {
      unlockBodyScroll();
      observer.disconnect();
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tally = (window as any).Tally;
  if (typeof tally !== "undefined") {
    try {
      tally.closePopup("vGl0pX");
    } catch {}

    lockBodyScroll();
    observer.observe(document.body, { childList: true, subtree: true });
    tally.openPopup("vGl0pX", popupConfig);
  } else {
    // Wait a brief moment for script to execute, else fallback
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const t = (window as any).Tally;
      if (typeof t !== "undefined") {
        lockBodyScroll();
        observer.observe(document.body, { childList: true, subtree: true });
        t.openPopup("vGl0pX", popupConfig);
      } else {
        window.open(
          "https://tally.so/r/vGl0pX",
          "_blank",
          "noopener,noreferrer",
        );
      }
    }, 200);
  }
}
