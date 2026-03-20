"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenGSCIntro");
    if (!hasSeenIntro) {
      setShow(true);
      sessionStorage.setItem("hasSeenGSCIntro", "true");
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-36 h-36 md:w-48 md:h-48 mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground text-center tracking-tight">
              Green Street <span className="text-primary">Capital</span>
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
