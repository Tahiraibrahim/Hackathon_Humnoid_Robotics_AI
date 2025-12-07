import React from 'react';
import { PersonalizationProvider } from '@site/src/components/PersonalizationContext';
import ChatWidget from '@site/src/components/ChatBot'; // <--- Chatbot Import kiya

export default function Root({ children }) {
  return (
    <PersonalizationProvider>
      {children}
      <ChatWidget /> {/* <--- Chatbot ko yahan add kiya */}
    </PersonalizationProvider>
  );
}