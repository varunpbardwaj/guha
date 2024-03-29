"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import useLogoutMutation from "@/react-query/useLogoutMutation";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/user");
      const user = await data.json();
      setUsername(user.username.slice(0, 1));
    })();
  }, []);

  return (
    <div className="flex justify-between">
      <Button
        className="bg-pink hover:bg-pink text-muted shadow-[6px_6px_#000] hover:shadow-[0px_0px_#000] text-black duration-300 transition-all font-bold"
        onClick={() => router.push("/")}
      >
        <ChevronLeft size={15} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          {username.trim() !== "" ? (
            <Button
              variant="ghost"
              className="w-10 h-10 rounded-full flex justify-center items-center font-bold bg-green hover:bg-green !border-2 border-black"
            >
              {username.toUpperCase()}
            </Button>
          ) : (
            <div className="w-10 h-10 rounded-full flex justify-center items-center font-bold bg-green hover:bg-green !border-2 border-black">
              .
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute w-fit -right-5 bg-green border-none">
          <DropdownMenuItem
            className="bg-transparent cursor-pointer hover:font-bold transition-all hover:underline underline-offset-4 flex justify-center"
            onClick={async () => {
              await logoutMutation.mutateAsync();
              router.push("/");
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
