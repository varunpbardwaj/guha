"use client";

import { useRouter } from "next/navigation";
import usePasswordsQuery from "@/react-query/usePasswordsQuery";
import useDeletePasswordByIdMutation from "@/react-query/useDeletePasswordByIdMutation";
import { AddPassword } from "@/components/password/add-password";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Phone } from "@/components/phone";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Copy,
  CopyCheck,
  Dot,
  Eye,
  EyeOff,
  Home,
  Minus,
  Pencil,
  Plus,
  SquareArrowOutUpRight,
  SquareAsterisk,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { PasswordProp } from "@/types";
import Link from "next/link";
import cryptoJS from "crypto-js";
import { Input } from "@/components/ui/input";

const generatePassword = (
  capCount: number,
  digitCount: number,
  specialCharCount: number
): string => {
  const chars: Record<string, string> = {
    caps: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    smallLetters: "abcdefghijklmnopqrstuvwxyz",
    num: "0123456789",
    special: "!@#$%^&*()-_",
  };

  const getRandomChar = (charset: string): string => {
    return charset.charAt(Math.floor(Math.random() * charset.length));
  };

  let password: string = "";

  const totalChars: number = Math.max(
    10,
    Math.min(capCount + digitCount + specialCharCount + 10, 25)
  );

  const charTypes: { type: string; count: number }[] = [
    { type: "caps", count: capCount },
    { type: "num", count: digitCount },
    { type: "special", count: specialCharCount },
    {
      type: "smallLetters",
      count: totalChars - capCount - digitCount - specialCharCount,
    },
  ];

  charTypes.forEach(({ type, count }) => {
    for (let i = 0; i < count; i++) {
      password += getRandomChar(chars[type]);
    }
  });

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

function checkPasswordStrength(password: string): string {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const length = password.length;

  if (length < 8) {
    return "Very Weak";
  } else if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
    return "Weak";
  } else if (length < 12) {
    return "Moderate";
  } else if (length >= 12 && length < 16) {
    return "Strong";
  } else {
    return "Very Strong";
  }
}

export default function Homepage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: passwords = [], isLoading } = usePasswordsQuery();
  const deletePasswordById = useDeletePasswordByIdMutation();
  const [menu, setMenu] = useState(0);
  const [digitsCount, setDigitCount] = useState(3);
  const [capsCount, setCapsCount] = useState(3);
  const [specialCount, setSpecialCount] = useState(3);
  const [password, setPassword] = useState("");
  const [passStrength, setPassStrength] = useState("Weak");
  const [copyText, setCopyText] = useState("Copy");
  const [isUpdate, setIsUpdate] = useState(false);
  const [pass, setPass] = useState<PasswordProp | {}>({});

  const [searchBySiteName, setSearchBySiteName] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const gPass = generatePassword(capsCount, digitsCount, specialCount);
    setPassword(gPass);
    setPassStrength(checkPasswordStrength(gPass));
  }, []);

  const RenderPasswordList = ({
    password,
    index,
  }: {
    password: PasswordProp;
    index: number;
  }) => {
    const [copyUsername, setCopyUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [copyPassword, setCopyPassword] = useState(false);
    const bytes = cryptoJS.AES.decrypt(
      password.password,
      process.env.NEXT_PUBLIC_CRYPTO_SECRET!
    );
    const decryptedPassword = bytes.toString(cryptoJS.enc.Utf8);

    return (
      <div
        className={`relative w-full h-auto p-4 bg-green rounded-2xl hover:shadow-[5px_5px_#000] shadow-[0px_0px_#000] duration-500 transition-all mb-3`}
      >
        <div
          className="flex justify-center items-center w-5 h-5 rounded-full bg-black text-white absolute -top-2 right-9 cursor-pointer"
          onClick={() => {
            setPass(password);
            setIsUpdate(true);
            setOpen(true);
          }}
        >
          <Pencil size={10} />
        </div>
        <div
          className="flex justify-center items-center w-5 h-5 rounded-full bg-black text-white absolute -top-2 right-3 cursor-pointer"
          onClick={async () => {
            const deleteStatus = await deletePasswordById.mutateAsync(
              password.id.toString()
            );
            if (deleteStatus.status === 200) {
              toast({
                description: "Password deleted successfully",
                duration: 5000,
              });
            } else {
              toast({
                variant: "destructive",
                description: "Something went wrong",
                duration: 5000,
              });
            }
          }}
        >
          <Minus size={10} />
        </div>
        <div className="w-full flex justify-between items-end gap-2">
          <div className="w-[90%] flex flex-col justify-between">
            <div className="font-semibold text-xs">Site Name</div>
            <div
              className="font-normal text-[0.7rem] overflow-hidden truncate"
              title={password.site_name}
            >
              {password.site_name}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-end gap-2 my-2">
          <div className="w-[90%] flex flex-col justify-between">
            <div className="font-semibold text-xs">Site URL</div>
            <div
              className="w-full font-normal text-[0.7rem] overflow-hidden truncate"
              title={password.site_url}
            >
              {password.site_url}
            </div>
          </div>
          <Link
            href={password.site_url}
            rel="noopener noreferrer"
            target="blank"
          >
            <SquareArrowOutUpRight className="cursor-pointer" size={15} />
          </Link>
        </div>
        <div className="w-full flex justify-between items-end gap-2">
          <div className="w-[90%] flex flex-col justify-between">
            <div className="font-semibold text-xs">Username</div>
            <div
              className="font-normal text-[0.7rem] overflow-hidden truncate"
              title={password.username}
            >
              {password.username}
            </div>
          </div>
          <div
            onClick={() => {
              setCopyUsername(true);
              navigator.clipboard.writeText(password.username);
              setTimeout(() => {
                setCopyUsername(false);
              }, 3000);
            }}
            className={`${copyUsername ? "pointer-events-none" : ""}`}
          >
            {copyUsername ? (
              <CopyCheck className="cursor-pointer" size={15} />
            ) : (
              <Copy className="cursor-pointer" size={15} />
            )}
          </div>
        </div>
        <div className="w-full flex justify-between items-end gap-2">
          <div className="w-[75%] flex flex-col justify-between mt-2">
            <div className="font-semibold text-xs overflow-hidden truncate">
              Password
            </div>
            <div
              className="font-normal text-[0.7rem]"
              title={password.password}
            >
              {showPassword ? decryptedPassword : "***************"}
            </div>
          </div>
          <div
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <EyeOff className="cursor-pointer" size={15} />
            ) : (
              <Eye className="cursor-pointer" size={15} />
            )}
          </div>
          <div
            onClick={() => {
              setCopyPassword(true);
              navigator.clipboard.writeText(decryptedPassword);
              setTimeout(() => {
                setCopyPassword(false);
              }, 3000);
            }}
            className={`${copyPassword ? "pointer-events-none" : ""}`}
          >
            {copyPassword ? (
              <CopyCheck className="cursor-pointer" size={15} />
            ) : (
              <Copy className="cursor-pointer" size={15} />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Phone
      className={`${
        menu === 1 ? "bg-vault" : "bg-purple"
      } relative px-0 py-0 overflow-hidden`}
    >
      <Toaster />
      <div
        className={`flex flex-col justify-between w-full ${
          menu === 1 ? "h-[95%]" : "opacity-0 h-0"
        } duration-700 transition-all px-4 overflow-x-hidden bg-vault rounded-3xl`}
      >
        <div>
          <div className="text-xl font-semibold mt-14 pr-[30%] text-purple">
            Create unique password
          </div>
          <div className="w-full flex justify-between gap-2 mt-5 mb-5">
            <div className="w-full relative">
              <div className="absolutetop-0 left-0 text-gray-500 text-[0.5rem]">
                Caps
              </div>
              <Slider
                className="w-full mt-2"
                defaultValue={[3]}
                min={0}
                max={5}
                step={1}
                bg="bg-pink"
                onValueChange={(i) => {
                  const gPass = generatePassword(
                    i[0],
                    digitsCount,
                    specialCount
                  );
                  setCapsCount(i[0]);
                  setPassword(gPass);
                  setPassStrength(checkPasswordStrength(gPass));
                }}
                count={capsCount}
              />
            </div>
            <div className="w-full relative">
              <div className="absolutetop-0 left-0 text-gray-500 text-[0.5rem]">
                Digits
              </div>
              <Slider
                className="w-full mt-2"
                defaultValue={[3]}
                min={0}
                max={5}
                step={1}
                bg="bg-purple"
                onValueChange={(i) => {
                  const gPass = generatePassword(capsCount, i[0], specialCount);
                  setDigitCount(i[0]);
                  setPassword(gPass);
                  setPassStrength(checkPasswordStrength(gPass));
                }}
                count={digitsCount}
              />
            </div>
            <div className="w-full relative">
              <div className="absolutetop-0 left-0 text-gray-500 text-[0.5rem]">
                Special
              </div>
              <Slider
                className="w-full mt-2"
                defaultValue={[3]}
                min={0}
                max={5}
                step={1}
                bg="bg-green"
                onValueChange={(i) => {
                  const gPass = generatePassword(capsCount, digitsCount, i[0]);
                  setSpecialCount(i[0]);
                  setPassword(gPass);
                  setPassStrength(checkPasswordStrength(gPass));
                }}
                count={specialCount}
              />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-36 h-36 rounded-full bg-green border-4 border-purple">
            <div className="font-bold text-2xl">
              {digitsCount + capsCount + specialCount + 10}
            </div>
            <div className="text-xs">Characters</div>
            <div className="absolute bottom-5 text-[0.6rem] font-semibold">
              {passStrength}
            </div>
          </div>
        </div>
        <div
          className="relative w-full rounded-2xl h-[9rem] bg-pink translate-y-[-40%] px-5 mb-5"
          style={{
            transform: `perspective(30px) rotateX(5deg)`,
            transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
          }}
        >
          <div className="text-center text-gray-800 mt-3 text-xs">
            Your Password
          </div>
          <div className="text-center text-gray-800 mt-1 font-bold text-sm flex justify-center items-center gap-2">
            {password}
          </div>
          <div className="w-[80%] flex justify-between items-center absolute h-10 bottom-0 left-[50%] translate-x-[-50%] translate-y-[-60%] mb-4 gap-2">
            <Button
              className="w-[49%]"
              variant="default"
              onClick={() =>
                setPassword(
                  generatePassword(capsCount, digitsCount, specialCount)
                )
              }
            >
              Generate
            </Button>
            <Button
              className="w-[49%]"
              variant="default"
              onClick={() => {
                setCopyText("Copied!");
                navigator.clipboard.writeText(password);
                setTimeout(() => {
                  setCopyText("Copy");
                }, 3000);
              }}
            >
              {copyText}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`w-full ${
          menu === 0 ? "h-full" : "opacity-0 h-0"
        } duration-700 transition-all overflow-x-hidden pt-12 rounded-3xl bg-purple`}
      >
        <div className="relative w-full h-full">
          <div className="absolute w-full h-[8rem] bg-purple px-4 z-[9999] rounded-b-3xl border-b-2 border-b-black/30 shadow-[#382e6d]/20 shadow-xl">
            <Header />
            <div className="relative flex justify-end items-center mt-8 mb-5">
              <Button
                onClick={() => setOpen(!open)}
                className="bg-white rounded-full text-xs text-black flex gap-2 font-normal hover:bg-white duration-100 transition-all"
              >
                <div>Add</div> <Plus size={14} />
              </Button>
            </div>
          </div>
          <div className="pt-[8rem] overflow-y-auto h-[calc(100%-5rem)]">
            <div className="mt-5">
              {passwords.length === 0 && (
                <div className="w-full rounded-full text-xs text-center font-normal">
                  {isLoading ? "Loading..." : "No credentials found"}
                </div>
              )}
            </div>
            <div className="mt-5">
              <div className="px-4">
                <Input
                  className="!border-black/30 mt-1 h-10 !rounded-md border !bg-black/10 !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50 placeholder:text-black"
                  placeholder="Search by site name"
                  onChange={(e) => setSearchBySiteName(e.target.value)}
                />
              </div>
              {passwords.length > 0 &&
                Object.entries(
                  passwords
                    .filter((pass) =>
                      pass.site_name
                        .toLowerCase()
                        .includes(searchBySiteName.toLowerCase())
                    )
                    .reduce((acc: any, cur) => {
                      const firstChar = cur.site_name.charAt(0).toUpperCase();
                      acc[firstChar] = acc[firstChar] || [];
                      acc[firstChar].push(cur);
                      return acc;
                    }, {})
                )
                  .map(([letter, users]) => ({ letter, users }))
                  .sort((a, b) => a.letter.localeCompare(b.letter))
                  .map((p, i) => (
                    <div className="px-4 flex flex-col gap-2 mt-5 mb-7" key={i}>
                      <div className="font-bold">{p.letter}</div>
                      {(p.users as PasswordProp[]).map((user, ui) => {
                        return (
                          <RenderPasswordList
                            key={ui}
                            password={user}
                            index={ui}
                          />
                        );
                      })}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-20 absolute bottom-0 z-[9997] rounded-t-3xl border-t-4 ${
          menu === 1 ? "border-t-green bg-purple" : "border-t-black bg-pink"
        } flex items-center justify-around px-5 duration-700 transition-all`}
      >
        <Button
          size="icon"
          onClick={() => setMenu(0)}
          variant="ghost"
          className="hover:bg-transparent mt-6"
        >
          <div className="flex flex-col justify-center items-center">
            <Home size={20} />
            <Dot
              size={22}
              className={`${
                menu === 0 ? "text-black" : "text-transparent"
              } -mt-1 duration-500 transition-all`}
            />
          </div>
        </Button>
        <div />
        <Button
          size="icon"
          onClick={() => setMenu(1)}
          variant="ghost"
          className="hover:bg-transparent mt-7"
        >
          <div className="flex flex-col justify-center items-center">
            <SquareAsterisk size={20} />
            <Dot
              size={22}
              className={`${
                menu === 1 ? "text-black" : "text-transparent"
              } -mt-1 duration-500 transition-all`}
            />
          </div>
        </Button>
      </div>
      <AddPassword
        open={open}
        onClose={() => {
          setIsUpdate(false);
          setPass({});
          setOpen(false);
        }}
        isUpdate={isUpdate}
        pass={pass as PasswordProp}
      />
    </Phone>
  );
}
