import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat(
  {
    subsets: ["latin"],
    weight: '600',
  }
);

export const metadata: Metadata = {
  title: "PAT",
  description: "Predictive Analysis Table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
