"use client";

import { motion } from "framer-motion";

import { useMotionPolicy } from "@/components/motion/MotionProvider";

export default function RouteLine({ stops }: { stops: readonly string[] }) {
  const motionPolicy = useMotionPolicy();
  const canAnimate =
    motionPolicy.routeDrawing && typeof IntersectionObserver !== "undefined";
  return (
    <div className="relative" data-motion="route-line">
      <motion.span
        aria-hidden="true"
        className="absolute left-4 right-4 top-4 h-px origin-left bg-gradient-to-r from-[#1844ef] via-[#f5ad56] to-[#f06619]"
        data-motion-engine="framer-motion"
        data-motion-trigger="while-in-view"
        data-testid="route-progress"
        initial={canAnimate ? { scaleX: 0, opacity: 0.35 } : false}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ amount: 0.6, once: true }}
        whileInView={canAnimate ? { scaleX: 1, opacity: 1 } : undefined}
      />
      <ol className="relative grid gap-5 sm:grid-flow-col sm:auto-cols-fr">
        {stops.map((stop, index) => (
          <motion.li
            className="grid gap-3 text-sm font-extrabold text-[#0b1633]"
            initial={canAnimate ? { opacity: 0, y: 12 } : false}
            key={stop}
            transition={{ delay: 0.18 + index * 0.1, duration: 0.45 }}
            viewport={{ amount: 0.6, once: true }}
            whileInView={canAnimate ? { opacity: 1, y: 0 } : undefined}
          >
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-full border border-[#1844ef]/20 bg-white text-xs text-[#1844ef] shadow-[var(--shadow-soft)]">
              {index + 1}
            </span>
            <span>{stop}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
