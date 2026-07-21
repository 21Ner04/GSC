"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
      if (prev) return prev; // уже закрывается

      const exitDuration = prefersReducedMotion ? 0 : 850;

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

    // ===== ВРЕМЯ ПОКАЗА АНИМАЦИИ =====
    const showDuration = prefersReducedMotion ? 800 : 5100; // 5 секунд

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

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        role="dialog"
        aria-modal="true"
        aria-label="Green Street Capital intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.85,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        onClick={handleExit}
      >
        {/* Кнопка Skip */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
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
        </button>

        {/* Контент с красивой анимацией закрытия */}
        <motion.div
          initial={
            prefersReducedMotion
              ? {}
              : { scale: 0.85, opacity: 0, y: 30 }
          }
          animate={
            isExiting
              ? {
                  scale: 0.7,
                  opacity: 0,
                  y: -50,
                }
              : {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex flex-col items-center px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <GifWithFallback />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GifWithFallback() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
      {!imgError ? (
        <video
          src="/logo%20gif.gif.mp4"
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setImgError(true)}
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