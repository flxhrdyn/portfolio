'use client';

import React from 'react';
import { useDesign } from '@/context/DesignContext';
import { getSwitcherOptions } from './switcher-utils';

interface DesignSwitcherPillProps {
  className?: string;
}

export function DesignSwitcherPill({ className = '' }: DesignSwitcherPillProps) {
  const { design, setDesign } = useDesign();
  const options = getSwitcherOptions(design);

  return (
    <nav
      aria-label="Design version switcher"
      className={`inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-1.5 py-1 text-[11px] font-mono shadow-xs transition-colors ${className}`}
    >
      <span className="hidden sm:inline-flex items-center gap-1 px-1.5 text-neutral-400 dark:text-neutral-500 font-medium tracking-wider uppercase select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" aria-hidden="true" />
        <span>Style</span>
      </span>

      <div className="flex items-center gap-0.5" role="group" aria-label="Available design styles">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            data-design={opt.id}
            onClick={() => setDesign(opt.id)}
            aria-pressed={opt.isActive}
            title={opt.title}
            className={`relative min-w-[28px] h-6 px-2 rounded-full font-medium transition-all duration-150 flex items-center justify-center cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white focus-visible:outline-offset-1 ${
              opt.isActive
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default DesignSwitcherPill;
