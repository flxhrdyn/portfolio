"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { usePortfolioScroll } from "@/components/MotionProvider";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

type PortfolioAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: `#${string}`;
};

export function PortfolioAnchor({ href, onClick, ...props }: PortfolioAnchorProps) {
  const controller = usePortfolioScroll();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) scrollToAnchor(event, href, controller);
  };

  return <a {...props} href={href} onClick={handleClick} />;
}
