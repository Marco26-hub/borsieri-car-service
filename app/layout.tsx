import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Borsieri Car Service | Carrozzeria, meccanica e cambio gomme",
  description:
    "Carrozzeria, meccanica e cambio gomme a San Fermo della Battaglia. Prenota uno slot direttamente dal sito.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
