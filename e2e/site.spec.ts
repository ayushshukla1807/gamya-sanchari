import { expect, test, type Page } from "@playwright/test";

const destinations = [
  "South India",
  "West India",
  "North India",
  "East India",
  "International",
];

const services = [
  "International Trips",
  "Domestic Trips",
  "Air Tickets",
  "Visa Assistance",
  "Group Tours",
  "Honeymoon Trips",
  "Hotel Booking",
  "Travel Insurance",
];

async function expectWhatsAppPopup(page: Page, action: () => Promise<void>) {
  const popupPromise = page.waitForEvent("popup");
  const outboundRequestPromise = page.context().waitForEvent("request", {
    predicate: (request) => request.url().startsWith("https://wa.me/918073254766"),
  });
  await action();
  const [popup, outboundRequest] = await Promise.all([
    popupPromise,
    outboundRequestPromise,
  ]);
  await expect.poll(() => popup.url()).toMatch(/(?:wa\.me\/918073254766|api\.whatsapp\.com\/send\/\?phone=918073254766)/);
  return { outboundUrl: outboundRequest.url(), popup };
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
});

test("navigation, fixed controls and 360px layout remain operable", async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name === "mobile-360";
  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });

  if (isMobile) {
    const menu = page.locator('button[aria-controls="mobile-navigation"]');
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);

    await menu.click();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await expect(page.getByRole("complementary", { name: "Quick enquiry actions" })).toBeHidden();
  } else {
    await primaryNav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.getByRole("complementary", { name: "Quick enquiry actions" })).toBeVisible();
  }

  await expect(page.locator("#about")).toBeInViewport();
  await expect(page.getByRole("link", { name: "Chat on WhatsApp" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.evaluate(() => window.scrollTo(0, 450));
  await expect(page.getByRole("button", { name: "Back to top" })).toBeVisible();
  await page.getByRole("button", { name: "Back to top" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("every destination and service opens the correct enquiry context", async ({ page }) => {
  for (const title of [...destinations, ...services]) {
    const trigger = page.getByRole("button", {
      name: `Enquire about ${title}`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Plan your journey" });
    await expect(dialog).toContainText(`Enquiring about ${title}`);
    await expect(dialog.getByLabel("Message")).toHaveValue(`I'd like to plan a trip for ${title}.`);
    await dialog.getByRole("button", { name: "Close enquiry" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("modal close paths, focus trap and WhatsApp submissions work", async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name === "mobile-360";
  const trigger = page.getByRole("button", { name: "Enquire about South India" });
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: "Plan your journey" });
  const closeButton = dialog.getByRole("button", { name: "Close enquiry" });
  const submitButton = dialog.getByRole("button", { name: "Continue on WhatsApp" });
  await expect(dialog.getByLabel("Name")).toBeFocused();

  await closeButton.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(submitButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByTestId("enquiry-overlay").dispatchEvent("mousedown");
  await expect(dialog).toHaveCount(0);

  await trigger.click();
  await dialog.getByLabel("Name").fill("Asha & Ravi");
  await dialog.getByLabel("Phone").fill("+91 98765 43210");
  await dialog.getByLabel("Email (optional)").fill("asha@example.com");
  await dialog.getByLabel("Message").fill("Beach + hills 🌴\nPlease call after 6.");
  const { outboundUrl, popup } = await expectWhatsAppPopup(page, () => submitButton.click());
  const decodedUrl = decodeURIComponent(outboundUrl.replace(/\+/g, " "));
  expect(decodedUrl).toContain("Asha & Ravi");
  expect(decodedUrl).toContain("Beach + hills 🌴");
  await popup.close();
  await closeButton.click();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  const callbackInput = page.getByLabel("Phone number for callback");
  await callbackInput.fill("+91 99887 77665");
  const { outboundUrl: callbackUrl, popup: callbackPopup } = await expectWhatsAppPopup(page, () =>
    page.getByRole("button", { name: "Request a Call" }).click(),
  );
  expect(decodeURIComponent(callbackUrl.replace(/\+/g, " "))).toContain("+91 99887 77665");
  await callbackPopup.close();

  if (isMobile) {
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("poster fallback and reduced-motion hero keep final content readable", async ({ page }) => {
  await expect(page.getByTestId("announcement-message")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("GAMYA SANCHARI");

  const heroMedia = page.getByTestId("hero-media");
  await expect(heroMedia).toHaveCSS("background-image", /hero-poster\.webp/);
  const video = page.locator("video");
  await video.dispatchEvent("error");
  await expect(video).toHaveClass(/hidden/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("the cinematic announcement reaches each message", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "One real-timer pass is sufficient.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();

  const announcement = page.getByTestId("announcement-message");
  await expect(announcement).toContainText("captain speaking");
  await expect(announcement).toContainText("descent into your dream destination", { timeout: 3_000 });
  await expect(announcement).toContainText("Your Journey Awaits", { timeout: 3_000 });
  await expect(announcement).toHaveCount(0, { timeout: 3_000 });
});
