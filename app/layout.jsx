import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ClipMailo AI",
  description:
    "A tool for clueless folks to rake in a $hit ton of money 💰 while having no fu*king clue 🤷‍♂️ about creating & managing newsletters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children} <Analytics /> <SpeedInsights />
        </ClientLayout>
      </body>
    </html>
  );
}
