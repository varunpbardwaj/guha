import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TanStackProvider } from "@/components/tanstack-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login - Guha",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(process.env.NEXT_PUBLIC_JWT_COOKIE!);
  if (tokenCookie && tokenCookie?.value) {
    const { exp } = jwt.verify(
      tokenCookie.value,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    ) as JwtPayload;
    if (exp && Date.now() <= exp * 1000) {
      redirect("/home");
    }
  }

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
