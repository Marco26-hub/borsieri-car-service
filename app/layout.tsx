import type { Metadata } from "next";
import CookieConsent from "./CookieConsent";
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
    images: [
      {
        url: "/og-borsieri.webp",
        width: 1200,
        height: 630,
        alt: "Borsieri Car Service - carrozzeria specializzata vicino a Como",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carrozzeria Borsieri Car Service",
    description: "Carrozzeria, officina meccanica e servizio pneumatici vicino a Como.",
    images: ["/og-borsieri.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
