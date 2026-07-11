'use client';

import { ReactNode, createContext, useEffect } from 'react';
import { ClickSparkContainer, useClickSpark } from './click-spark';

export interface ClickSparkContextType {
  addSpark: (x: number, y: number) => void;
}

export const ClickSparkContext = createContext<ClickSparkContextType | null>(null);

export function ClickSparkProvider({ children }: { children: ReactNode }) {
  const { sparks, addSpark } = useClickSpark();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      addSpark(e.clientX, e.clientY);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [addSpark]);

  return (
    <>
      <ClickSparkContext.Provider value={{ addSpark }}>
        {children}
      </ClickSparkContext.Provider>
      <ClickSparkContainer sparks={sparks} />
    </>
  );
}
