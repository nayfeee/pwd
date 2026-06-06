import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PWD | Luxury Media Walls Across Manchester",
  description:
    "Luxury bespoke media walls, feature fireplaces, acoustic panelling, shelving, storage and interiors across Manchester.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}