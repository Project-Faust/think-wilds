import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Think Wilds",
  description: "Set building and planning resource for Monster Hunter: Wilds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
