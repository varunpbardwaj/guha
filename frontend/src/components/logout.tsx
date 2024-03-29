"use client";

import useLogoutMutation from "@/react-query/useLogoutMutation";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const deleteMutation = useLogoutMutation();
  const router = useRouter();
  return (
    <Button
      className="fixed right-5 top-5 font-bold"
      onClick={() => {
        deleteMutation.mutateAsync();
        router.refresh();
      }}
    >
      Logout
    </Button>
  );
};
