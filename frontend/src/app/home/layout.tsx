import { TanStackProvider } from "@/components/tanstack-provider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export const metadata: Metadata = {
  title: "Home - Guha",
};

export default function HomeLayout({
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
    if (exp && Date.now() >= exp * 1000) {
      redirect("/login");
    }
  } else {
    redirect("/login");
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
