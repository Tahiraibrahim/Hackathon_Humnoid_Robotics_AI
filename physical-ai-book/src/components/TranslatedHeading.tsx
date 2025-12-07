import React from 'react';
import { useUrduTranslation } from '../hooks/useUrduTranslation';

interface TranslatedHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: string;
  id?: string;
  className?: string;
}

/**
 * Component for translated headings in Markdown content
 * Automatically translates h1-h6 headings to Urdu when language is set to Urdu
 * 
 * Usage:
 * <TranslatedHeading level={1}>Introduction to Physical AI</TranslatedHeading>
 */
export const TranslatedHeading: React.FC<TranslatedHeadingProps> = ({
  level,
  children,
  id,
  className,
}) => {
  const translatedText = useUrduTranslation(children);
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return React.createElement(
    HeadingTag,
    {
      id,
      className,
    },
    translatedText
  );
};

export default TranslatedHeading;
