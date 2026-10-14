"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function MotionReveal({
  children,
  className,
  delay = 0,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();
  const canAnimateInView =
    !reduceMotion && typeof IntersectionObserver !== "undefined";
  return (
    <motion.div
      className={className}
      initial={canAnimateInView ? { opacity: 0, y: 24 } : false}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={canAnimateInView ? { opacity: 1, y: 0 } : undefined}
    >
      {children}
    </motion.div>
  );
}
