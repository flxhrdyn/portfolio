"use client";

import { useEffect } from "react";
import { trackScrollTempo } from "@/lib/scroll-motion";

import { LazyMotion, domAnimation } from "motion/react";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(trackScrollTempo, []);

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
