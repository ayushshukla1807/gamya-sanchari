"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

import { useMotionPolicy } from "@/components/motion/MotionProvider";

interface KineticTextProps {
  readonly accentWords?: readonly string[];
  readonly as?: Extract<ElementType, "h1" | "h2" | "h3" | "p" | "span">;
  readonly className?: string;
  readonly text: string;
}

function normaliseWord(word: string) {
  return word.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

export default function KineticText({
  accentWords = [],
  as: Component = "span",
  className,
  text,
}: KineticTextProps) {
  const policy = useMotionPolicy();
  const canAnimate =
    policy.kineticText && typeof IntersectionObserver !== "undefined";
  const accents = new Set(accentWords.map(normaliseWord));
  const words = text.trim().split(/\s+/);

  return (
    <Component
      aria-label={text}
      className={className}
      data-motion="kinetic-text"
      data-motion-enabled={canAnimate ? "true" : "false"}
    >
      <span aria-hidden="true">
        {words.map((word, index) => {
          const accented = accents.has(normaliseWord(word));
          return (
            <span
              className="inline-block overflow-hidden align-bottom"
              key={`${word}-${index}`}
            >
              <motion.span
                className={`inline-block ${accented ? "text-shimmer" : ""}`}
                data-accent={accented ? "true" : undefined}
                data-motion="kinetic-word"
                initial={canAnimate ? { opacity: 0, y: "0.8em" } : false}
                transition={{
                  delay: Math.min(index * 0.045, 0.36),
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ amount: 0.72, once: true }}
                whileInView={canAnimate ? { opacity: 1, y: 0 } : undefined}
              >
                {word}
                {index < words.length - 1 ? "\u00a0" : ""}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
