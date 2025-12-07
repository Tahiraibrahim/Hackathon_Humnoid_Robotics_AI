import React from 'react';
import { useUrduTranslation } from '../hooks/useUrduTranslation';

interface UrduTextProps {
  children: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  className?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

/**
 * Component to automatically translate text to Urdu when language is set to Urdu
 * Usage: <UrduText>Introduction</UrduText>
 */
export const UrduText: React.FC<UrduTextProps> = ({ 
  children, 
  as: Component = 'span',
  className,
  dir = 'auto'
}) => {
  const translatedText = useUrduTranslation(children);

  return React.createElement(Component, {
    className,
    dir,
    children: translatedText,
  });
};

export default UrduText;
