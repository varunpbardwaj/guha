import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const Phone = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] sm:max-w-xs h-[calc(100vh-4rem)] bg-purple m-auto rounded-[3rem] border border-[#353530] overflow-hidden">
      <div className="flex items-center justify-end absolute top-5 left-[50%] translate-x-[-50%] w-[30%] h-6 bg-black rounded-full px-2 z-[9999]">
        <div className="w-2 h-2 bg-[#181856] rounded-full" />
      </div>
      <div
        className={cn(
          "w-full h-full border-[0.8rem] border-black px-4 pb-8 rounded-[2.9rem]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
