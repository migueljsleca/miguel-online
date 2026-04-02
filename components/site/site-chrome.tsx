"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/site/bottom-nav";
import type { ReactNode } from "react";

export default function SiteChrome({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const showNav = pathname === "/" || pathname.startsWith("/about");

  return (
    <>
      {children}
      {showNav ? <BottomNav /> : null}
    </>
  );
}
