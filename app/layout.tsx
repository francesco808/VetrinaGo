import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { PwaRegister } from "./PwaRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "VetrinaGo",
  description: "Genera idee social, caption, hashtag e scalette video per la tua attività.",
  manifest: "/manifest.json",
  applicationName: "VetrinaGo",
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon-192.png"]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VetrinaGo"
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#1F7A6B",
    "msapplication-TileImage": "/icon-144.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#1F7A6B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen antialiased">
        <PwaRegister />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
