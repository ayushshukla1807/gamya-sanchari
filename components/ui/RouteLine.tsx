export default function RouteLine({ stops }: { stops: readonly string[] }) {
  return (
    <div className="relative" data-motion="route-line">
      <span aria-hidden="true" className="absolute left-4 right-4 top-4 h-px bg-gradient-to-r from-[#1844ef] via-[#f5ad56] to-[#f06619] motion-safe:origin-left motion-safe:animate-[route-draw_var(--motion-cinematic)_var(--ease-travel)_both]" />
      <ol className="relative grid gap-5 sm:grid-flow-col sm:auto-cols-fr">
        {stops.map((stop, index) => (
          <li className="grid gap-3 text-sm font-extrabold text-[#0b1633]" key={stop}>
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-full border border-[#1844ef]/20 bg-white text-xs text-[#1844ef] shadow-[var(--shadow-soft)]">
              {index + 1}
            </span>
            <span>{stop}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
