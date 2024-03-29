import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { TanStackProvider } from "@/components/tanstack-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Fira_Code({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Guha",
  description: "Keep you passwords safe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen flex justify-center items-center ${inter.className} bg-background bg-grid-white/[0.03] p-5`}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
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
      </body>
    </html>
  );
}
