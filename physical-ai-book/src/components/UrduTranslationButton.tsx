import React from 'react';
import { usePersonalization } from './PersonalizationContext';
import styles from './UrduTranslationButton.module.css';

export const UrduTranslationButton: React.FC = () => {
  const { language, toggleUrdu } = usePersonalization();

  return (
    <button
      className={styles.urduButton + (language === 'ur' ? ' ' + styles.active : '')}
      onClick={toggleUrdu}
      title={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
      aria-label={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
    >
      {language === 'en' ? (
        <>
          <span className={styles.icon}>🇵🇰</span>
          <span className={styles.text}>اردو</span>
        </>
      ) : (
        <>
          <span className={styles.icon}>🇺🇸</span>
          <span className={styles.text}>English</span>
        </>
      )}
    </button>
  );
};

export default UrduTranslationButton;
