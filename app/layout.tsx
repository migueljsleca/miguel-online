import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { THEME_STORAGE_KEY } from "./theme";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-interface",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  display: "swap",
});

const tiemposText = localFont({
  src: "../fonts/TestTiemposText-Regular.otf",
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miguel | Design Portfolio",
  description:
    "Portfolio homepage for Miguel, a designer and outdoor enthusiast based in Madeira Island.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootScript = `
    (() => {
      try {
        const storedTheme = window.localStorage.getItem("${THEME_STORAGE_KEY}");
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        const theme = storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : preferredTheme;
        document.documentElement.dataset.theme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "light";
      }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiemposText.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
