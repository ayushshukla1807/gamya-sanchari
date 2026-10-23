import { getJourneyPresentation } from "@/lib/journey-presentation";
import type { DepartureStatus } from "@/types/travel";

export default function JourneyStatusBadge({
  status,
}: {
  status: DepartureStatus;
}) {
  const { badge } = getJourneyPresentation(status);

  return (
    <span className="inline-flex items-center rounded-full border border-current/25 bg-white/90 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-[#3f2a20] shadow-sm" data-departure-status={status}>
      {badge}
    </span>
  );
}
