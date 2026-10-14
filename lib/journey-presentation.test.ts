import { getJourneyPresentation } from "@/lib/journey-presentation";

describe("getJourneyPresentation", () => {
  it.each([
    ["enquire", "Enquire now", "Enquire now"],
    [
      "next-on-request",
      "Next departure on request",
      "Ask for the next departure",
    ],
    ["previous", "Previous departure", "Ask for the next departure"],
  ] as const)(
    "maps %s to honest availability and enquiry copy",
    (status, badge, cta) => {
      expect(getJourneyPresentation(status)).toEqual({
        badge,
        cta,
        enquiryIntent:
          status === "enquire"
            ? "I’d like to plan this journey"
            : "Please share the next departure",
      });
    },
  );
});
