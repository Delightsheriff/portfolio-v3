'use client';

import { ReactNode, useEffect } from 'react';
import { ClickSparkContext } from './spark-button';
import { ClickSparkContainer, useClickSpark } from './click-spark';

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
