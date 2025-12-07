# Urdu Translation Implementation - Usage Examples

## Quick Start Examples

### Example 1: Simple Text Translation with UrduText Component

```tsx
import { UrduText } from '@site/src/components/UrduText';

export function ChapterOne() {
  return (
    <section>
      <UrduText as="h1">Introduction to Physical AI</UrduText>
      <UrduText as="p">Welcome to the exciting world of robotics!</UrduText>
    </section>
  );
}
```

### Example 2: Using the useUrduTranslation Hook

```tsx
import { useUrduTranslation } from '@site/src/hooks/useUrduTranslation';
import { usePersonalization } from '@site/src/components/PersonalizationContext';

export function DynamicHeading() {
  const { isUrdu } = usePersonalization();
  const heading = useUrduTranslation('Your First Robot Simulator');
  
  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}
```

### Example 3: Conditional Rendering Based on Language

```tsx
import { usePersonalization } from '@site/src/components/PersonalizationContext';

export function LanguageIndicator() {
  const { isUrdu, language, toggleUrdu } = usePersonalization();

  return (
    <div>
      <p>Current Language: {isUrdu ? 'اردو' : 'English'}</p>
      <button onClick={toggleUrdu}>
        {isUrdu ? 'Switch to English' : 'اردو میں تبدیل کریں'}
      </button>
    </div>
  );
}
```

### Example 4: Full Page Component

```tsx
import { UrduText } from '@site/src/components/UrduText';
import { usePersonalization } from '@site/src/components/PersonalizationContext';

export function Chapter1Page() {
  const { isUrdu, toggleUrdu } = usePersonalization();

  return (
    <div>
      <header>
        <UrduText as="h1">Introduction to Physical AI</UrduText>
        <button onClick={toggleUrdu} className="lang-toggle">
          {isUrdu ? 'English' : 'اردو'}
        </button>
      </header>

      <main>
        <UrduText as="h2">Your First Robot Simulator</UrduText>
        <UrduText as="h2">Sensors, Brains, Actuators</UrduText>
      </main>
    </div>
  );
}
```

## Available Translations

- Introduction to Physical AI → جسمانی ایل آئی کا تعارف
- Your First Robot Simulator → آپ کا پہلا روبوٹ سمیولیٹر
- Sensors, Brains, Actuators → حسول، دماغ، ایکچویٹرز
- Getting Started → شروعات کریں
- Robot → روبوٹ
- Simulator → سمیولیٹر
- And 30+ more...

## Best Practices

1. Use UrduText for headings - Most readable
2. Keep translations consistent - Match dictionary exactly
3. Test both LTR and RTL rendering
4. Use getTranslation for non-React code
5. Maintain language in localStorage

---

See URDU_TRANSLATION_IMPLEMENTATION.md for full details.
