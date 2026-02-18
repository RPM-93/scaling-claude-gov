import type { Metadata } from "next";
import { Source_Serif_4, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scaling-claude-gov.vercel.app"),
  title: "What a Decade Inside Government Taught Me About AI Adoption | Ryan McCormack",
  description:
    "Observations on scaling AI in the public sector, from someone who spent 9+ years inside the agencies that will use Claude.",
  openGraph: {
    title: "What a Decade Inside Government Taught Me About AI Adoption",
    description:
      "Observations on scaling AI in the public sector, from someone who spent 9+ years inside the agencies that will use Claude.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What a Decade Inside Government Taught Me About AI Adoption",
    description:
      "Observations on scaling AI in the public sector, from someone who spent 9+ years inside the agencies that will use Claude.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} ${dmSans.variable} ${dmMono.variable}`}
        style={{
          fontFamily: "var(--font-sans), var(--sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
