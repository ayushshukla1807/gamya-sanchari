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
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
