"use client";

import { Phone } from "@/components/phone";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const router = useRouter();

  return (
    <Phone>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div
            className="text-5xl font-bold mt-[10vh] pr-[30%] text-green"
            style={{
              textShadow: "4px 4px 0 #000",
            }}
          >
            Let&apos;s make your password secure.
          </div>
          <div className="text-sm font-light mt-8 pr-[20%]">
            Keep you passwords safe with <b className="font-bold">Guha</b>
          </div>
          <div className="text-sm font-light mt-4 pr-[20%]">
            Created by{" "}
            <Link
              href="https://github.com/varunpbardwaj"
              className="font-semibold underline underline-offset-4"
              target="blank"
            >
              Varun Bardwaj
            </Link>
          </div>
        </div>
        <Button
          className="bg-pink hover:bg-pink text-muted shadow-[6px_6px_#000] hover:shadow-[0px_0px_#000] text-black duration-300 transition-all font-bold"
          onClick={async () => {
            const getSession = await fetch("/api/auth/cookie");
            const session = await getSession.json();
            if (session && session.isLogged) {
              router.push("/home");
            } else {
              router.push("/login");
            }
          }}
        >
          Let&apos;s go
        </Button>
      </div>
    </Phone>
  );
};

export default Homepage;
