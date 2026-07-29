import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carrozzeria Borsieri Car Service | San Fermo della Battaglia, Como",
  description:
    "Carrozzeria specializzata a San Fermo della Battaglia, vicino a Como. Riparazioni auto, verniciatura, grandine, cristalli, officina meccanica e cambio gomme.",
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
