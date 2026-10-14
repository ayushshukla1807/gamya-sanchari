import {
  buildRequestCallUrl,
  buildWhatsAppUrl,
} from "./whatsapp";

function readMessage(url: string) {
  const parsed = new URL(url);
  return {
    number: parsed.pathname.slice(1),
    message: parsed.searchParams.get("text"),
  };
}

describe("buildWhatsAppUrl", () => {
  it("targets the Gamya Sanchari WhatsApp number", () => {
    const result = readMessage(
      buildWhatsAppUrl({
        name: "Ananya",
        phone: "+91 90000 00000",
        message: "Plan a trip",
      }),
    );

    expect(result.number).toBe("918073254766");
  });

  it("round-trips reserved characters, Kannada, emoji, and line breaks", () => {
    const result = readMessage(
      buildWhatsAppUrl({
        name: "Asha & Ravi",
        phone: "+91 90000 00000",
        email: "asha+ravi@example.com",
        context: "ಗಮ್ಯ ಸಂಚಾರಿ ✨",
        message: "Beach + hills?\nYes & yes!",
      }),
    );

    expect(result.message).toBe(
      "Hi Gamya Sanchari!\n\nName: Asha & Ravi\nPhone: +91 90000 00000\nEmail: asha+ravi@example.com\nInterested in: ಗಮ್ಯ ಸಂಚಾರಿ ✨\nMessage: Beach + hills?\nYes & yes!",
    );
  });

  it("includes destination or service context", () => {
    const result = readMessage(
      buildWhatsAppUrl({
        name: "Kiran",
        phone: "9988776655",
        context: "South India",
        message: "Four nights",
      }),
    );

    expect(result.message).toContain("Interested in: South India");
  });

  it("omits the email line when optional email is blank", () => {
    const result = readMessage(
      buildWhatsAppUrl({
        name: "Meera",
        phone: "9988776655",
        email: "   ",
        message: "A family holiday",
      }),
    );

    expect(result.message).not.toContain("Email:");
    expect(result.message).not.toContain("undefined");
  });
});

describe("buildRequestCallUrl", () => {
  it("trims the submitted number without changing its readable formatting", () => {
    const phone = "  +91 80732 54766  ";
    const result = readMessage(buildRequestCallUrl(phone));

    expect(phone).toBe("  +91 80732 54766  ");
    expect(result.message).toBe(
      "Hi Gamya Sanchari! Please call me back on +91 80732 54766.",
    );
  });
});
