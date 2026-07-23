"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/** Duration of the exit choreography (ms). Keep in sync with motion transitions. */
const EXIT_DURATION_MS = 800;
/** Fallback if video never fires `ended` (ms). */
const SHOW_FALLBACK_MS = 5100;

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleExit = useCallback(() => {
    setIsExiting((prev) => {
      if (prev) return prev;

      const exitDuration = prefersReducedMotion ? 0 : EXIT_DURATION_MS;

      setTimeout(() => {
        setShow(false);
      }, exitDuration);

      return true;
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenGSCIntro");

    if (hasSeenIntro) {
      setShow(false);
      return;
    }

    sessionStorage.setItem("hasSeenGSCIntro", "true");

    // Safety net if the video fails to fire `ended`
    const showDuration = prefersReducedMotion ? 800 : SHOW_FALLBACK_MS;

    const timer = setTimeout(() => {
      handleExit();
    }, showDuration);

    return () => clearTimeout(timer);
  }, [handleExit, prefersReducedMotion]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleExit]);

  if (!show) return null;

  const reduced = prefersReducedMotion;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        role="dialog"
        aria-modal="true"
        aria-label="Green Street Capital intro"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isExiting ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{
          // Overlay fades a bit later / longer so the logo exit reads first
          duration: reduced ? 0 : isExiting ? 1.25 : 0.4,
          delay: reduced || !isExiting ? 0 : 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        onClick={handleExit}
      >
        {/* Skip */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{
            duration: reduced ? 0 : isExiting ? 0.25 : 0.4,
            delay: reduced || isExiting ? 0 : 0.3,
          }}
          className="
            absolute top-4 right-4
            flex items-center gap-1.5
            rounded-full bg-gray-800
            px-3 py-1.5 sm:px-4 sm:py-2
            text-xs sm:text-sm font-medium text-gray-300
            hover:bg-gray-700 active:bg-gray-600
            transition-colors z-10
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
          aria-label="Skip intro animation"
        >
          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          Skip
        </motion.button>

        {/* Logo / GIF — exits first with scale + fade + slight lift */}
        <motion.div
          initial={reduced ? {} : { scale: 0.88, opacity: 0, y: 24 }}
          animate={
            isExiting
              ? {
                  scale: 0.82,
                  opacity: 0,
                  y: -28,
                  filter: "blur(8px)",
                }
              : {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
          }
          transition={
            isExiting
              ? {
                  duration: reduced ? 0 : 1.05,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: reduced ? 0 : 0.9, ease: "easeOut" },
                  filter: { duration: reduced ? 0 : 0.95, ease: "easeOut" },
                }
              : {
                  duration: reduced ? 0 : 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="flex flex-col items-center px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <GifWithFallback onEnded={handleExit} isExiting={isExiting} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GifWithFallback({
  onEnded,
  isExiting,
}: {
  onEnded: () => void;
  isExiting: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
      {!imgError ? (
        <video
          src="/logo%20gif.gif.mp4"
          className="h-full w-full object-contain"
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            opacity: isExiting ? 0.95 : 1,
            transition: "opacity 0.3s ease",
            // Prefer crisp scaling on high-DPI screens
            imageRendering: "auto",
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-primary">G</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-white text-center">
            Green Street Capital
          </p>
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Mortgage Solutions
          </p>
        </div>
      )}
    </div>
  );
}
