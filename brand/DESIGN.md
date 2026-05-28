---
name: Mauve & Ivory
colors:
  surface: '#FAF6F1'
  surface-dim: '#DDD9D5'
  surface-bright: '#FAF6F1'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F7F3EE'
  surface-container: '#F1EDE8'
  surface-container-high: '#EBE8E3'
  surface-container-highest: '#E6E2DD'
  on-surface: '#1C1C19'
  on-surface-variant: '#55433D'
  inverse-surface: '#31302D'
  inverse-on-surface: '#F4F0EB'
  outline: '#88726C'
  outline-variant: '#DBC1B9'
  surface-tint: '#994529'
  primary: '#7B5EA7'
  on-primary: '#FFFFFF'
  primary-container: '#EDE1FF'
  on-primary-container: '#25005A'
  inverse-primary: '#D0BCFF'
  secondary: '#E8D5C4'
  on-secondary: '#4A3728'
  secondary-container: '#F5EBE0'
  on-secondary-container: '#5C4433'
  tertiary: '#7A9E7E'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#C6ECC8'
  on-tertiary-container: '#002111'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#93000A'
  background: '#FAF6F1'
  on-background: '#1C1C19'
  surface-variant: '#E6E2DD'
typography:
  display-lg:
    fontFamily: Literata
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  full: 9999px
spacing:
  unit: 8px
  margin-mobile: 24px
  margin-desktop: 48px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
  card-padding: 24px
  tap-target-min: 80px
---

# Design System: Mauve & Ivory (Lumia App)

A serene, empathetic design system built for couples navigating assisted reproductive journeys (IVF). The visual style moves away from clinical, sterile medical sheets toward a warm, supportive journal experience.

## 1. Visual Theme & Atmosphere

Lumia utilizes a warm, organic, and calm style called **Mauve & Ivory**. It emphasizes breathable layouts, heavy whitespace, and tactile layering. The background is a soft linen ivory (`#FAF6F1`) that reduces screen glare and eye strain. It is paired with a primary violet-mauve (`#7B5EA7`) that evokes soft professional clinical trust and calm strength.

Key visual attributes include very generous container margins, rounded organic sheets, and a glassmorphism elevation strategy. Interactive items pop gently against the linen background using pure white surfaces and soft, tinted shadows.

## 2. Color Palette & Roles

### Primary Foundation
- **Linen Background (`#FAF6F1`)**: Main screen backgrounds and layout canvas.
- **Pure White Container (`#FFFFFF`)**: Interactive cards, sheets, and modular sections.
- **Muted Sand (`#DDD9D5`)**: Structural lines, inactive borders, and dividers.

### Accent & Interactive
- **Primary Violet-Mauve (`#7B5EA7`)**: Primary actions, titles, selection borders, and brand accents.
- **Dusty Peach (`#E8D5C4`)**: Secondary buttons, outlines, and warm focus indicators.
- **Sage Green (`#7A9E7E`)**: Completion badges, positive progress, and success logs.

### Category Event Tokens
Used specifically to color-code daily schedule items at a glance:
- **Medications (`#B8D4F5`)**: Soft blue with deep navy text (`#00325A`).
- **Ultrasound Scans (`#D4B8F0`)**: Soft lavender with deep purple text (`#25005A`).
- **Blood Work & Tests (`#F5D4B8`)**: Soft apricot with warm bronze text (`#5C4433`).
- **Milestones & Logs (`#B8F0D4`)**: Soft mint with deep green text (`#002111`).

## 3. Typography Rules

### Hierarchy & Weights
- **Titles & Headers (`Literata`)**: An elegant, editorial serif. Used in semi-bold weights for display titles, card headers, and phase milestones.
- **Body & UI Elements (`DM Sans`)**: A modern, approachable geometric sans-serif. Used for labels, inputs, notes, and general instructions.

### Spacing Principles
- Heading lines are set in sentence case to remain gentle and conversational.
- Compact letter spacing is applied to headings for structural cohesion, while relaxed line heights (`28px` on body-lg) are enforced for reading ease.

## 4. Component Stylings

### Buttons
- Large, tactile containers with rounded corners (`16px` to `20px` radius).
- Minimal height is set to `56px` to support heavy tap accessibility.

### Cards & Sheets
- Clean white cards utilizing a premium `20px` (`radius-xl`) corner radius.
- Supported by an ambient tonal shadow tinted with primary mauve: `0 8px 30px rgba(123, 94, 167, 0.05)`.
- Bottom sheets feature rounded top-left and top-right edges with a dark grabber handle, sliding up to overlay 70-90% of the screen.

### Inputs & Forms
- Standard fields use a subtle sand or dusty peach outline with a `12px` rounded radius.
- Focus states display a `2px` primary mauve border.

## 5. Layout Principles

### Grid & Structure
- **Mobile Grid**: Single column layout with `24px` side margins.
- **Vertical Spacing**: Standard linear scale based on an 8px grid. Generous stack gaps (`40px`) separate primary modules.

## 6. Design System Notes for Stitch Generation

### Prompts to Use
- *"serene mauve and ivory theme, warm linen ivory background `#FAF6F1`, deep violet-mauve brand accents `#7B5EA7`"*
- *"pure white rounded card with `20px` corners, soft tinted shadow"*
- *"editorial Literata headings, clean DM Sans labels"*
