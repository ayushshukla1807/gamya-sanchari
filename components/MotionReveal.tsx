"use client";

import { motion } from "framer-motion";

import { useMotionPolicy } from "@/components/motion/MotionProvider";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  hoverLift?: boolean;
}

export default function MotionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  hoverLift = false,
}: MotionRevealProps) {
  const policy = useMotionPolicy();
  const canAnimateInView =
    !policy.reduced && typeof IntersectionObserver !== "undefined";
  const initialByDirection = {
    up: { opacity: 0, y: policy.revealOffset },
    left: { opacity: 0, x: -policy.revealOffset * 1.5 },
    right: { opacity: 0, x: policy.revealOffset * 1.5 },
    scale: { opacity: 0, scale: 0.96 },
  };
  return (
    <motion.div
      className={className}
      data-motion={`reveal-${direction}`}
      data-motion-enabled={canAnimateInView ? "true" : "false"}
      initial={canAnimateInView ? initialByDirection[direction] : false}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.2, once: true }}
      whileHover={hoverLift && !policy.reduced ? { y: -6, scale: 1.01 } : undefined}
      whileInView={
        canAnimateInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined
      }
    >
      {children}
    </motion.div>
  );
}
