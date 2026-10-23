"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useMotionPolicy } from "@/components/motion/MotionProvider";

export default function ScrollProgress() {
  const policy = useMotionPolicy();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 34,
    mass: 0.22,
    stiffness: 220,
  });

  if (!policy.scrollProgress) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-[linear-gradient(90deg,#a63d24_0%,#d9a441_38%,#f5ad56_72%,#f06619_100%)] shadow-[0_0_18px_rgba(245,173,86,0.55)]"
      data-motion="scroll-progress"
      data-motion-enabled="true"
      data-testid="scroll-progress"
      style={{ scaleX }}
    />
  );
}
