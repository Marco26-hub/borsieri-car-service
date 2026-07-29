import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.borsiericarservice.it"),
  title: "Carrozzeria Borsieri Car Service | San Fermo della Battaglia, Como",
  description:
    "Carrozzeria specializzata a San Fermo della Battaglia, vicino a Como. Riparazioni auto, verniciatura, grandine, cristalli, officina meccanica e nuovo servizio di prenotazione cambio gomme online.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Carrozzeria Borsieri Car Service",
    description:
      "Riparazioni di carrozzeria, officina meccanica e prenotazione cambio gomme a San Fermo della Battaglia, vicino a Como.",
    locale: "it_IT",
    siteName: "Borsieri Car Service",
    type: "website",
    url: "/",
  },
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
