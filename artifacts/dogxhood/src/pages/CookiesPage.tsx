import { InfoPage } from "@/pages/InfoPage";

export function CookiesPage() {
  return (
    <InfoPage
      eyebrow="Privacy controls"
      title="COOKIES"
      intro="DOGXHOOD is designed to keep the game experience simple and local."
      sections={[
        {
          title: "NO TRACKING COOKIES",
          body: "The game does not use advertising cookies, analytics cookies, or cross-site tracking cookies.",
        },
        {
          title: "BROWSER STORAGE",
          body: "The app uses localStorage for your username, wallet address, and high scores. This is browser storage rather than a tracking cookie.",
        },
        {
          title: "THIRD PARTY CONTENT",
          body: "External links such as X and Orynth may apply their own privacy policies when you leave DOGXHOOD. Review their policies on those services.",
        },
        {
          title: "CLEARING DATA",
          body: "You can remove local DOGXHOOD data from your browser site settings. This will sign you out and remove locally saved scores.",
        },
      ]}
    />
  );
}