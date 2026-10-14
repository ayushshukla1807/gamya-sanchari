"use client";

import { motion } from "framer-motion";

import { useMotionPolicy } from "@/components/motion/MotionProvider";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const policy = useMotionPolicy();
  return (
    <div
      data-motion="page-transition"
      data-motion-enabled={policy.pageTransition ? "true" : "false"}
      data-testid="page-transition"
      id="main-content"
      tabIndex={-1}
    >
      <motion.div
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        data-testid="page-transition-motion"
        initial={
          policy.pageTransition
            ? { opacity: 0, y: 14, filter: "blur(5px)" }
            : false
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
