export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-motion="page-ready"
      id="main-content"
      tabIndex={-1}
    >
      {children}
    </div>
  );
}
