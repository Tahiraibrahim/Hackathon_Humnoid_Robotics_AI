import React, { useState } from 'react';
import { usePersonalization } from './PersonalizationContext';
import styles from './PersonalizationContextButton.module.css';

export const PersonalizationContextButton: React.FC = () => {
  const { learningStyle, difficulty, language, setLearningStyle, setDifficulty, setLanguage } =
    usePersonalization();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.personalizationContainer}>
      <button
        className={styles.contextButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Customize your learning experience"
      >
        ⚙️ Personalize Learning
      </button>

      {isOpen && (
        <div className={styles.contextPanel}>
          <div className={styles.panelHeader}>
            <h3>Customize Your Learning Experience</h3>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className={styles.settingsGroup}>
            <label className={styles.settingLabel}>Learning Style:</label>
            <div className={styles.buttonGroup}>
              {(['visual', 'kinesthetic', 'reading', 'auditory'] as const).map((style) => (
                <button
                  key={style}
                  className={`${styles.optionBtn} ${
                    learningStyle === style ? styles.active : ''
                  }`}
                  onClick={() => setLearningStyle(style)}
                >
                  {style === 'visual' && '🎨 Visual'}
                  {style === 'kinesthetic' && '🤚 Hands-On'}
                  {style === 'reading' && '📖 Reading'}
                  {style === 'auditory' && '🎧 Auditory'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.settingsGroup}>
            <label className={styles.settingLabel}>Difficulty Level:</label>
            <div className={styles.buttonGroup}>
              {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  className={`${styles.optionBtn} ${difficulty === level ? styles.active : ''}`}
                  onClick={() => setDifficulty(level)}
                >
                  {level === 'beginner' && '⭐ Beginner'}
                  {level === 'intermediate' && '⭐⭐ Intermediate'}
                  {level === 'advanced' && '⭐⭐⭐ Advanced'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.infoText}>
            <p>💡 These preferences personalize content difficulty and presentation style.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizationContextButton;
