"use client";

import { cn } from "@/utils/cn";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div
      className={cn(
        "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 relative group rounded-full",
        containerClassName
      )}
    >
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-full z-[1] opacity-60 group-hover:opacity-80 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#CFFF6D,transparent),radial-gradient(circle_farthest-side_at_100%_0,#A493F0,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#CFFF6D,transparent),radial-gradient(circle_farthest-side_at_0_0,#CFFF6D,#A493F0)]"
        )}
      />

      <div className={cn("w-full h-full relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};
