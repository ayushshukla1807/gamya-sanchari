"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

import { useMotionPolicy } from "@/components/motion/MotionProvider";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const policy = useMotionPolicy();
  const controls = useAnimationControls();

  useEffect(() => {
    if (!policy.pageTransition) return;

    controls.set({ opacity: 0.94 });
    void controls.start({
      opacity: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    });
  }, [controls, policy.pageTransition]);

  return (
    <motion.div
      animate={controls}
      data-motion="page-transition"
      data-motion-enabled={policy.pageTransition ? "true" : "false"}
      data-testid="page-transition"
      id="main-content"
      initial={false}
      tabIndex={-1}
    >
      {children}
    </motion.div>
  );
}
