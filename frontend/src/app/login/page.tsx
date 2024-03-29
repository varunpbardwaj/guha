"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLoginMutation, { User } from "@/react-query/useLoginMutation";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Phone } from "@/components/phone";

const Login = () => {
  const router = useRouter();

  const login = useLoginMutation();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: User) => {
    setLoading(true);
    const mutate = await login.mutateAsync({
      username: data.username,
      password: data.password,
    });
    if (mutate.status !== 200) {
      toast({
        variant: "destructive",
        description: "Invalid Username or Password",
        duration: 5000,
      });
    } else {
      const getLogin = await fetch("/api/auth/cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mutate.data),
      });
      if (getLogin.status === 200) {
        router.push("/home");
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong, try again",
          duration: 5000,
        });
      }
    }
    setLoading(false);
  };

  return (
    <Phone className="pt-14">
      <Toaster />
      <Button
        className="bg-pink hover:bg-pink text-muted shadow-[6px_6px_#000] hover:shadow-[0px_0px_#000] text-black duration-300 transition-all font-bold"
        onClick={() => router.push("/")}
      >
        <ChevronLeft size={15} />
      </Button>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="text-3xl font-bold mt-8 pr-[30%] text-green"
          style={{
            textShadow: "3px 3px 0 #000",
          }}
        >
          Login
        </div>
        <div className="mb-4 mt-5">
          <Label className="!text-sm" htmlFor="username">
            Username
          </Label>
          <Input
            className={`!border-black/30 mt-1 h-10 !rounded-md border !bg-black/10 !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50 placeholder:text-black ${
              errors.username ? "border-red-300" : ""
            }`}
            type="text"
            {...register("username")}
            autoComplete="off"
          />
          {errors.username && (
            <p className="mb-1 mt-2 text-xs text-red-700">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <Label className="!text-sm" htmlFor="password">
            Password
          </Label>
          <div className="flex gap-2 items-center">
            <Input
              className={`!border-black/30 mt-1 h-10 !rounded-md border !bg-black/10 !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50 placeholder:text-black ${
                errors.password ? "border-red-300 " : ""
              }`}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              autoComplete="off"
            />
            <div
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
          {errors.password && (
            <p className="mb-1 mt-2 text-xs text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className={`text-md mt-3 flex h-12 w-full items-center justify-center rounded-md py-3 outline-none ${
            loading ? "cursor-auto opacity-70" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {!loading ? "Login" : <FaSpinner className="animate-spin" />}
        </Button>
        <div className="mb-5 mt-2 flex justify-center text-center text-xs">
          Don&apos;t have an account?
          <div
            onClick={() => router.push("/signup")}
            className="text-grey-900 ml-1 cursor-pointer font-bold underline underline-offset-4"
          >
            Sign up
          </div>
        </div>
      </form>
    </Phone>
  );
};

export default Login;
