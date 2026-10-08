"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { trackScrollTempo } from "@/lib/scroll-motion";
import { limitWheelDelta } from "@/lib/scroll-input";

import { LazyMotion, domAnimation } from "motion/react";

export interface PortfolioScrollController {
  scrollTo(target: HTMLElement | number, options?: { immediate?: boolean }): void;
  stop(): void;
  start(): void;
}

const PortfolioScrollContext = createContext<PortfolioScrollController | null>(null);

export function usePortfolioScroll(): PortfolioScrollController {
  const controller = useContext(PortfolioScrollContext);

  if (!controller) {
    throw new Error("usePortfolioScroll must be used inside MotionProvider");
  }

  return controller;
}

/** The portfolio's scroll feel; `wrapper` scopes it to an element scroller instead of the window. */
export function createPortfolioLenis(wrapper?: HTMLElement) {
  return new Lenis({
    ...(wrapper && { wrapper, content: wrapper, eventsTarget: wrapper }),
    autoRaf: false,
    smoothWheel: true,
    // Deliberately heavy: speed is capped so reveals have time to land.
    wheelMultiplier: 0.7,
    lerp: 0.085,
    syncTouch: false,
    stopInertiaOnNavigate: true,
    virtualScroll: (input) => {
      if (input.event.type === "wheel") {
        input.deltaY = limitWheelDelta(input.deltaY, 120);
      }

      return true;
    },
  });
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(trackScrollTempo, []);

  const controller = useMemo<PortfolioScrollController>(
    () => ({
      scrollTo(target, options) {
        const lenis = lenisRef.current;

        if (lenis) {
          lenis.scrollTo(target, options);
          return;
        }

        if (typeof window === "undefined") return;
        const behavior = options?.immediate ? "instant" : "smooth";

        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior });
        } else {
          target.scrollIntoView({ behavior, block: "start" });
        }
      },
      stop() {
        lenisRef.current?.stop();
      },
      start() {
        lenisRef.current?.start();
      },
    }),
    [],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const syncScrollMode = () => {
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;

      if (reducedMotion.matches) return;

      const lenis = createPortfolioLenis();
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    };

    syncScrollMode();
    reducedMotion.addEventListener("change", syncScrollMode);

    return () => {
      reducedMotion.removeEventListener("change", syncScrollMode);
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <PortfolioScrollContext.Provider value={controller}>
        {children}
      </PortfolioScrollContext.Provider>
    </LazyMotion>
  );
}
