import type { Metadata } from "next";
import "@/styles/globals.css";
import { Funnel_Display } from "next/font/google";

import LenisProvider from "@/app/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Noodle and Pasta Recipes",
  description:
    "Discover and share delicious noodle recipes from around the world.",
};

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fef3c7" />
        <meta
          name="description"
          content="Discover and share delicious noodle recipes from around the world."
        />
        <meta name="keywords" content="noodle, pasta, recipes, cooking" />
        <meta name="author" content="Mill" />
        <meta property="og:title" content="Noodle and Pasta Recipes" />
      </head>
      <body
        className={`${funnelDisplay.className} bg-background text-foreground`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
