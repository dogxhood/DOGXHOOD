import { InfoPage } from "@/pages/InfoPage";

export function CredentialsPage() {
  return (
    <InfoPage
      eyebrow="Account safety"
      title="CREDENTIALS"
      intro="DOGXHOOD uses a lightweight local login so you can start playing quickly."
      sections={[
        {
          title: "USERNAME LOGIN",
          body: "A username is stored only in your browser to identify your local game session. It is not sent to a server and it is not used as a password.",
        },
        {
          title: "METAMASK LOGIN",
          body: "When you connect MetaMask, the app reads the public wallet address provided by your browser wallet. The address is used as your local player identity.",
        },
        {
          title: "WHAT WE NEVER REQUEST",
          body: "DOGXHOOD never asks for seed phrases, private keys, wallet passwords, signing secrets, or payment credentials. Never share those values with any website.",
        },
        {
          title: "LOCAL STORAGE",
          body: "Your username, connected wallet address, and game scores stay in your browser localStorage. Clearing site data removes this local session and its saved scores.",
        },
      ]}
    />
  );
}