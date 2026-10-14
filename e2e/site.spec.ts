import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("nested routes render directly and navigation works on desktop and mobile", async ({ page }, testInfo) => {
  for (const [path, heading] of [
    ["/destinations/kerala/", "Kerala"],
    ["/packages/kerala-easy-pace/", "Kerala at an easy pace"],
    ["/journal/how-to-pace-a-kerala-trip/", "How to pace a Kerala trip without rushing it"],
    ["/spiritual-journeys/", "Spiritual journeys, supported with care"],
    ["/group-departures/", "Group departures with the details connected"],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }

  await page.goto("/");
  if (testInfo.project.name === "mobile-360") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
  }
  await expect(page).toHaveURL(/\/about\/?$/);

  for (const [label, route] of [
    ["Spiritual Journeys", /\/spiritual-journeys\/?$/],
    ["Group Departures", /\/group-departures\/?$/],
  ] as const) {
    await page.goto("/");
    if (testInfo.project.name === "mobile-360") {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: label }).focus();
    } else {
      await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: label }).focus();
    }
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(route);
  }
});

test("skip navigation, reduced motion and media fallbacks preserve all content", async ({ page }) => {
  await page.addInitScript(() => {
    Reflect.deleteProperty(window, "speechSynthesis");
    Reflect.deleteProperty(window, "SpeechSynthesisUtterance");
  });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await skipLink.click();
  await expect(page.locator("#main-content")).toBeFocused();

  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  await expect(page.locator("video")).not.toHaveAttribute("autoplay", "");
  await expect(page.locator("video")).not.toHaveAttribute("loop", "");
  expect(await page.locator("video").evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await expect(page.locator("#main-content")).toHaveCSS("opacity", "1");
  await expect(page.locator("#main-content")).toHaveCSS("transform", "none");
  await expect(page.getByTestId("announcement-message")).toHaveCount(0);
  await expect(page.getByTestId("travel-host")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Mute sound|Start sound/ }),
  ).toBeVisible();
  expect(await page.evaluate(() => "speechSynthesis" in window)).toBe(false);
  await page.getByTestId("host-introduction-audio").dispatchEvent("error");
  await expect(page.getByText("Spoken welcome unavailable")).toBeVisible();
  await expect(page.getByTestId("travel-host-caption")).toContainText("Namaskara");
  const video = page.locator("video");
  await video.dispatchEvent("error");
  await expect(video).toHaveClass(/hidden/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("blocked welcome audio starts on the first intentional visitor gesture", async ({ page }) => {
  await page.addInitScript(() => {
    let attempts = 0;
    HTMLMediaElement.prototype.play = function play() {
      attempts += 1;
      if (attempts <= 2) {
        return Promise.reject(
          new DOMException("Autoplay blocked", "NotAllowedError"),
        );
      }
      return Promise.resolve();
    };
  });
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Start sound" })).toBeVisible();
  await page.getByTestId("travel-host-caption").click();
  await expect(page.getByRole("button", { name: "Mute sound" })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() =>
        sessionStorage.getItem("gamya-sanchari-welcome-played"),
      ),
    )
    .toBe("played");
});

test("kinetic headings preserve visible word spacing", async ({ page }) => {
  await page.goto("/");
  const firstHeadingWords = page
    .getByRole("heading", {
      level: 1,
      name: "Enjoy your holidays with GAMYA SANCHARI",
    })
    .locator('[data-motion="kinetic-word"]');

  const gap = await firstHeadingWords.evaluateAll((words) => {
    const first = words[0]?.getBoundingClientRect();
    const second = words[1]?.getBoundingClientRect();
    return first && second ? second.left - first.right : 0;
  });

  expect(gap).toBeGreaterThan(1);
});

test("reduced motion keeps package imagery static on hover", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile-360",
    "Hover transform is verified in the pointer-capable desktop project.",
  );
  await page.goto("/packages/");
  const card = page.locator('[data-motion="journey-card"]').first();
  const image = card.locator("img");

  await card.hover();
  await expect(image).toHaveCSS("transform", "none");
});

test("official brand artwork and enhanced motion render in normal-motion mode", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  await expect(
    page.locator('header img[src*="gamya-sanchari-emblem"]'),
  ).toBeVisible();
  await expect(
    page.getByAltText("Gamya Sanchari — Your Journey Awaits"),
  ).toBeVisible();
  await expect(page.getByTestId("page-transition")).toHaveAttribute(
    "data-motion-enabled",
    "true",
  );
  await expect(page.getByTestId("page-transition")).toHaveCSS("opacity", "1");
  expect(await page.locator('[data-motion^="reveal-"]').count()).toBeGreaterThanOrEqual(12);
  await expect(page.getByTestId("route-progress").first()).toHaveAttribute(
    "data-motion-engine",
    "framer-motion",
  );

  const previousTransition = await page.getByTestId("page-transition").elementHandle();
  await page.locator("footer").getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
  expect(await previousTransition?.evaluate((element) => element.isConnected)).toBe(
    false,
  );

  if (testInfo.project.name === "mobile-360") {
    await page.goto("/packages/kerala-easy-pace/");
    const stickyAction = page
      .getByRole("link", { name: "Customize This Trip" })
      .last();
    await expect(stickyAction).toBeInViewport();
    expect(
      await stickyAction.evaluate(
        (element) => getComputedStyle(element.parentElement!).position,
      ),
    ).toBe("fixed");
  }
});

test("destination and package filters expose empty and reset states by keyboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Women-only Travel/ }).click();
  await expect(page).toHaveURL(/\/packages\/?\?category=women-only$/);
  await expect(page.getByLabel("Category")).toHaveValue("women-only");
  await expect(page.getByText("1 sample journey found")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Andaman Island Escape" })).toBeVisible();

  await page.goto("/destinations/");
  await page.getByRole("button", { name: "International" }).focus();
  await page.keyboard.press("Enter");
  await page.getByLabel("Region").selectOption({ label: "South India" });
  await expect(page.getByRole("heading", { name: "No destinations match that combination" })).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByText(/destinations found/)).toBeVisible();

  await page.goto("/packages/");
  await page.getByRole("button", { name: "International" }).click();
  await page.getByLabel("Destination").selectOption("kerala");
  await expect(page.getByRole("heading", { name: "No sample journeys match those choices" })).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByText(/sample journeys found/)).toBeVisible();
});

test("experience portals retain their planning context", async ({ page }) => {
  await page.goto("/experiences/");
  await page
    .locator("article")
    .filter({ hasText: "Women-only travel" })
    .getByRole("link", { name: /Plan this experience/ })
    .click();

  await expect(page).toHaveURL(/\/plan-my-trip\/?\?experience=women-only$/);
  await expect
    .poll(() =>
      page.evaluate(() =>
        JSON.parse(
          sessionStorage.getItem("gamya-sanchari-planner") ?? "{}",
        ).experienceSlug,
      ),
    )
    .toBe("women-only");
});

test("historical journeys keep status and contextual next-departure enquiry together", async ({ page }) => {
  await page.goto("/packages/puri-jagannath-konark/");
  await expect(page.getByText("Previous departure")).toBeVisible();
  const enquiry = page.getByRole("link", { name: "Ask for the next departure" }).first();
  await expect(enquiry).toHaveAttribute("href", /wa\.me\/918073254766/);
  await expect(enquiry).toHaveAttribute("href", /next\+Puri/);
});

test("itinerary and complete planner flow remain operable", async ({ page }) => {
  await page.goto("/packages/kerala-easy-pace/");
  const secondDay = page.getByRole("button", { name: /Day 2/ });
  await secondDay.click();
  await expect(secondDay).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region")).toContainText("Travel to Munnar");

  await page.goto("/plan-my-trip/?destination=kerala");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Travel party").selectOption("Family");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Approximate month").fill("December");
  await page.getByLabel("Duration").fill("6 days");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("culture").check({ force: true });
  await page.getByLabel("Pace").selectOption("balanced");
  await page.getByLabel("Accommodation").selectOption({ label: "Boutique comfort" });
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Name").fill("Asha");
  await page.getByLabel("Phone", { exact: true }).fill("+91 90000 00000");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Step 6 of 6: Review")).toBeVisible();
  await page.getByRole("button", { name: "Edit When" }).click();
  await expect(page.getByLabel("Approximate month")).toHaveValue("December");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.evaluate(() => {
    window.open = ((url?: string | URL) => {
      document.body.dataset.outbound = String(url ?? "");
      return null;
    }) as typeof window.open;
  });
  await page.getByRole("button", { name: "Continue in WhatsApp" }).click();
  await expect.poll(() => page.locator("body").getAttribute("data-outbound")).toContain("wa.me/918073254766");
});

test("360px layouts never overflow and sticky actions stay reachable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-360", "Narrow-layout safety is covered in the 360px project.");
  await page.goto("/");
  const heroActionBox = await page.getByRole("link", { name: "Plan My Trip" }).first().boundingBox();
  const hostBox = await page.getByTestId("travel-host").boundingBox();
  const captionBox = await page.getByTestId("travel-host-caption").boundingBox();
  expect(heroActionBox).not.toBeNull();
  expect(hostBox).not.toBeNull();
  expect(captionBox?.width ?? 0).toBeGreaterThan(250);
  expect(hostBox!.y).toBeGreaterThanOrEqual(heroActionBox!.y + heroActionBox!.height);
  await expect(
    page.getByRole("button", { name: /Mute sound|Start sound/ }),
  ).toBeVisible();
  for (const path of ["/", "/destinations/", "/spiritual-journeys/", "/group-departures/", "/packages/puri-jagannath-konark/", "/plan-my-trip/", "/contact/"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.goto("/packages/kerala-easy-pace/");
  await expect(page.getByRole("link", { name: "Customize This Trip" }).last()).toBeVisible();
  await page.goto("/packages/puri-jagannath-konark/");
  await expect(page.getByRole("link", { name: "Ask for the next departure" }).last()).toBeVisible();
});
