import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import TripPlanner from "@/components/planner/TripPlanner";
import { EMPTY_PLANNER_DRAFT } from "@/lib/planner";

const storageKey = "gamya-sanchari-planner";

beforeEach(() => {
  sessionStorage.clear();
  window.history.replaceState({}, "", "/plan-my-trip/?destination=kerala");
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("prefills valid URL context and validates each step before moving on", async () => {
  const user = userEvent.setup();
  render(<TripPlanner />);

  await waitFor(() => expect(screen.getByLabelText("Destination")).toHaveValue("kerala"));
  expect(screen.getByText("Step 1 of 6: Where")).toHaveAttribute("aria-live", "polite");

  await user.click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByText("Step 2 of 6: Who")).toBeVisible();

  await user.click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByText("Choose who is travelling.")).toBeVisible();
  expect(screen.getByLabelText("Travel party")).toHaveFocus();
});

test("restores safe session state, retains later answers, and builds one WhatsApp handoff", async () => {
  const user = userEvent.setup();
  sessionStorage.setItem(
    storageKey,
    JSON.stringify({
      ...EMPTY_PLANNER_DRAFT,
      destinationSlug: "bali",
      scope: "international",
      adults: 2,
      children: 0,
      partyType: "Couple",
      travelMonth: "September",
      duration: "6 days",
      flexibleDates: true,
      interests: ["wellness"],
      pace: "relaxed",
      accommodation: "Boutique comfort",
      budget: "Comfort",
      name: "Asha & Ravi",
      phone: "+91 90000 00000",
      email: "asha+ravi@example.com",
      notes: "Beach + hills 🌴",
    }),
  );
  window.history.replaceState({}, "", "/plan-my-trip/?journey=bali-beautifully-unhurried");
  const open = vi.spyOn(window, "open").mockImplementation(() => null);
  render(<TripPlanner />);

  await waitFor(() => expect(screen.getByLabelText("Destination")).toHaveValue("bali"));
  for (let step = 0; step < 5; step += 1) {
    await user.click(screen.getByRole("button", { name: "Continue" }));
  }

  expect(screen.getByText("Step 6 of 6: Review")).toBeVisible();
  expect(screen.getByText(/Bali, beautifully unhurried/)).toBeVisible();
  expect(screen.getByText(/Beach \+ hills 🌴/)).toBeVisible();
  expect(screen.getByText(/nothing is sent or stored by this website/i)).toBeVisible();

  await user.click(screen.getByRole("button", { name: "Edit Who" }));
  expect(screen.getByText("Step 2 of 6: Who")).toBeVisible();
  expect(screen.getByLabelText("Travel party")).toHaveValue("Couple");
  await user.click(screen.getByRole("button", { name: "Continue" }));
  for (let step = 0; step < 3; step += 1) {
    await user.click(screen.getByRole("button", { name: "Continue" }));
  }

  await user.click(screen.getByRole("button", { name: "Continue in WhatsApp" }));
  expect(open).toHaveBeenCalledTimes(1);
  const url = new URL(String(open.mock.calls[0][0]));
  expect(url.pathname).toBe("/918073254766");
  expect(url.searchParams.get("text")).toContain("Asha & Ravi");
  expect(url.searchParams.get("text")).toContain("Beach + hills 🌴");
  expect(url.searchParams.get("text")).not.toContain("%252B");
});

test("falls back safely from malformed session storage", async () => {
  sessionStorage.setItem(storageKey, "{broken");
  window.history.replaceState({}, "", "/plan-my-trip/");
  render(<TripPlanner />);

  await waitFor(() => expect(screen.getByLabelText("Destination")).toHaveValue(""));
  expect(screen.getByText("Step 1 of 6: Where")).toBeVisible();
});

test("keeps experience context from an experience portal", async () => {
  window.history.replaceState({}, "", "/plan-my-trip/?experience=women-only");
  render(<TripPlanner />);

  await waitFor(() =>
    expect(JSON.parse(sessionStorage.getItem(storageKey) ?? "{}")).toMatchObject({
      experienceSlug: "women-only",
    }),
  );
});
