import React from 'react';
import { usePersonalization } from './PersonalizationContext';
import styles from './NavbarUrduButton.module.css';

export default function NavbarUrduButton() {
  const { language, toggleUrdu } = usePersonalization();

  return (
    <button
      className={styles.navbarUrduButton + (language === 'ur' ? ' ' + styles.active : '')}
      onClick={toggleUrdu}
      title={language === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
      aria-label={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
    >
      {language === 'en' ? '🇵🇰 اردو' : '🇺🇸 EN'}
    </button>
  );
}
