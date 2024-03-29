import { TanStackProvider } from "@/components/tanstack-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Signup - Guha",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TanStackProvider>
  );
}
