import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import CustomCursor from "./custom-cursor";
import "./globals.css";
import SiteChrome from "@/components/site/site-chrome";
import { THEME_COOKIE_KEY, THEME_STORAGE_KEY } from "./theme";

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
  title: "Miguel Leça",
  description: "Designer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(THEME_COOKIE_KEY)?.value;
  const initialTheme =
    cookieTheme === "dark" || cookieTheme === "light"
      ? cookieTheme
      : undefined;
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
    <html lang="en" data-theme={initialTheme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiemposText.variable}`}
      >
        <SiteChrome>{children}</SiteChrome>
        <CustomCursor />
      </body>
    </html>
  );
}
