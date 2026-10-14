export default function Stamp({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex -rotate-2 items-center rounded-full border border-dashed border-current px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.16em]">
      {children}
    </span>
  );
}
