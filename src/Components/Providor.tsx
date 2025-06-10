"use client";

import { NuqsAdapter } from "nuqs/adapters/next";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" enableSystem={false}>
        {children}
      </ThemeProvider>
    </NuqsAdapter>
  );
}
