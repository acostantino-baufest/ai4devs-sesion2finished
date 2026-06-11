---
version: alpha
name: Molinos Agro
description: A corporate agriculture system combining clean editorial typography, high-trust green accents, and immersive full-bleed imagery.
colors:
  primary: "#0B7A36"
  primary-70: "#2D9A57"
  primary-60: "#5CB77D"
  secondary: "#1C39BB"
  tertiary: "#CFEA8A"
  neutral: "#F5F7F7"
  surface: "#FFFFFF"
  on-surface: "#121212"
  on-primary: "#FFFFFF"
  border: "#D7DEE2"
  muted: "#6B7280"
  error: "#D92D20"
typography:
  headline-display:
    fontFamily: Product
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0px
  headline-lg:
    fontFamily: Product
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0px
  headline-md:
    fontFamily: Product
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0px
  headline-sm:
    fontFamily: Roboto
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0px
  body-lg:
    fontFamily: Roboto
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-md:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-sm:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0px
  label-lg:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
  label-md:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
  label-sm:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  nav-link:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0px
  button-text:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0px
  eyebrow:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.08em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  xl: 28px
  full: 9999px
spacing:
  xs: 10px
  sm: 20px
  md: 40px
  lg: 80px
  xl: 140px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-text}"
    rounded: "{rounded.full}"
    padding: 10px 18px
    height: 40px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.button-text}"
    rounded: "{rounded.full}"
    padding: 10px 18px
    height: 40px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 10px 14px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 10px 18px
  nav-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.full}"
    padding: 14px 24px
  hero-overlay:
    backgroundColor: "#0B1F2E99"
    textColor: "{colors.surface}"
    typography: "{typography.headline-display}"
    rounded: "{rounded.none}"
---

# Molinos Agro

## Overview
Molinos Agro presents as a confident, corporate agribusiness brand with a polished editorial finish. The visual tone is serious and trustworthy, but not sterile: bright whites, saturated blue navigation, and a strong green accent keep the interface approachable and optimistic. The experience feels spacious and image-led, designed for stakeholders, customers, and partners who need clarity and credibility fast.

## Colors
- **Primary (#0B7A36):** A rich agricultural green used for the main brand action, login/access emphasis, and trust-building cues. It should signal growth, sustainability, and operational strength.
- **Secondary (#1C39BB):** A vivid corporate blue used for navigation, links, and brand framing. It gives the UI a formal, institutional voice.
- **Tertiary (#CFEA8A):** A light organic green for supportive highlights or soft accent surfaces when a gentle environmental note is needed.
- **Neutral (#F5F7F7):** A near-white neutral for subtle background separation when pure white is too stark.
- **Surface (#FFFFFF):** The dominant page and component surface color, reinforcing cleanliness and high contrast with text and accents.
- **On-surface (#121212):** A deep charcoal used for readable body copy and interface text on light backgrounds.
- **Border (#D7DEE2):** A cool pale border tone for restrained dividers, pills, and card outlines without adding visual heaviness.
- **Muted (#6B7280):** A subdued gray for secondary labels and de-emphasized supporting text.
- **On-primary (#FFFFFF):** White text placed on green buttons and darker brand surfaces for legibility.
- **Error (#D92D20):** Reserved for validation and failure states; keep it minimal so the brand remains composed.

## Typography
The system blends two families: Product for large editorial headlines and Roboto for navigation, body, and utility text. Product carries the brand’s more expressive, modern voice, while Roboto keeps dense information legible and operationally clear. Headings are bold and compact with no noticeable letter spacing, while labels and small utility text may use a slight uppercase-like tracking treatment for clarity in pills and navigation cues.

- **Headlines:** Use Product for the largest hero and section headings. These should feel large, confident, and highly legible over photography.
- **Body:** Use Roboto at 16px–20px with moderate line height for paragraphs, descriptions, and supporting content.
- **Labels and navigation:** Use Roboto at 14px–16px, generally medium weight, for nav links, chips, and CTA text.
- **Eyebrow text:** Use the smallest size with increased letter spacing for subtle brand or section metadata.

## Layout
The layout is spacious and centered, with a strong hero-first structure and generous breathing room around primary content. Navigation elements often sit in soft pill containers, and the main hero message is centered over a full-bleed image with wide side margins. Spacing follows a simple jump scale of 10px, 20px, 40px, 80px, and 140px, which creates a rhythm that supports both compact utility areas and expansive editorial sections.

Primary page framing should prefer a fluid container with a large maximum width, but allow hero imagery to extend edge-to-edge. Section padding should stay generous, especially above and below major content blocks, to preserve the premium corporate feel.

## Elevation & Depth
The design is mostly flat and relies on contrast, whitespace, and photography rather than heavy shadow. When depth is needed, it appears as soft tonal layering: white pills over imagery, thin borders, and subtle shadowing for floating elements. Cards should stay restrained with minimal elevation so the interface feels stable and institutional rather than app-like.

## Shapes
The shape language is soft and rounded, with a preference for full pill corners on navigation and buttons. Interactive elements feel friendly and accessible, but not playful; the rounding is used to soften a formal system, not to make it whimsical. Standard cards use the smaller rounded token, while call-to-action controls and nav pills should lean toward full-radius forms.

## Components
- **Buttons:** Primary buttons use the green brand fill with white text, rounded full, and compact horizontal padding. Secondary buttons should invert this relationship on white surfaces or use outlined light styling when placed over imagery. Tertiary buttons are text-first, minimal, and suitable for inline navigation or utility actions. Keep button heights around 40px and preserve strong contrast.
- **Nav pills:** Top navigation should use `nav-pill` styling: white surface, blue text, full rounding, and generous horizontal padding. This creates the floating capsule look visible in the hero.
- **Cards:** Use `card` for contained content blocks with white or near-white backgrounds, subtle borders, rounded medium corners, and no strong shadow. Cards should feel informative and structured, not decorative.
- **Inputs:** Inputs should be clean, white, and gently rounded, with clear text color and understated borders. Avoid heavy fills or dramatic focus treatments; keep the form language consistent with the rest of the system.
- **Chips:** Chips should mirror the pill geometry of nav items, but with lighter weight and more compact padding. They are best for filters, tags, or status labels.
- **Hero overlay / banners:** When text sits over imagery, use a dark translucent overlay for contrast and keep the typography large and bold. The hero headline should remain centered and dominant.
- **Links:** Inline links should remain simple, blue, and unembellished unless they need to be clearly distinguished from navigation.

## Do's and Don'ts
- Do keep large headings bold, centered, and highly legible over photography.
- Do use white surfaces and subtle borders to maintain the clean corporate feel.
- Do prefer pill-shaped controls for navigation and key actions.
- Do maintain a spacious rhythm using the 10/20/40/80/140 spacing scale.
- Don't introduce heavy shadows, glossy effects, or decorative gradients.
- Don't use multiple competing accent colors; green and blue should remain primary.
- Don't crowd the layout with dense clusters of links or utilities.
- Don't make buttons square or overly sharp; rounded forms are part of the brand.