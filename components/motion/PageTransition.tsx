"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useMotionPolicy } from "./MotionProvider";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const policy = useMotionPolicy();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      data-motion={policy.pageTransition ? "page-fade" : "none"}
      id="main-content"
      initial={false}
      key={pathname}
      tabIndex={-1}
      transition={{ duration: policy.pageTransition ? 0.32 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
