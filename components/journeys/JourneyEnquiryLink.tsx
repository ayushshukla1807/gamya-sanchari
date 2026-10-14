import { getJourneyPresentation } from "@/lib/journey-presentation";
import { buildJourneyWhatsAppUrl } from "@/lib/whatsapp";
import type { Journey } from "@/types/travel";

export default function JourneyEnquiryLink({
  journey,
  className = "inline-flex min-h-11 items-center justify-center rounded-full bg-[#1844ef] px-5 text-sm font-extrabold text-white transition hover:bg-[#f06619]",
}: {
  journey: Journey;
  className?: string;
}) {
  const presentation = getJourneyPresentation(journey.departureStatus);

  return (
    <a
      className={className}
      href={buildJourneyWhatsAppUrl(
        journey.enquiryTopic,
        presentation.enquiryIntent,
      )}
      rel="noreferrer"
      target="_blank"
    >
      {presentation.cta}
    </a>
  );
}
