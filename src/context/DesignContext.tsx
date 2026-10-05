'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import {
  DEFAULT_DESIGN,
  DESIGN_STORAGE_KEY,
  DESIGN_QUERY_PARAM,
  isValidDesign,
  type DesignVersion,
} from '@/config/design';

interface DesignContextValue {
  design: DesignVersion;
  setDesign: (version: DesignVersion) => void;
  isMounted: boolean;
}

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((callback) => callback());
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', callback);
    window.addEventListener('storage', callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', callback);
      window.removeEventListener('storage', callback);
    }
  };
}

let cachedClientSnapshot: DesignVersion = DEFAULT_DESIGN;
let lastSearch = '';
let lastStorage: string | null = null;

function getClientSnapshot(): DesignVersion {
  if (typeof window === 'undefined') return DEFAULT_DESIGN;

  try {
    const currentSearch = window.location.search;
    const currentStorage = localStorage.getItem(DESIGN_STORAGE_KEY);

    if (currentSearch === lastSearch && currentStorage === lastStorage) {
      return cachedClientSnapshot;
    }

    lastSearch = currentSearch;
    lastStorage = currentStorage;

    const params = new URLSearchParams(currentSearch);
    const urlVersion = params.get(DESIGN_QUERY_PARAM);

    if (isValidDesign(urlVersion)) {
      cachedClientSnapshot = urlVersion;
      return cachedClientSnapshot;
    }

    if (isValidDesign(currentStorage)) {
      cachedClientSnapshot = currentStorage;
      return cachedClientSnapshot;
    }
  } catch {
    // Return fallback on access errors
  }

  cachedClientSnapshot = DEFAULT_DESIGN;
  return cachedClientSnapshot;
}

function getServerSnapshot(): DesignVersion {
  return DEFAULT_DESIGN;
}

const DesignContext = createContext<DesignContextValue>({
  design: DEFAULT_DESIGN,
  setDesign: () => {},
  isMounted: false,
});

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const design = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const isMounted = useSyncExternalStore(
    (cb) => {
      // Once mounted in browser, notify immediately
      cb();
      return () => {};
    },
    () => true,
    () => false
  );

  const setDesign = (newVersion: DesignVersion) => {
    if (!isValidDesign(newVersion)) return;

    try {
      localStorage.setItem(DESIGN_STORAGE_KEY, newVersion);

      const url = new URL(window.location.href);
      url.searchParams.set(DESIGN_QUERY_PARAM, newVersion);
      window.history.replaceState(null, '', url.toString());
    } catch {
      // Ignore storage/history errors
    }

    cachedClientSnapshot = newVersion;
    notifyListeners();
  };

  return (
    <DesignContext.Provider value={{ design, setDesign, isMounted }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign(): DesignContextValue {
  return useContext(DesignContext);
}
