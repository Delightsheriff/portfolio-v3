'use client';

import { ReactNode } from 'react';
import { ClickSparkContext } from './spark-button';
import { ClickSparkContainer, useClickSpark } from './click-spark';

export function ClickSparkProvider({ children }: { children: ReactNode }) {
  const { sparks, addSpark } = useClickSpark();

  return (
    <>
      <ClickSparkContext.Provider value={{ addSpark }}>
        {children}
      </ClickSparkContext.Provider>
      <ClickSparkContainer sparks={sparks} />
    </>
  );
}
