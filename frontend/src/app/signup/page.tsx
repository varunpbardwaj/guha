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
import useSignupMutation from "@/react-query/useSignupMutation";
import { Phone } from "@/components/phone";

type SignUpProps = {
  username: string;
  password: string;
  confirm_password: string;
};

const Signup = () => {
  const router = useRouter();

  const signup = useSignupMutation();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().min(4, "Username must be of length 5+").required(),
    password: yup
      .string()
      .min(8, "Password must be of length 8+")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/,
        "Password must contain at least one uppercase letter, a number, and a special character"
      )
      .required(),
    confirm_password: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Password and Confirm password should match"
      )
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpProps) => {
    setLoading(true);
    const mutate = await signup.mutateAsync({
      username: data.username,
      password: data.password,
    });
    if (mutate.errors) {
      toast({
        variant: "destructive",
        description: "User already exist",
        duration: 5000,
      });
    } else {
      fetch("/api/auth/cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mutate),
      })
        .then(() => {
          toast({
            variant: "default",
            description: "Signup successful",
            duration: 5000,
          });
          router.push("/login");
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong, try again",
            duration: 5000,
          });
        });
    }
    setLoading(false);
  };

  return (
    <Phone className="pt-14">
      <Toaster />
      <Button
        className="bg-pink hover:bg-pink text-muted shadow-[6px_6px_#000] hover:shadow-[0px_0px_#000] text-black duration-300 transition-all font-bold"
        onClick={() => router.push("/login")}
      >
        <ChevronLeft size={15} />
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="text-3xl font-bold mt-8 pr-[30%] text-green"
          style={{
            textShadow: "3px 3px 0 #000",
          }}
        >
          Signup
        </div>
        <div className="mb-2 mt-5">
          <Label
            className="!mb-2 !text-xs hover:!cursor-pointer"
            htmlFor="username"
          >
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
          <Label
            className="!mb-2 !text-xs hover:!cursor-pointer"
            htmlFor="password"
          >
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
        <div className="mb-2">
          <Label
            className="!mb-2 !text-xs hover:!cursor-pointer"
            htmlFor="confirm_password"
          >
            Confirm Password
          </Label>
          <Input
            className={`!border-black/30 mt-1 h-10 !rounded-md border !bg-black/10 !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50 placeholder:text-black ${
              errors.confirm_password ? "border-red-300" : ""
            }`}
            type="password"
            {...register("confirm_password")}
            autoComplete="off"
          />
          {errors.confirm_password && (
            <p className="mb-1 mt-2 text-xs text-red-700">
              {errors.confirm_password.message}
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
          {!loading ? "Create account" : <FaSpinner className="animate-spin" />}
        </Button>
      </form>
    </Phone>
  );
};

export default Signup;
