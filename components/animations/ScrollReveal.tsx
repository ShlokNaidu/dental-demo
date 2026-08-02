"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.4,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialValues = {
    opacity: 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
  };

  return (
    <motion.div
      initial={initialValues}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
