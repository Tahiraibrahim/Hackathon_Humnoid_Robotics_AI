import React from 'react';
import { PersonalizationProvider } from './PersonalizationContext';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <PersonalizationProvider>
      {children}
    </PersonalizationProvider>
  );
}
