"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useScroll, type MotionValue } from "motion/react";

type BoundedSceneName = "featured-project" | "experience-photos";

const BoundedScrollProgressContext = createContext<MotionValue<number> | null>(null);

function subscribeToScrollRoot(onChange: () => void) {
  const scene = document.querySelector<HTMLElement>("[data-scroll-scene]");
  const shell = scene?.closest<HTMLElement>(".portfolio-shell");
  if (!shell) return () => {};

  const observer = new MutationObserver(onChange);
  observer.observe(shell, { attributes: true, attributeFilter: ["class"] });

  const desktop = window.matchMedia("(min-width: 1200px)");
  desktop.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    desktop.removeEventListener("change", onChange);
  };
}

function getActiveScrollRoot(scene: HTMLElement | null): HTMLElement | null {
  const root = scene?.closest<HTMLElement>(".portfolio-main-column");
  const shell = root?.closest<HTMLElement>(".portfolio-shell");
  if (!root || !shell || !shell.classList.contains("portfolio-shell--chat-open")) return null;
  if (!window.matchMedia("(min-width: 1200px)").matches) return null;

  const overflowY = getComputedStyle(root).overflowY;
  return root.scrollHeight > root.clientHeight && ["auto", "scroll"].includes(overflowY) ? root : null;
}

export function useBoundedScrollProgress(): MotionValue<number> | null {
  return useContext(BoundedScrollProgressContext);
}

export function BoundedScrollScene({
  scene,
  className = "",
  children,
}: {
  scene: BoundedSceneName;
  className?: string;
  children: ReactNode;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const getScrollRoot = useCallback(() => getActiveScrollRoot(sceneRef.current), []);
  const activeScrollRoot = useSyncExternalStore(subscribeToScrollRoot, getScrollRoot, () => null);
  const containerRef = useMemo(() => ({ current: activeScrollRoot }), [activeScrollRoot]);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <BoundedScrollProgressContext.Provider value={scrollYProgress}>
      <div
        ref={sceneRef}
        className={`d1-bounded-scene ${className}`.trim()}
        data-scroll-scene={scene}
      >
        <div className="d1-bounded-scene__inner">{children}</div>
      </div>
    </BoundedScrollProgressContext.Provider>
  );
}
