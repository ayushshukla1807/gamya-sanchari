"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { EnquiryModal } from "./EnquiryModal";

interface EnquiryContextValue {
  openEnquiry(context?: string): void;
  closeEnquiry(): void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry(): EnquiryContextValue {
  const value = useContext(EnquiryContext);
  if (!value) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return value;
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string>();
  const triggerRef = useRef<HTMLElement | null>(null);

  const openEnquiry = useCallback((nextContext?: string) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setContext(nextContext);
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [closeEnquiry, openEnquiry],
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal
        context={context}
        isOpen={isOpen}
        onClose={closeEnquiry}
      />
    </EnquiryContext.Provider>
  );
}
