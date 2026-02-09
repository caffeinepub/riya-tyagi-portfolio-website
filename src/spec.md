# Specification

## Summary
**Goal:** Make the HeroSection numeric metric values and other gradient-text elements render visibly across themes and breakpoints.

**Planned changes:**
- Fix the Hero metrics grid numeric value styling so it no longer becomes transparent due to invalid/mismatched gradient utility usage.
- Ensure any other HeroSection elements using `bg-clip-text text-transparent` (e.g., the tagline and floating “95%” overlay) have a valid gradient background class (`gradient-accent`) or an equivalent CSS alias so text remains visible.
- Verify visibility in light/dark mode and across mobile/tablet/desktop without introducing Tailwind class resolution issues or console errors.

**User-visible outcome:** The Hero stats section displays all four metric numbers clearly, and the Hero tagline plus the floating “95%” value are readable in both light and dark mode on all screen sizes.
