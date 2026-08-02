import { InfoPage } from "@/pages/InfoPage";

export function LegalPage() {
  return (
    <InfoPage
      eyebrow="Important information"
      title="LEGAL"
      intro="Please read these notes before using DOGXHOOD."
      sections={[
        {
          title: "ENTERTAINMENT ONLY",
          body: "DOGXHOOD is a browser game and community project. Game scores are for entertainment and do not represent financial value.",
        },
        {
          title: "NO FINANCIAL ADVICE",
          body: "Information about tokens, chains, or crypto communities is general information only. It is not financial, investment, tax, or legal advice.",
        },
        {
          title: "WALLET RESPONSIBILITY",
          body: "You are responsible for checking wallet addresses, network settings, transactions, and third party links before using them. DOGXHOOD does not request private keys or seed phrases.",
        },
        {
          title: "AVAILABILITY",
          body: "The project is provided as available without a promise of uninterrupted access, score persistence, or compatibility with every browser or wallet.",
        },
        {
          title: "EXTERNAL SERVICES",
          body: "Links to external services are provided for convenience. Their content, security, and privacy practices are controlled by those services.",
        },
      ]}
    />
  );
}