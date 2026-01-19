import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Harmonia Vision for developers",
  description:
    "Ergonomic editor calibrator tool for visual comfort, readability, and reduced eye strain. Personalized settings for myopia, astigmatism, and color vision deficiencies.",
  keywords: [
    "eye strain",
    "visual comfort",
    "myopia",
    "astigmatism",
    "color blindness",
    "deuteranopia",
    "accessibility",
    "ergonomics",
    "developer tools",
  ],
  authors: [{ name: "Joni" }],
  openGraph: {
    title: "Harmonia Vision for developers",
    description:
      "Ergonomic editor calibrator toolfor visual comfort and reduced eye strain.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonia Vision for developers",
    description:
      "Ergonomic editor calibrator tool for visual comfort and reduced eye strain.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-zinc-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
