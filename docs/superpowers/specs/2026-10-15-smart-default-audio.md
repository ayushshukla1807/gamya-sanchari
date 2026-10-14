# Smart Default Audio Design

## Goal

Make the landing-page welcome feel cinematic and personal by enabling a soft ambient music bed and the existing recorded Gamya Sanchari welcome by default, while remaining honest about browser autoplay restrictions and giving visitors immediate control.

## Experience

- When the travel host appears, the page attempts to start a quiet looping ambient track and the recorded welcome: “Namaskara, and welcome to Gamya Sanchari. Tell us how you dream of travelling. We'll thoughtfully bring together your flights, stays, transfers, and experiences, so your journey feels truly yours.”
- The welcome plays once per browser session. The background music may resume on a return visit within that session.
- If audible autoplay is blocked, the page displays a clear “Start sound” state and retries on the visitor's first intentional click, tap, or key press.
- Ambient music ducks beneath the spoken welcome and rises gently after it ends.
- Visitors always have visible controls to mute or resume the experience. After the welcome completes, they can replay it.
- Muting is respected for the rest of the current session. A new browser session starts with sound enabled again.
- Audio failures do not hide the written welcome or interfere with navigation, video, or other landing-page content.

## Media

- Reuse the existing recorded welcome at `/audio/gamya-host-introduction.mp3`.
- Add an original, locally generated ambient instrumental at `/audio/gamya-ambient-journey.mp3`; it must not depend on a third-party runtime or external request.

## Accessibility and compatibility

- Provide visible pause/mute and replay controls with accurate accessible names and status text.
- Never trap input or block access to content behind an audio gate.
- Treat `NotAllowedError` and other rejected playback promises as recoverable autoplay blocking, not as a fatal audio failure.
- Keep the complete written welcome visible at all times.

