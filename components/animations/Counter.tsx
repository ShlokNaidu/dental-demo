"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      let startTime: number | null = null;
      let animationFrameId: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        // Ease out quad
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easedProgress * value);

        setDisplayValue(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};
