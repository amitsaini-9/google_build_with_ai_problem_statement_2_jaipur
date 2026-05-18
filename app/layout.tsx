import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FanForge - Tournament Gamification",
  description: "Predict, compete, and climb the ranks during tournament season",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
