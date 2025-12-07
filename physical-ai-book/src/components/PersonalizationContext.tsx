import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersonalizationContextType {
  learningStyle: 'visual' | 'kinesthetic' | 'reading' | 'auditory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'en' | 'ur';
  isUrdu: boolean; // Convenience property
  setLearningStyle: (style: 'visual' | 'kinesthetic' | 'reading' | 'auditory') => void;
  setDifficulty: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  setLanguage: (lang: 'en' | 'ur') => void;
  toggleUrdu: () => void; // Toggle between English and Urdu
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(
  undefined
);

export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [learningStyle, setLearningStyle] = useState<'visual' | 'kinesthetic' | 'reading' | 'auditory'>(
    'visual'
  );
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>(
    'beginner'
  );
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('personalizationPreferences');
    if (saved) {
      const { learningStyle: ls, difficulty: d, language: lang } = JSON.parse(saved);
      if (ls) setLearningStyle(ls);
      if (d) setDifficulty(d);
      if (lang) setLanguage(lang);
    }
  }, []);

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem(
      'personalizationPreferences',
      JSON.stringify({ learningStyle, difficulty, language })
    );
  }, [learningStyle, difficulty, language]);

  // Toggle between English and Urdu
  const toggleUrdu = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <PersonalizationContext.Provider
      value={{
        learningStyle,
        difficulty,
        language,
        isUrdu: language === 'ur',
        setLearningStyle,
        setDifficulty,
        setLanguage,
        toggleUrdu,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};
