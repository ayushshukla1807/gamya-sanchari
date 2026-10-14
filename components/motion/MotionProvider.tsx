"use client";

import { useReducedMotion } from "framer-motion";
import { createContext, useContext, useMemo } from "react";

export interface MotionPolicy {
  readonly reduced: boolean;
  readonly pageTransition: boolean;
  readonly revealOffset: number;
  readonly parallax: boolean;
  readonly smoothScroll: boolean;
  readonly routeDrawing: boolean;
  readonly autoAnnouncements: boolean;
  readonly kineticText: boolean;
  readonly scrollProgress: boolean;
}

export function getMotionPolicy(reduced: boolean): MotionPolicy {
  return {
    reduced,
    pageTransition: !reduced,
    revealOffset: reduced ? 0 : 24,
    parallax: !reduced,
    smoothScroll: !reduced,
    routeDrawing: !reduced,
    autoAnnouncements: !reduced,
    kineticText: !reduced,
    scrollProgress: !reduced,
  };
}

const MotionPolicyContext = createContext<MotionPolicy | null>(null);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion() === true;
  const policy = useMemo(
    () => getMotionPolicy(prefersReducedMotion),
    [prefersReducedMotion],
  );

  return (
    <MotionPolicyContext.Provider value={policy}>
      {children}
    </MotionPolicyContext.Provider>
  );
}

export function useMotionPolicy() {
  const inherited = useContext(MotionPolicyContext);
  const systemReducedMotion = useReducedMotion() === true;
  return inherited ?? getMotionPolicy(systemReducedMotion);
}
