"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = true, className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -4, boxShadow: "0 10px 30px -4px rgba(13, 148, 136, 0.12)" } : undefined}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={twMerge(
          clsx(
            "bg-white rounded-2xl p-6 border border-stone-200/80 shadow-card",
            className
          )
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
