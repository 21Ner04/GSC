"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Временно отключаем кэширование для тестирования анимации
    // const hasSeenIntro = sessionStorage.getItem("hasSeenGSCIntro");
    // if (!hasSeenIntro) {
      setShow(true);
      sessionStorage.setItem("hasSeenGSCIntro", "true");
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    // }
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
            <div className="w-48 h-48 md:w-64 md:h-64 mb-8 rounded-full overflow-hidden">
              <Image src="/img_2841.png" alt="Green Street Capital" width={256} height={256} className="w-full h-full object-contain" />
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
