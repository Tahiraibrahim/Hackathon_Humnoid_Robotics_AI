# Urdu Translation Implementation Guide

## Overview
This document explains the Urdu translation system implemented for the Physical AI Book hackathon bonus feature.

## Architecture

### Components & Files

#### 1. **PersonalizationContext.tsx** (`src/components/PersonalizationContext.tsx`)
Enhanced context that manages user preferences including language selection.

**Key Additions:**
- `isUrdu: boolean` - Convenience property to check if language is Urdu
- `toggleUrdu(): void` - Function to toggle between English and Urdu

**Usage:**
```tsx
const { language, isUrdu, toggleUrdu } = usePersonalization();
if (isUrdu) {
  // Show Urdu content
}
toggleUrdu(); // Switch language
```

#### 2. **useUrduTranslation Hook** (`src/hooks/useUrduTranslation.ts`)
Custom React hook that automatically translates text based on current language preference.

**Functions:**
- `useUrduTranslation(englishText: string): string` - Hook for React components
- `getTranslation(englishText: string, isUrdu: boolean): string` - Utility function for non-React code
- `getAvailableTranslations(): Record<string, string>` - Get all available translations

**Usage:**
```tsx
import { useUrduTranslation } from '../hooks/useUrduTranslation';

function MyComponent() {
  const translated = useUrduTranslation('Introduction');
  return <h1>{translated}</h1>; // Shows "تعارف" when Urdu is selected
}
```

#### 3. **UrduText Component** (`src/components/UrduText.tsx`)
Wrapper component for easy translation of text elements.

**Props:**
- `children: string` - English text to translate
- `as?: 'span' | 'h1' | 'h2' | ... 'p' | 'div'` - HTML element type
- `className?: string` - CSS class name
- `dir?: 'ltr' | 'rtl' | 'auto'` - Text direction (auto by default)

**Usage:**
```tsx
import UrduText from '../components/UrduText';

export function Chapter1() {
  return (
    <>
      <UrduText as="h1">Introduction to Physical AI</UrduText>
      <UrduText as="h2">Your First Robot Simulator</UrduText>
    </>
  );
}
```

#### 4. **Translation Dictionary** (`src/data/urduTranslations.ts`)
Comprehensive mapping of English to Urdu translations.

**Structure:**
- `CHAPTER_1_TRANSLATIONS` - Chapter 1 specific translations
- `ALL_TRANSLATIONS` - All available translations (includes all chapters)

**Example Translations:**
```
'Introduction to Physical AI' → 'جسمانی ایل آئی کا تعارف'
'Your First Robot Simulator' → 'آپ کا پہلا روبوٹ سمیولیٹر'
'Sensors, Brains, Actuators' → 'حسول، دماغ، ایکچویٹرز'
```

#### 5. **Navigation Buttons**
- `NavbarUrduButton.tsx` - Navbar button to toggle language
- `UrduTranslationButton.tsx` - Alternative button component

Both buttons now use:
- `toggleUrdu()` function for language switching
- `isUrdu` property for styling active state
- Proper RTL support

## How It Works

### 1. **State Management**
- Language preference stored in `PersonalizationContext`
- Persisted to localStorage for session continuity
- Accessible via `usePersonalization()` hook

### 2. **Translation Flow**
```
User clicks Navbar Urdu Button
  ↓
toggleUrdu() is called
  ↓
language state changes from 'en' to 'ur' (or vice versa)
  ↓
All components using useUrduTranslation hook re-render
  ↓
Components display translated text from urduTranslations.ts
```

### 3. **Component Integration**
```tsx
// Before
<h1>Introduction to Physical AI</h1>

// After with UrduText component
<UrduText as="h1">Introduction to Physical AI</UrduText>

// Or with hook
function Header() {
  const title = useUrduTranslation('Introduction to Physical AI');
  return <h1>{title}</h1>;
}
```

## Adding New Translations

### 1. Add to urduTranslations.ts
```tsx
export const CHAPTER_1_TRANSLATIONS: Record<string, string> = {
  // Existing translations...
  'Your New Heading': 'آپ کی نئی سرخی',
};
```

### 2. Update ALL_TRANSLATIONS
```tsx
export const ALL_TRANSLATIONS: Record<string, string> = {
  ...CHAPTER_1_TRANSLATIONS,
  // New translations will be included automatically
};
```

### 3. Use in Components
```tsx
<UrduText as="h2">Your New Heading</UrduText>
```

## Current Translations Included

### Chapter 1: Foundations
- Introduction to Physical AI → جسمانی ایل آئی کا تعارف
- Your First Robot Simulator → آپ کا پہلا روبوٹ سمیولیٹر
- Sensors, Brains, Actuators → حسول، دماغ، ایکچویٹرز

### Common UI Terms
- Getting Started → شروعات کریں
- Welcome → خوش آمدید
- Learn → سیکھیں
- Tutorial → سبق
- Next → اگلا
- Previous → پچھلا

### Technical Terms
- Robot → روبوٹ
- Simulator → سمیولیٹر
- Sensor → حسول
- Actuator → ایکچویٹر
- AI → ایل آئی
- Robotics → روبوٹکس

## Testing Translation Feature

### Manual Testing Steps
1. Load the application
2. Click the Urdu button (🇵🇰 اردو) in the navbar
3. Verify that:
   - Button text changes to 🇺🇸 EN
   - All wrapped text changes to Urdu
   - Language preference persists on page reload
4. Click again to switch back to English
5. Verify localStorage contains the preference

### Browser Console Testing
```javascript
// Check current language
console.log(usePersonalization().language);

// Check all available translations
import { getAvailableTranslations } from './hooks/useUrduTranslation';
console.log(getAvailableTranslations());
```

## Notes

- Translations use Urdu script (Nastaliq/Naskh)
- Text direction automatically handles RTL for Urdu
- All translations are stored in a single dictionary for easy maintenance
- Hook-based system ensures efficient re-rendering
- localStorage persists user language preference
- Fallback to English if translation not found

## Future Enhancements

1. **Real-time API Integration**: Connect to translation API for dynamic translations
2. **More Languages**: Add support for additional languages (Arabic, Spanish, etc.)
3. **Lazy Loading**: Split translations into chapter-specific bundles
4. **Markdown Translation**: Automatically translate Markdown file content
5. **RTL Layout**: Full RTL support for Urdu UI layout

## Questions?

Refer to the specific component files for implementation details.
