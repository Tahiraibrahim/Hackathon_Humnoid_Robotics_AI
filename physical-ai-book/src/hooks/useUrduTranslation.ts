import { usePersonalization } from '../components/PersonalizationContext';
import { ALL_TRANSLATIONS } from '../data/urduTranslations';

/**
 * Hook to get translated text based on language preference
 * If language is Urdu and translation exists, returns Urdu text
 * Otherwise returns the original English text
 */
export const useUrduTranslation = (englishText: string): string => {
  const { language } = usePersonalization();

  if (language === 'ur' && ALL_TRANSLATIONS[englishText]) {
    return ALL_TRANSLATIONS[englishText];
  }

  return englishText;
};

/**
 * Get translation without needing the hook (for non-React contexts)
 */
export const getTranslation = (englishText: string, isUrdu: boolean = false): string => {
  if (isUrdu && ALL_TRANSLATIONS[englishText]) {
    return ALL_TRANSLATIONS[englishText];
  }
  return englishText;
};

/**
 * Get all available translations
 */
export const getAvailableTranslations = (): Record<string, string> => {
  return ALL_TRANSLATIONS;
};

export default useUrduTranslation;
